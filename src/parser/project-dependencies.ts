import { CoreProperties } from "@schemastore/package";
import path from "path";
import { readFileSync } from "fs";

const PACKAGE_JSON_FILE_NAME = "package.json";

export const parseProjectDependencies = (dirPath: string): string[] => {
  const packageFile = JSON.parse(readFileSync(path.join(dirPath, PACKAGE_JSON_FILE_NAME), "utf-8")) as CoreProperties;
  return packageFile.dependencies ? Object.keys(packageFile.dependencies) : [];
};
