import type { MigrationAdapter, MigrationStatus } from "../../core/interfaces";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { readFileSync, existsSync } from "fs";
import path from "path";

export class DrizzleAdapter implements MigrationAdapter {
  private dbClient: Client;
  private migrationFolder: string;

  constructor() {
    this.dbClient = this.createDbClient();
    this.migrationFolder = this.findMigrationFolder();
  }

  async generateMigration(name: string): Promise<void> {
    if (!name) {
      throw new Error("Migration name is required");
    }

    await migrate(drizzle(this.dbClient), {
      migrationsFolder: this.migrationFolder,
      migrationsSchema: "drizzle",
      //   migrationName: name,
    });
  }

  async applyMigrations(): Promise<void> {
    await migrate(drizzle(this.dbClient), {
      migrationsFolder: this.migrationFolder,
      migrationsSchema: "drizzle",
    });
  }

  async revertMigration(): Promise<void> {
    throw new Error(
      "Drizzle does not support revert migrations directly. Use manual SQL instead."
    );
  }

  async getStatus(): Promise<MigrationStatus> {
    const result = await this.dbClient.query(
      `SELECT * FROM drizzle.__drizzle_migrations`
    );

    const applied = result.rows.map((row) => row.name);
    const pending = await this.getPendingMigrations(applied);

    return { applied, pending };
  }

  private async getPendingMigrations(applied: string[]): Promise<string[]> {
    const migrationFiles = readFileSync(this.migrationFolder, "utf-8")
      .split("\n")
      .filter((line) => line.endsWith(".sql"));

    return migrationFiles.filter((file) => !applied.includes(file));
  }

  private createDbClient(): Client {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is required");
    }

    return new Client({ connectionString });
  }

  private findMigrationFolder(): string {
    const possiblePaths = [
      "drizzle/migrations",
      "src/drizzle/migrations",
      "migrations",
    ];

    for (const possiblePath of possiblePaths) {
      if (existsSync(possiblePath)) {
        return possiblePath;
      }
    }

    throw new Error("Drizzle migrations folder not found");
  }
}
