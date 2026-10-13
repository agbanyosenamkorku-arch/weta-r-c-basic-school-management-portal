import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const adminExists = await prisma.user.findUnique({ where: { email: 'admin@wetarc.edu.gh' } });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('123456', 10);
    await prisma.user.create({
      data: {
        email: 'admin@wetarc.edu.gh',
        name: 'School Administrator',
        passwordHash,
        role: 'ADMIN',
      },
    });
  }

  const classExists = await prisma.classRoom.findFirst({ where: { name: 'Grade 1', section: 'A' } });
  if (!classExists) {
    await prisma.classRoom.create({
      data: { name: 'Grade 1', section: 'A' },
    });
  }

  const subjectExists = await prisma.subject.findFirst({ where: { code: 'ENG' } });
  if (!subjectExists) {
    await prisma.subject.create({
      data: {
        name: 'English Language',
        code: 'ENG',
        teacherId: '',
      },
    });
  }

  console.log('Seed data created successfully');
}

seed()
  .catch((e) => {
    console.error('Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
