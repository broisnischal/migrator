import { readFileSync } from "fs";
import {
  validateConfig,
  type SuperMigratorConfig,
} from "../config/migrator.config";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function loadConfig(): SuperMigratorConfig {
  try {
    const config = JSON.parse(readFileSync("migrator.json", "utf-8"));
    const validate = ajv.compile(require("./migrator.schema.json"));

    if (!validate(config)) {
      throw new Error(`Invalid config: ${ajv.errorsText(validate.errors)}`);
    }

    return config as SuperMigratorConfig;
  } catch (error) {
    return {}; // Return defaults
  }
}
