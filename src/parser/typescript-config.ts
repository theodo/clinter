import { exec } from "child-process-promise";
import { getPackageTool, PackageTool } from "parser/package-tool";

const getTSConfigShellString = (dirPath: string, packageTool: PackageTool): string => {
  switch (packageTool) {
    case PackageTool.NPM:
      return `npx tsc --showConfig -p ${dirPath}`;

    case PackageTool.YARN:
      return `yarn --silent tsc --showConfig -p ${dirPath}`;

    case PackageTool.YARN_BERRY:
      return `yarn tsc --showConfig -p ${dirPath}`;

    case PackageTool.PNPM:
      return `pnpm tsc --showConfig -p ${dirPath}`;

    default:
      throw new Error(`Unsupported package tool:  !`);
  }
};

const loadTSConfig = async (dirPath: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    exec(getTSConfigShellString(dirPath, getPackageTool(dirPath)))
      .then((result) => {
        resolve(JSON.parse(result.stdout));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getStrictNullChecksOption = (tsconfig: Record<string, any>): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return tsconfig.compilerOptions?.strictNullChecks ?? tsconfig.compilerOptions?.strict ?? false;
};

export const hasTSStrictNullChecks = async (dirPath: string): Promise<boolean> => {
  const tsconfig = await loadTSConfig(dirPath);
  return getStrictNullChecksOption(tsconfig);
};
