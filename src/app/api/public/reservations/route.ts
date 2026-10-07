import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const reservationSchema = z.object({
  serviceId: z.string().optional(),
  locationId: z.string().optional(),
  date: z.string().min(1),
  time: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal('')),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = reservationSchema.parse(body);

    const appointment = await db.appointment.create({
      data: {
        serviceId: validatedData.serviceId || null,
        locationId: validatedData.locationId || null,
        date: validatedData.date,
        time: validatedData.time,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        email: validatedData.email || '',
        notes: validatedData.notes || '',
        status: 'new'
      }
    });

    // Optionally: send email using nodemailer here if configured
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
          subject: 'YENİ REZERVASİYA: ' + validatedData.firstName + ' ' + validatedData.lastName,
          html: `
            <h3>Yeni Rezervasiya Məlumatları</h3>
            <p><strong>Tarix və Saat:</strong> ${validatedData.date} ${validatedData.time}</p>
            <p><strong>Pasiyent:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Telefon:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${validatedData.email || '-'}</p>
            <p><strong>Qeyd:</strong> ${validatedData.notes || '-'}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Do not fail the whole request if email fails
      }
    }

    return NextResponse.json({ success: true, id: appointment.id });
  } catch (error) {
    console.error('Reservation API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Daxili server xətası' }, { status: 500 });
  }
}
