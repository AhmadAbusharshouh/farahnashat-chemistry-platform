import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/lib/evolution';

export async function POST(req: Request) {
  try {
    const { phone, name, type, feedback } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const message = `✨ *منصة الكيمياء التعليمية - أ. فرح نشأت*\n\n` +
      `أهلاً بك أ. ${name || 'الكريم'}،\n` +
      `يسعدنا إرسال روابط المختبر الافتراضي والاختبار التشخيصي:\n` +
      `🧪 المختبر الرقمي 3D: https://farahnashat-chemistry.pages.dev/virtual-lab\n` +
      `📋 اختبار التقويم والتشخيص: https://farahnashat-chemistry.pages.dev/quiz\n\n` +
      `شاكرين اهتمامكم وتواصلكم الطيب! 🌸`;

    const result = await sendWhatsAppNotification(phone, message);

    return NextResponse.json({
      success: true,
      data: result.data || { sent: true, phone }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'WhatsApp sending failed' }, { status: 500 });
  }
}
