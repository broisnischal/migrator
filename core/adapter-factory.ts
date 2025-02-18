import { PrismaAdapter } from "../adapters/prisma";
import { DrizzleAdapter } from "../adapters/drizzle";
import type { MigrationAdapter } from "./interfaces";

type ORMType = "prisma" | "drizzle"; // "sequelize"

const adapterRegistry: Record<ORMType, new () => MigrationAdapter> = {
  prisma: PrismaAdapter,
  drizzle: DrizzleAdapter,
};

export function getAdapter(orm: ORMType): MigrationAdapter {
  const AdapterClass = adapterRegistry[orm];
  if (!AdapterClass) {
    throw new Error(`No adapter found for ORM: ${orm}`);
  }
  return new AdapterClass();
}
