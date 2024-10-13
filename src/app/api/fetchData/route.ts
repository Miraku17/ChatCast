import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

type LinearConversationItem = {
  message: {
    author: {
      role: string;
    };
    content: {
      parts: string[];
    };
  };
};

type Message = {
  role: string;
  content: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { url }: { url: string } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const { data: html } = await axios.get<string>(url);
    const $ = cheerio.load(html);
    let remixContext = '';

    $('script').each((_, element) => {
      const scriptContent = $(element).html();
      if (scriptContent && scriptContent.includes('window.__remixContext')) {
        remixContext = scriptContent;
      }
    });

    if (!remixContext) {
      return NextResponse.json({ error: 'Remix context not found' }, { status: 404 });
    }

    const linearConversationMatch = remixContext.match(
      /"linear_conversation":\s*(\[[\s\S]*?\])(?=,\s*"has_user_editable_context")/
    );

    if (!linearConversationMatch) {
      return NextResponse.json({ error: 'Linear conversation not found' }, { status: 404 });
    }

    const linearConversation: LinearConversationItem[] = JSON.parse(linearConversationMatch[1]);

    const messages: Message[] = linearConversation
      .filter(item => item.message?.content?.parts && item.message.author.role !== 'system')
      .map(item => {
        const role = item.message.author.role;
        const content = item.message.content.parts.join(' ');

        if (role === 'user') {
          return { role: 'User', content };
        } else if (role === 'assistant') {
          return { role: 'Assistant', content };
        }
        return null;
      })
      .filter((message): message is Message => message !== null);

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetching failed:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
