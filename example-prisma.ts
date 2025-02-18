import { PrismaAdapter } from "./adapters/prisma";

const prismaAdapter = new PrismaAdapter();

await prismaAdapter.generateMigration("init");
await prismaAdapter.applyMigrations();
