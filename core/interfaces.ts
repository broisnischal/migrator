export interface MigrationAdapter {
  generateMigration(name: string): Promise<void>;
  applyMigrations(): Promise<void>;
  revertMigration(): Promise<void>;
  getStatus(): Promise<MigrationStatus>;
}

export type MigrationStatus = {
  pending: string[];
  applied: string[];
};

export type ORMType = "prisma" | "drizzle"; // "sequelize"
