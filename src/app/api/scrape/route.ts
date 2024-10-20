import { NextResponse } from 'next/server';
import { chromium } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function POST(request: Request) {
    const { url }: { url: string } = await request.json();
    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });

        // Extract the content, distinguishing between user and AI messages
        const { content, title } = await page.evaluate(() => {
            const titleElement = document.querySelector('title');
            const title = titleElement ? titleElement.textContent : 'Content';
            
            const messageElements = document.querySelectorAll('div[data-message-author-role]');
            let content = '';
            
            messageElements.forEach((element) => {
                const role = element.getAttribute('data-message-author-role');
                const isUserMessage = role === 'user';
                
                // Clone the element to avoid modifying the original DOM
                const clonedElement = element.cloneNode(true) as HTMLElement;
                
                // Remove all button elements from the cloned element
                clonedElement.querySelectorAll('button').forEach(button => button.remove());
                
                // Wrap the content in a div with appropriate class
                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = isUserMessage ? 'user-message' : 'ai-message';
                
                if (isUserMessage) {
                    // Add user icon for user messages
                    wrapperDiv.innerHTML = `
                        <div class="user-icon">User👤:</div>
                        <div class="message-content">${clonedElement.innerHTML}</div>
                    `;
                } else {
                    wrapperDiv.innerHTML = clonedElement.innerHTML;
                }
                
                // Add the wrapped content to the result
                content += wrapperDiv.outerHTML;
            });
            
            return { content, title };
        });

        if (!content) {
            throw new Error('Could not find the required content');
        }

        // Generate HTML content with black background
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            padding: 20px; 
                            line-height: 1.6;
                            color: #e0e0e0;
                            background-color: #333333;
                        }
                        h1 {
                            color: #ffffff;
                            border-bottom: 1px solid #333333;
                            padding-bottom: 10px;
                        }
                        pre {
                            background-color: #1a1a1a;
                            color: #00ff00;
                            padding: 10px;
                            border-radius: 5px;
                            overflow-x: auto;
                        }
                        code {
                            font-family: 'Courier New', Courier, monospace;
                        }
                        a {
                            color: #3498db;
                        }
                        p, ul, ol {
                            margin-bottom: 15px;
                        }
                        strong, b {
                            color: #ffffff;
                        }
                        .user-message {
                            background-color: #17472D; 
                            color: #ffffff;
                            margin-bottom: 15px;
                            padding: 10px;
                            border-radius: 10px;
                            display: flex;
                            align-items: flex-start;
                        }
                        .ai-message {
                            color: #e0e0e0;
                            margin-bottom: 15px;
                        }
                        .user-icon {
                            font-size: 24px;
                            margin-right: 10px;
                        }
                        .message-content {
                            flex-grow: 1;
                        }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${content}
                </body>
            </html>
        `;

        // Create a new page for PDF generation
        const pdfPage = await context.newPage();
        await pdfPage.setContent(htmlContent);

        // Generate PDF with background
        const pdfBuffer = await pdfPage.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        // Save PDF to a file
        const pdfFileName = `content_${Date.now()}.pdf`;
        const pdfPath = path.join(process.cwd(), 'public', pdfFileName);
        await fs.writeFile(pdfPath, pdfBuffer);

        // Return the path of the saved PDF
        return NextResponse.json({ 
            message: 'PDF generated and saved successfully',
            pdfPath: `/public/${pdfFileName}`
        });
    } catch (error) {
        console.error('Scraping or PDF generation failed:', error);
        return NextResponse.json({ error: 'Failed to fetch content or generate PDF' }, { status: 500 });
    }
}