import fs from "fs";
import path from "path";

export enum PackageTool {
  NPM = "NPM",
  YARN = "YARN",
  YARN_BERRY = "YARN_BERRY",
  PNPM = "PNPM",
}

export function getPackageTool(currentDirPath: string = process.cwd()): PackageTool {
  if (fs.existsSync(path.resolve(currentDirPath, "package-lock.json"))) {
    return PackageTool.NPM;
  }

  if (fs.existsSync(path.resolve(currentDirPath, ".yarnrc.yml"))) {
    return PackageTool.YARN_BERRY;
  }

  if (fs.existsSync(path.resolve(currentDirPath, "yarn.lock"))) {
    return PackageTool.YARN;
  }

  if (fs.existsSync(path.resolve(currentDirPath, "pnpm-lock.yaml"))) {
    return PackageTool.PNPM;
  }

  throw new Error("Unable to determine package manager");
}
