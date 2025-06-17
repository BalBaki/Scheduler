import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addFeedbackSeed = async (count: number) => {
    return await prisma.feedback.createMany({
        data: Array.from({ length: count }, (_, index) => {
            return {
                email: `dummyemail${Date.now() + index}@gmail.com`,
                message: `dummyemail${Date.now() + index}@gmail.com Magna consequat anim cupidatat deserunt ea consectetur ullamco sint qui pariatur sunt sit.`,
            };
        }),
    });
};

const run = async () => {
    const arg = process.argv[2];
    const count = arg ? parseInt(arg, 10) : 50;

    try {
        await addFeedbackSeed(count);

        console.log(`✅ ${count} feedbacks were added to db`);
    } catch (err) {
        console.error('❌ Error at adding seeds to db:', err);

        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

run();
