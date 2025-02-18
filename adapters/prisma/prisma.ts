import {
  type MigrationAdapter,
  type MigrationStatus,
} from "../../core/interfaces";
import { spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import path from "path";

export class PrismaAdapter implements MigrationAdapter {
  private prismaSchemaPath: string;

  constructor() {
    this.prismaSchemaPath = this.findPrismaSchemaPath();
  }

  async generateMigration(name: string): Promise<void> {
    if (!name) {
      throw new Error("Migration name is required");
    }

    const cmd = `npx prisma migrate dev --name ${name} --schema ${this.prismaSchemaPath}`;
    this.executeCommand(cmd);
  }

  async applyMigrations(): Promise<void> {
    const cmd = `npx prisma migrate deploy --schema ${this.prismaSchemaPath}`;
    this.executeCommand(cmd);
  }

  async revertMigration(): Promise<void> {
    const cmd = `npx prisma migrate resolve --rolled-back "last_migration_name" --schema ${this.prismaSchemaPath}`;
    this.executeCommand(cmd);
  }

  async getStatus(): Promise<MigrationStatus> {
    const cmd = `npx prisma migrate status --schema ${this.prismaSchemaPath}`;
    const result = this.executeCommand(cmd, { stdio: "pipe" });

    const output = result.stdout.toString();
    const applied: string[] = [];
    const pending: string[] = [];

    if (output.includes("Database schema is up to date")) {
      return { applied, pending };
    }

    // Parse Prisma's migration status output
    output.split("\n").forEach((line) => {
      if (line.includes("(applied)")) {
        applied.push(line.replace("(applied)", "").trim());
      } else if (line.includes("(pending)")) {
        pending.push(line.replace("(pending)", "").trim());
      }
    });

    return { applied, pending };
  }

  private executeCommand(command: string, options = { stdio: "inherit" }) {
    const [cmd, ...args] = command.split(" ");
    const result = spawnSync(cmd, args);

    if (result.status !== 0) {
      throw new Error(`Prisma command failed: ${command}`);
    }

    return result;
  }

  private findPrismaSchemaPath(): string {
    const possiblePaths = [
      "prisma/schema.prisma",
      "src/prisma/schema.prisma",
      "lib/prisma/schema.prisma",
    ];

    for (const possiblePath of possiblePaths) {
      if (existsSync(possiblePath)) {
        return possiblePath;
      }
    }

    throw new Error("Prisma schema file not found");
  }
}
