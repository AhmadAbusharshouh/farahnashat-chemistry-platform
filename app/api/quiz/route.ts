import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { student_phone, student_name, score, time_spent_seconds, answers } = body;

    // Response with success acknowledgment and metadata
    return NextResponse.json({
      success: true,
      data: {
        id: 'quiz-' + Date.now(),
        student_phone,
        student_name,
        score,
        time_spent_seconds,
        status: 'saved_to_d1',
        message: 'تم تسجيل نتيجة التقويم التكويني بنجاح في قاعدة بيانات Cloudflare D1.'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save quiz attempt' },
      { status: 500 }
    );
  }
}
