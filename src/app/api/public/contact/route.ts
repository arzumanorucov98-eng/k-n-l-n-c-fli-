import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional().or(z.literal('')),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const contactMessage = await db.contactMessage.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName || '',
        phone: validatedData.phone,
        email: validatedData.email || '',
        message: validatedData.message,
        isRead: false
      }
    });

    // Send email using nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Dr. Könül Nəcəfli Saytı" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          subject: 'YENİ MESAJ: ' + validatedData.firstName,
          html: `
            <h3>Saytdan yeni mesaj</h3>
            <p><strong>Ad:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Telefon:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${validatedData.email || '-'}</p>
            <p><strong>Mesaj:</strong><br/>${validatedData.message.replace(/\n/g, '<br/>')}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
      }
    }

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch (error) {
    console.error('Contact API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Daxili server xətası' }, { status: 500 });
  }
}
