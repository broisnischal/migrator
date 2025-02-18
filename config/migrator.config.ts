export interface SuperMigratorConfig {
  /**
   * @default "auto"
   * @description ORM to use for migrations
   */
  orm?: "prisma" | "drizzle" | "typeorm" | "auto";

  /**
   * @default "migrations"
   * @description Directory to store migration files
   */
  migrationDir?: string;

  /**
   * @description Database connection configuration
   * @examples ["DATABASE_URL", "postgres://user:pass@host:port/db"]
   */
  dbConnection?:
    | string
    | {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
      };

  /**
   * @default false
   * @description Enable verbose logging
   */
  verbose?: boolean;

  /**
   * @description ORM-specific configuration overrides
   */
  overrides?: {
    prisma?: {
      schemaLocation?: string;
    };
    drizzle?: {
      schemaModule?: string;
    };
    typeorm?: {
      entities?: string[];
    };
  };
}

// Validation function
export function validateConfig(
  config: unknown
): asserts config is SuperMigratorConfig {
  // Implementation would use JSON Schema validation
}
