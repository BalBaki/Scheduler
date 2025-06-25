import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';
const prisma = new PrismaClient();

const addAdminUser = async () => {
    return prisma.user.upsert({
        where: {
            email: ADMIN_EMAIL,
        },
        update: {},
        create: {
            email: ADMIN_EMAIL,
            password: await hash(ADMIN_PASSWORD, 15),
            name: 'admin',
            surname: 'admin',
            phoneNumber: '12345678',
            status: 'APPROVED',
            role: 'ADMIN',
        },
    });
};

const run = async () => {
    try {
        await addAdminUser();

        console.log(`✅ Admin user was added to db`);
    } catch (err) {
        console.error('❌ Error at adding admin user to db:', err);

        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

run();
