import fs from "fs";
import path from "path";

export enum PackageTool {
  NPM = "NPM",
  YARN = "YARN",
  YARN_BERRY = "YARN_BERRY",
}

export function getPackageTool(currentDirPath: string = process.cwd()): PackageTool {
  return fs.existsSync(path.resolve(currentDirPath, "package-lock.json"))
    ? PackageTool.NPM
    : fs.existsSync(path.resolve(currentDirPath, ".yarnrc.yml"))
    ? PackageTool.YARN_BERRY
    : PackageTool.YARN;
}
