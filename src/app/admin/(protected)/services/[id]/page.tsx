import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ServiceForm from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';

async function createService(formData: FormData) {
  'use server';
  await db.service.create({
    data: {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      shortDescription: formData.get('shortDescription') as string,
      description: formData.get('description') as string,
      symptoms: formData.get('symptoms') as string,
      whoShouldApply: formData.get('whoShouldApply') as string,
      examinationProcess: formData.get('examinationProcess') as string,
      treatmentApproach: formData.get('treatmentApproach') as string,
      icon: formData.get('icon') as string,
      coverImage: formData.get('coverImage') as string,
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
}

async function updateService(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.service.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      shortDescription: formData.get('shortDescription') as string,
      description: formData.get('description') as string,
      symptoms: formData.get('symptoms') as string,
      whoShouldApply: formData.get('whoShouldApply') as string,
      examinationProcess: formData.get('examinationProcess') as string,
      treatmentApproach: formData.get('treatmentApproach') as string,
      icon: formData.get('icon') as string,
      coverImage: formData.get('coverImage') as string,
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
}

export default async function ServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  let initialData = null;

  if (!isNew) {
    initialData = await db.service.findUnique({
      where: { id }
    });

    if (!initialData) {
      notFound();
    }
  }

  return (
    <div>
      <AdminPageHeader 
        title={isNew ? "Yeni Xidmət Əlavə Et" : "Xidməti Redaktə Et"} 
        description="Aşağıdakı formu dolduraraq xidmət məlumatlarını daxil edin."
      />
      
      <ServiceForm 
        serviceAction={isNew ? createService : updateService}
        initialData={initialData}
      />
    </div>
  );
}
