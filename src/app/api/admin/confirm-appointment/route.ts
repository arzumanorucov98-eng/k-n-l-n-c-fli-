import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  // Auth check
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { appointmentId, status } = await request.json();

    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });

    // Send confirmation email if status is confirmed and email exists
    if (status === 'confirmed' && appointment.email && process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '465'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Dr. Könül Nəcəfli" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: appointment.email,
          subject: 'Rezervasiyanız Təsdiqləndi ✅',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1a365d;">Rezervasiyanız Təsdiqləndi! ✅</h2>
              <p>Hörmətli <strong>${appointment.firstName} ${appointment.lastName}</strong>,</p>
              <p>Sizin qəbul sorğunuz təsdiq edildi. Sizi aşağıda təyin etdiyiniz vaxtda klinikamıza gözləyirik:</p>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Tarix:</strong> ${appointment.date}</p>
                <p style="margin: 5px 0;"><strong>Saat:</strong> ${appointment.time}</p>
              </div>
              <p>Hər hansı sualınız üçün bizimlə əlaqə saxlaya bilərsiniz.</p>
              <p>Təşəkkürlər,<br/><strong>Dr. Könül Nəcəfli</strong></p>
            </div>
          `,
        });

        console.log('Email sent to:', appointment.email);
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({ success: true, status: appointment.status });
  } catch (error) {
    console.error('Confirm appointment error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await db.appointment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
