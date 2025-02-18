import { existsSync } from "fs";
import { join } from "path";
import type { PackageManager } from "./interfaces";

export function getPackageManager(): PackageManager {
  const projectDir = process.cwd();

  if (existsSync(join(projectDir, "yarn.lock"))) {
    return "yarn";
  }

  if (
    existsSync(join(projectDir, "pnpm-lock.yaml")) ||
    existsSync(join(projectDir, "pnpm-workspace.yaml"))
  ) {
    return "pnpm";
  }

  if (existsSync(join(projectDir, "package-lock.json"))) {
    return "npm";
  }

  if (existsSync(join(projectDir, "bun.lockb"))) {
    return "bun";
  }

  return "unknown";
}

export function getCMD(packageManager: PackageManager): string {
  switch (packageManager) {
    case "yarn":
      return "yarn";
    case "pnpm":
      return "pnpm";
    case "npm":
      return "npm";
    case "bun":
      return "bun";
    default:
      throw new Error(`Unknown package manager: ${packageManager}`); // TODO::Handle-Error-Later
  }
}
