import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const SEED_PASSWORD = '12345678';
const prisma = new PrismaClient();

const addUserSeed = async (count: number) => {
    const hashedPassword = await hash(SEED_PASSWORD, 15);

    return await prisma.user.createMany({
        data: Array.from({ length: count }, (_, index) => {
            return {
                name: 'dummyuser' + Date.now(),
                surname: 'dummusurname' + Date.now(),
                email: `dummyemail${Date.now() + index}@gmail.com`,
                password: hashedPassword,
                phoneNumber: '12345678',
            };
        }),
    });
};

const run = async () => {
    const arg = process.argv[2];
    const count = arg ? parseInt(arg, 10) : 50;

    try {
        await addUserSeed(count);

        console.log(`✅ ${count} users were added to db`);
    } catch (err) {
        console.error('❌ Error at adding seeds to db:', err);

        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

run();
