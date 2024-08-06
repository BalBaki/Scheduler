import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { addDummyFeedback } from './dummy-feedback';
import { addDummyUsers } from './dummy-user';

const prismaClientSingleton = () => {
    return new PrismaClient().$extends(withAccelerate());
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// db.user
//     .upsert({
//         where: {
//             email: 'admin@gmail.com',
//         },
//         update: {},
//         create: {
//             name: 'admin',
//             surname: 'name',
//             email: 'admin@gmail.com',
//             password: '',
//             status: 'APPROVED',
//             role: 'ADMIN',
//             phoneNumber: '123456789',
//         },
//     })
//     .then(() => console.log('Admin User Created...'))
//     .catch(() => console.log('Error at Creating Admin User'));

// addDummyUsers(50);
// addDummyFeedback(50);
