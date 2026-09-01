// Evolution API Client for WhatsApp Notifications and Verification

export interface EvolutionMessagePayload {
  number: string;
  text: string;
}

export async function sendWhatsAppNotification(
  phone: string,
  message: string,
  env?: { EVOLUTION_API_URL?: string; EVOLUTION_INSTANCE_NAME?: string; EVOLUTION_API_KEY?: string }
): Promise<{ success: boolean; data?: any; error?: string }> {
  const apiUrl = env?.EVOLUTION_API_URL || process.env.NEXT_PUBLIC_EVOLUTION_API_URL || process.env.EVOLUTION_API_URL || 'https://wa.alphaperfume.net';
  const instance = env?.EVOLUTION_INSTANCE_NAME || process.env.NEXT_PUBLIC_EVOLUTION_INSTANCE_NAME || process.env.EVOLUTION_INSTANCE_NAME || 'farah';
  const apiKey = env?.EVOLUTION_API_KEY || process.env.NEXT_PUBLIC_EVOLUTION_API_KEY || process.env.EVOLUTION_API_KEY || 'AlphaSecretKey2026!357951****++';

  // Normalize phone number (Jordan format 9627XXXXXXXX or global)
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('07') && cleanPhone.length === 10) {
    cleanPhone = '962' + cleanPhone.substring(1);
  } else if (cleanPhone.startsWith('7') && cleanPhone.length === 9) {
    cleanPhone = '962' + cleanPhone;
  }

  try {
    const res = await fetch(`${apiUrl}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
      },
      body: JSON.stringify({
        number: cleanPhone,
        text: message,
        options: {
          delay: 1200,
          presence: 'composing',
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Evolution API HTTP ${res.status}: ${errText}` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error connecting to Evolution API',
    };
  }
}
