import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetPassword() {
  const admins = await prisma.admin.findMany();
  console.log('Found admins:', admins.map(a => a.email));

  if (admins.length > 0) {
    const admin = admins[0];
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: hashedPassword }
    });
    console.log(`Password reset for ${admin.email} to "Admin123!"`);
  } else {
    console.log('No admins found.');
  }
}

resetPassword()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
