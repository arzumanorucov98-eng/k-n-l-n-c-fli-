import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import LocationForm from '@/components/admin/LocationForm';
import { notFound } from 'next/navigation';

async function createLocation(formData: FormData) {
  'use server';
  await db.location.create({
    data: {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      description: formData.get('description') as string,
      mapsUrl: formData.get('mapsUrl') as string,
      mapsEmbed: formData.get('mapsEmbed') as string,
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
}

async function updateLocation(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.location.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      description: formData.get('description') as string,
      mapsUrl: formData.get('mapsUrl') as string,
      mapsEmbed: formData.get('mapsEmbed') as string,
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
}

export default async function LocationEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  let initialData = null;

  if (!isNew) {
    initialData = await db.location.findUnique({
      where: { id }
    });

    if (!initialData) {
      notFound();
    }
  }

  return (
    <div>
      <AdminPageHeader 
        title={isNew ? "Yeni Rayon/Klinika Əlavə Et" : "Rayon/Klinikanı Redaktə Et"} 
        description="Aşağıdakı formu dolduraraq klinikalar barədə məlumat daxil edin."
      />
      
      <LocationForm 
        locationAction={isNew ? createLocation : updateLocation}
        initialData={initialData}
      />
    </div>
  );
}
