import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@drkonulnecefli.az' },
  });

  if (existingAdmin) {
    console.log('Admin already exists.');
    return;
  }

  // Create default admin
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: 'admin@drkonulnecefli.az',
      passwordHash: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`Created admin with email: ${admin.email}`);
  
  // Seed initial basic settings
  const doctorProfile = await prisma.doctorProfile.create({
    data: {
      name: 'Dr. Könül Nəcəfli',
      title: 'Nevroloq',
      bio: 'Peşəkar nevroloq',
      education: 'Azərbaycan Tibb Universiteti',
      experience: '15+ il təcrübə',
    }
  });

  console.log(`Created default doctor profile for: ${doctorProfile.name}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
