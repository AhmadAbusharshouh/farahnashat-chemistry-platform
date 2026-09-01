import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/lib/evolution';
import { generateChemistryAnswer } from '@/lib/ai-tutor';

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

    // Ignore status broadcasts and newsletter messages
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

    const query = incomingText;

    // Detect language
    const isEnglish = /[a-zA-Z]/.test(query) && !/[\u0600-\u06FF]/.test(query);
    const lang = isEnglish ? 'en' : 'ar';

    // Generate response using System Prompt & cf/zai-org/glm-5.3-flash
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
