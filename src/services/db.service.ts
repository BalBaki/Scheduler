import 'server-only';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from '@/services/env.service';

const globalForPrisma = global as unknown as {
    db: PrismaClient;
};

const db = globalForPrisma.db || new PrismaClient().$extends(withAccelerate());

if (!env.isProduction) globalForPrisma.db = db;

export default db;
