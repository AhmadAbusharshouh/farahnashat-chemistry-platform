import { NextResponse } from 'next/server';
import { generateChemistryAnswer, UserContext } from '@/lib/ai-tutor';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      message, 
      messages = [], 
      lang = 'ar',
      userName,
      studentName,
      whatsappName,
      registeredName,
      phoneNumber,
      phone
    } = body;

    const userQuery = message || (messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userQuery) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userContext: UserContext = {
      userName: userName || studentName,
      registeredName: registeredName || userName || studentName,
      whatsappName: whatsappName,
      phoneNumber: phoneNumber || phone
    };

    const result = await generateChemistryAnswer(userQuery, lang, userContext);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      source: result.source,
      model: result.source === 'workers-ai' ? (result.model || 'cf/zai-org/glm-5.3-flash') : 'collins-chemistry-engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Chat AI error' }, { status: 500 });
  }
}
