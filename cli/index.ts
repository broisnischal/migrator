import { Command } from "commander";
import { detectORM } from "../core/orm-detector";
import { getAdapter } from "../core/adapter-factory";

const program = new Command();

program.command("generate <name>").action(async (name) => {
  const orm = await detectORM();
  const adapter = getAdapter(orm);
  await adapter.generateMigration(name);
});

program.command("apply").action(async () => {
  const orm = await detectORM();
  const adapter = getAdapter(orm);
  await adapter.applyMigrations();
});

program.parse(process.argv);
