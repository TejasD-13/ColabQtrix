import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const rawDatabaseUrl = process.env.DATABASE_URL?.trim();

if (
  rawDatabaseUrl &&
  ((rawDatabaseUrl.startsWith('"') && rawDatabaseUrl.endsWith('"')) ||
    (rawDatabaseUrl.startsWith("'") && rawDatabaseUrl.endsWith("'")))
) {
  process.env.DATABASE_URL = rawDatabaseUrl.slice(1, -1);
}

function getPrismaClient() {
  if (global.prisma) {
    return global.prisma;
  }

  const client = new PrismaClient();

  if (process.env.NODE_ENV !== 'production') {
    global.prisma = client;
  }

  return client;
}

const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    return client[prop as keyof PrismaClient];
  },
});

export default db;
