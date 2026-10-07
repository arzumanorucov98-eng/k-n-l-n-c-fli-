import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const [doctorProfile, settings, videos, blogPosts, faqs, services, locations] = await Promise.all([
      db.doctorProfile.findFirst({ where: { locale: 'az' } }),
      db.siteSetting.findMany(),
      db.video.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, take: 6 }),
      db.blogPost.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
      db.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      db.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      db.location.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    ]);

    const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

    return NextResponse.json({
      doctor: doctorProfile,
      contact: {
        phone: getSetting('contact_phone'),
        whatsapp: getSetting('contact_whatsapp'),
        email: getSetting('contact_email'),
        address: getSetting('contact_address'),
        workhours: getSetting('contact_workhours'),
        map_embed: getSetting('contact_map_embed'),
      },
      social: {
        instagram: getSetting('social_instagram'),
        tiktok: getSetting('social_tiktok'),
        youtube: getSetting('social_youtube'),
      },
      videos,
      blogPosts,
      faqs,
      services,
      locations,
    });
  } catch (error) {
    console.error('Site data error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
