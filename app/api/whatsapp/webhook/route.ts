import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/lib/evolution';
import { generateChemistryAnswer } from '@/lib/ai-tutor';

// WhatsApp AI Webhook Handler for Evolution API
// Trigger Phrase: "للذكاء الاصطناعي كيمياء"
const TRIGGER_PATTERNS = [
  /^للذكاء\s+الاصطناعي\s+كيمياء:?\s*(.*)/i,
  /^للذكاء\s+الاصطناعي\s+كيمياء\s+(.*)/i,
  /^!كيمياء\s*(.*)/i,
  /^كيمياء:\s*(.*)/i,
  /^!chem\s*(.*)/i
];

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Handle all Evolution API payload formats (array, object, Baileys messages.upsert)
    const rawData = payload?.data || payload;
    const msgItem = Array.isArray(rawData) 
      ? rawData[0] 
      : (rawData?.messages && Array.isArray(rawData.messages) ? rawData.messages[0] : rawData);

    const messageKey = msgItem?.key || {};
    const fromMe = messageKey?.fromMe;

    // Ignore messages sent by the bot itself to prevent infinite loops
    if (fromMe) {
      return NextResponse.json({ status: 'ignored', reason: 'fromMe is true' });
    }

    const remoteJid = messageKey?.remoteJid || msgItem?.remoteJid || msgItem?.phone || msgItem?.number;
    if (!remoteJid) {
      return NextResponse.json({ status: 'ignored', reason: 'No remoteJid found' });
    }

    // Ignore status broadcasts and group messages unless intended
    if (remoteJid.includes('status@broadcast') || remoteJid.includes('@newsletter')) {
      return NextResponse.json({ status: 'ignored', reason: 'Broadcast message' });
    }

    // Extract message text across different Evolution API message structures
    const messageObj = msgItem?.message || {};
    const incomingText = (
      messageObj?.conversation ||
      messageObj?.extendedTextMessage?.text ||
      messageObj?.imageMessage?.caption ||
      msgItem?.text ||
      payload?.text ||
      ''
    ).trim();

    if (!incomingText) {
      return NextResponse.json({ status: 'ignored', reason: 'Empty text' });
    }

    // Check if the message matches our specified trigger: "للذكاء الاصطناعي كيمياء"
    let query = '';
    let isTriggered = false;

    for (const pattern of TRIGGER_PATTERNS) {
      const match = incomingText.match(pattern);
      if (match) {
        query = (match[1] || '').trim();
        isTriggered = true;
        break;
      }
    }

    // If query is empty after trigger
    if (isTriggered && !query) {
      const helpMsg = `✨ *المساعد الكيميائي الذكي - أ. فرح نشأت*\n\n` +
        `أهلاً بك! يمكنك سؤالي عن أي مفهوم، معادلة أو تجربة كيميائية 🧪🌸\n\n` +
        `💡 *طريقة الاستخدام:*\n` +
        `أرسل: *للذكاء الاصطناعي كيمياء [سؤالك]*\n\n` +
        `مثال: *للذكاء الاصطناعي كيمياء ما الفرق بين الحمض القوي والضعيف؟*`;

      await sendWhatsAppNotification(remoteJid, helpMsg);
      return NextResponse.json({ status: 'success', action: 'sent_help_menu' });
    }

    // If not triggered with prefix, ignore
    if (!isTriggered) {
      return NextResponse.json({ status: 'ignored', reason: 'Trigger phrase not matched' });
    }

    // Detect language
    const isEnglish = /[a-zA-Z]/.test(query) && !/[\u0600-\u06FF]/.test(query);
    const lang = isEnglish ? 'en' : 'ar';

    // Generate response using expanded friendly persona & cf/zai-org/glm-5.3-flash
    const aiResult = await generateChemistryAnswer(query, lang);

    // Format message nicely for WhatsApp
    const formattedReply = `✨ *المساعد الكيميائي الذكي (أ. فرح نشأت):*\n` +
      `━━━━━━━━━━━━━━━\n\n` +
      `${aiResult.reply}\n\n` +
      `━━━━━━━━━━━━━━━\n` +
      `🧪 *منصة كيمياء أ. فرح نشأت*\n` +
      `🔗 https://farahnashat.com`;

    // Send WhatsApp reply back to user
    await sendWhatsAppNotification(remoteJid, formattedReply);

    return NextResponse.json({
      status: 'success',
      action: 'replied',
      recipient: remoteJid,
      query,
      source: aiResult.source
    });

  } catch (error: any) {
    console.error('WhatsApp Webhook Error:', error);
    return NextResponse.json({ error: error?.message || 'Webhook processing failed' }, { status: 500 });
  }
}
