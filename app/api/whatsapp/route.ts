import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/lib/evolution';

export async function POST(req: Request) {
  try {
    const { phone, name, type, feedback } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const message = `✨ *منصة كيمياء الصف التاسع - أ. فرح نشأت*\n` +
      `🏛 *المدرسة الإسلامية الحديثة - إربد (حكما)*\n\n` +
      `أهلاً بك أ. ${name || 'الكريم'}،\n` +
      `يسعدنا إرسال ملخص الحصة النموذجية لدرس (الحموض والقواعد ص 43-55) ورابط المختبر الافتراضي:\n` +
      `🧪 المختبر الرقمي: https://farahnashat-chemistry.pages.dev/virtual-lab\n` +
      `📋 خطة الـ 10 دقائق: https://farahnashat-chemistry.pages.dev/lesson-plan\n\n` +
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
