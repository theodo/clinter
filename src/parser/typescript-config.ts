import { exec } from "child-process-promise";
import { getPackageTool, PackageTool } from "parser/package-tool";

const getTSConfigShellString = (dirPath: string, packageTool: PackageTool): string => {
  if (packageTool === PackageTool.NPM) {
    return `npx tsc --showConfig -p ${dirPath}`;
  }

  if (packageTool === PackageTool.YARN) {
    return `yarn --silent tsc --showConfig -p ${dirPath}`;
  }

  throw new Error("Unsupported package tool !");
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
  return tsconfig.config?.compilerOptions?.strictNullChecks ?? tsconfig.config?.compilerOptions?.strict ?? false;
};

export const hasTSStrictNullChecks = async (dirPath: string): Promise<boolean> => {
  const tsconfig = await loadTSConfig(dirPath);
  return getStrictNullChecksOption(tsconfig);
};
