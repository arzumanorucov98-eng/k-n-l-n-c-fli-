import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DoctorProfileForm from '@/components/admin/DoctorProfileForm';

async function saveProfile(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const data = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    bio: formData.get('bio') as string,
    education: formData.get('education') as string,
    experience: formData.get('experience') as string,
    certificates: formData.get('certificates') as string,
    conferences: formData.get('conferences') as string,
    approach: formData.get('approach') as string,
    photoUrl: formData.get('photoUrl') as string,
    aboutPhotoUrl: formData.get('aboutPhotoUrl') as string,
  };

  if (id) {
    await db.doctorProfile.update({ where: { id }, data });
  } else {
    await db.doctorProfile.create({ data });
  }
}

export default async function AdminDoctorPage() {
  let profile = await db.doctorProfile.findFirst({ where: { locale: 'az' } });

  if (!profile) {
    profile = await db.doctorProfile.create({
      data: {
        locale: 'az',
        name: 'Dr. Könül Nəcəfli',
        title: 'Nevroloq',
      }
    });
  }

  return (
    <div>
      <AdminPageHeader 
        title="Həkim Profili" 
        description="Doktorun şəkili, bioqrafiyası, təhsil və peşəkar məlumatlarını buradan idarə edin. Bu məlumatlar saytın 'Ana səhifə' və 'Həkim haqqında' səhifələrində göstərilir."
      />
      
      <DoctorProfileForm 
        saveAction={saveProfile}
        initialData={profile}
      />
    </div>
  );
}
