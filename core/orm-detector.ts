import { existsSync } from "fs";
import path from "path";

export async function detectORM(): Promise<string> {
  if (existsSync("prisma/schema.prisma")) return "prisma";
  if (existsSync("drizzle.config.ts")) return "drizzle";
  if (existsSync("ormconfig.json")) return "typeorm";

  throw new Error("No supported ORM detected");
}
