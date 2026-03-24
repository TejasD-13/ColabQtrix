import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const rawDatabaseUrl = process.env.DATABASE_URL?.trim();

if (!rawDatabaseUrl) {
  throw new Error('DATABASE_URL is missing. Set DATABASE_URL in your environment variables.');
}

if (
  (rawDatabaseUrl.startsWith('"') && rawDatabaseUrl.endsWith('"')) ||
  (rawDatabaseUrl.startsWith("'") && rawDatabaseUrl.endsWith("'"))
) {
  process.env.DATABASE_URL = rawDatabaseUrl.slice(1, -1);
}

const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}

export default db;
