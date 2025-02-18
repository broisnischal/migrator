// config.d.ts
declare module "@super-migrator/config" {
  import { SuperMigratorConfig } from "./supermigrator.config";
  const config: SuperMigratorConfig;
  export default config;
}
