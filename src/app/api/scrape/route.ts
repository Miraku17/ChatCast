import { NextResponse } from "next/server";
import { chromium } from "playwright";

// Types
interface RequestBody {
  url: string;
  fileName?: string;
  paperFormat?: string;
  darkMode?: boolean;
}

// Constants
const ALLOWED_PAPER_FORMATS = ["A4", "Letter", "Legal"];
const MAX_FILENAME_LENGTH = 255;
const DEFAULT_PAPER_FORMAT = "A4";

// Utility Functions
function sanitizeFileName(fileName: string): string {
  if (!fileName) return "downloaded-content.pdf";
  
  // Remove any dangerous characters and limit length
  let sanitized = fileName
    .replace(/[^a-zA-Z0-9-_\.]/g, "_")
    .slice(0, MAX_FILENAME_LENGTH);

  // Ensure .pdf extension
  return sanitized.endsWith(".pdf") ? sanitized : `${sanitized}.pdf`;
}

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function generateStylesheet(darkMode: boolean): string {
  return `
    <style>
      body { 
        font-family: Arial, sans-serif; 
        padding: 20px; 
        line-height: 1.6;
        color: ${darkMode ? "#e0e0e0" : "#333333"};
        background-color: ${darkMode ? "#333333" : "#ffffff"};
      }
      h1 {
        color: ${darkMode ? "#ffffff" : "#000000"};
        border-bottom: 1px solid ${darkMode ? "#444444" : "#eeeeee"};
        padding-bottom: 10px;
      }
      pre {
        background-color: ${darkMode ? "#1a1a1a" : "#f5f5f5"};
        color: ${darkMode ? "#00ff00" : "#333333"};
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
        color: ${darkMode ? "#ffffff" : "#000000"};
      }
      .user-message {
        background-color: ${darkMode ? "#17472D" : "#e8f5e9"}; 
        color: ${darkMode ? "#ffffff" : "#000000"};
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        align-items: flex-start;
      }
      .ai-message {
        background-color: ${darkMode ? "#1a1a1a" : "#f5f5f5"};
        color: ${darkMode ? "#e0e0e0" : "#333333"};
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 10px;
      }
      .user-icon {
        font-size: 24px;
        margin-right: 10px;
      }
      .message-content {
        flex-grow: 1;
      }
      .message-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    </style>
  `;
}

// Main PDF Generation Function
async function generatePDF(options: {
  url: string;
  paperFormat?: string;
  darkMode?: boolean;
}): Promise<{
  buffer: Buffer;
  title: string;
}> {
  const { url, paperFormat = DEFAULT_PAPER_FORMAT, darkMode = false } = options;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Extract content
    const { content, title } = await page.evaluate(() => {
      const titleElement = document.querySelector("title");
      const title = titleElement ? titleElement.textContent || "Downloaded Content" : "Downloaded Content";

      const messageElements = document.querySelectorAll(
        "div[data-message-author-role]"
      );
      let content = "";

      messageElements.forEach((element) => {
        const role = element.getAttribute("data-message-author-role");
        const isUserMessage = role === "user";
        const clonedElement = element.cloneNode(true) as HTMLElement;

        // Remove buttons
        clonedElement
          .querySelectorAll("button")
          .forEach((button) => button.remove());

        const wrapperDiv = document.createElement("div");
        wrapperDiv.className = isUserMessage ? "user-message" : "ai-message";

        // Add appropriate icon and content
        wrapperDiv.innerHTML = `
          <div class="message-container">
            <div class="user-icon">${isUserMessage ? "🙋" : "🤖"}</div>
            <div class="message-content">${clonedElement.innerHTML}</div>
          </div>
        `;

        content += wrapperDiv.outerHTML;
      });

      return { content, title };
    });

    if (!content) {
      throw new Error("No content found on the page");
    }

    // Generate HTML with styles
    const stylesheet = generateStylesheet(darkMode);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          ${stylesheet}
        </head>
        <body>
          <h1>${title}</h1>
          ${content}
        </body>
      </html>
    `;

    // Create PDF
    const pdfPage = await context.newPage();
    await pdfPage.setContent(htmlContent);

    const pdfBuffer = await pdfPage.pdf({
      format: paperFormat as any,
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return {
      buffer: pdfBuffer,
      title: title || "Downloaded Content", // Ensure title is always a string
    };
  } finally {
    await browser.close();
  }
}

// API Route Handler
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    // Validate required fields
    if (!body.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    if (!validateUrl(body.url)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Validate paper format if provided
    if (body.paperFormat && !ALLOWED_PAPER_FORMATS.includes(body.paperFormat)) {
      return NextResponse.json(
        { error: "Invalid paper format" },
        { status: 400 }
      );
    }

    // Generate PDF
    const { buffer, title } = await generatePDF({
      url: body.url,
      paperFormat: body.paperFormat,
      darkMode: body.darkMode,
    });

    // Use the title as filename, or custom filename if provided
    const fileName = body.fileName 
      ? sanitizeFileName(body.fileName)
      : sanitizeFileName(title || "Downloaded Content");

    // Return PDF as downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}