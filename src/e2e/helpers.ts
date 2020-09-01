import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child-process-promise";

import { InputConfig } from "parser/inputConfig/types";
import { LinterConfigs } from "parser/linterConfig/types";
import { FormatterInfo, FrontFrameworkInfo, ModeInfo, TestFrameworkInfo, TypescriptInfo } from "types";

export interface TestService {
  loadInputConfig: (config: InputConfig) => void;
  loadInitialLinterConfig: (config: string) => void;
  loadInitialParsedLinterConfig: (config: LinterConfigs) => void;
  installPackages: (packages: string[]) => Promise<void>;
  runClinter: () => Promise<void>;
  getParsedOutputConfig: () => LinterConfigs;
  getOutputConfig: () => string;
  getInstalledPackages: () => string[];
}

export function makeTestService(outputFileName = ".eslintrc.json"): TestService {
  const id = uuidv4();
  const dirPath = `/tmp/${id}/`;
  const inputConfigPath = path.join(dirPath, "inputConfig.json");
  const packagePath = path.join(dirPath, "package.json");
  const outputConfigPath = path.join(dirPath, outputFileName);

  fs.mkdirSync(dirPath);

  const loadInputConfig = (config: InputConfig) => {
    fs.writeFileSync(inputConfigPath, JSON.stringify(config, null, 2));
  };

  const loadInitialLinterConfig = (config: string) => {
    fs.writeFileSync(outputConfigPath, config);
  };

  const loadInitialParsedLinterConfig = (config: LinterConfigs) => {
    fs.writeFileSync(outputConfigPath, JSON.stringify(config, null, 2));
  };

  const installPackages = (packages: string[]) => {
    return Promise.resolve();
  };

  const runClinter = () => {
    return exec(`node ${path.join(process.cwd(), "build/index.js")} --path ${dirPath} --inputFile ${inputConfigPath}`)
      .then(() => Promise.resolve())
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getOutputConfig = (): string => {
    return fs.readFileSync(outputConfigPath, "utf-8");
  };

  const getParsedOutputConfig = (): LinterConfigs => {
    return JSON.parse(fs.readFileSync(outputConfigPath, "utf-8")) as LinterConfigs;
  };

  const getInstalledPackages = () => {
    return [];
  };

  return {
    getInstalledPackages,
    getParsedOutputConfig,
    getOutputConfig,
    installPackages,
    loadInitialLinterConfig,
    loadInitialParsedLinterConfig,
    loadInputConfig,
    runClinter,
  };
}

export const defaultInputConfig: InputConfig = {
  modeConfig: {
    mode: ModeInfo.Generator,
  },
  generatorConfig: {
    typescript: TypescriptInfo.None,
    env: [],
    formatter: FormatterInfo.None,
    frontFramework: FrontFrameworkInfo.None,
    test: TestFrameworkInfo.None,
  },
};
