import { NextResponse } from 'next/server';
import { generateChemistryAnswer } from '@/lib/ai-tutor';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, messages = [], lang = 'ar' } = body;

    const userQuery = message || (messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userQuery) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const result = await generateChemistryAnswer(userQuery, lang);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      source: result.source,
      model: result.source === 'workers-ai' ? '@cf/meta/llama-3-8b-instruct' : 'collins-chemistry-engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Chat AI error' }, { status: 500 });
  }
}
