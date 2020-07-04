import fs from "fs";
import path from "path";

export enum PackageTool {
  NPM = "NPM",
  YARN = "YARN",
}

export function getPackageTool(currentDirPath: string = process.cwd()): PackageTool {
  return fs.existsSync(path.resolve(currentDirPath, "yarn.lock")) ? PackageTool.YARN : PackageTool.NPM;
}
