import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: Request) {
    const { url }: { url: string } = await request.json();
    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const browser = await chromium.launch({ headless: true }); // Use chromium for Playwright
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });

        // Extract all articles with user and AI messages
        const conversations = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('article')).map(article => {
                const userMessage = article.querySelector('div[data-message-author-role="user"]')?.textContent?.trim() || '';
                const aiMessage = article.querySelector('div[data-message-author-role="assistant"]')?.textContent?.trim() || '';
                
                return {
                    user: userMessage,
                    ai: aiMessage
                };
            }).filter(conversation => conversation.user || conversation.ai); // Remove empty conversations
        });

        await browser.close();
        return NextResponse.json({ conversations });
    } catch (error) {
        console.error('Scraping failed:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}
