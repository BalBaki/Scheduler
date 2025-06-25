import 'server-only';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from '@/services/env.service';

const globalForPrisma = global as unknown as {
    db: PrismaClient;
};

const db = globalForPrisma.db || new PrismaClient().$extends(withAccelerate());

// .$extends({
//     query: {
//         user: {
//             async update({ args, query }) {
//                 if (args.data.status !== 'APPROVED' || args.data.slug)
//                     return query(args);

//                 const doctor = await db.user.findUnique({
//                     where: {
//                         id: args.where.id,
//                         role: 'DOCTOR',
//                     },
//                 });

//                 if (!!doctor && !doctor.slug) {
//                     args.data.slug = await SlugifyService.createDoctorSlug(
//                         doctor.name,
//                         doctor.surname,
//                     );
//                 }

//                 return query(args);
//             },
//             async updateMany({ args, query }) {
//                 if (args.data.status !== 'APPROVED') return query(args);

//                 const doctors = await db.user.findMany({
//                     where: { ...args.where, role: 'DOCTOR' },
//                 });

//                 await db.$transaction(async (tx) => {
//                     for (const doctor of doctors) {
//                         const slug = await SlugifyService.createDoctorSlug(
//                             doctor.name,
//                             doctor.surname,
//                         );

//                         await tx.user.update({
//                             data: { slug },
//                             where: { id: doctor.id },
//                         });
//                     }
//                 });

//                 return query(args);
//             },
//         },
//     },
// });

if (!env.isProduction) globalForPrisma.db = db;

export default db;
