import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { addDummyFeedback } from './dummy-feedback';
import { addDummyUsers } from './dummy-user';


const globalForPrisma = global as unknown as { 
    db: PrismaClient
}

const db = globalForPrisma.db || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db

export default db

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
