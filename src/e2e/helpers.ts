import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child-process-promise";

import { InputConfig } from "parser/inputConfig/types";
import { LinterConfigs } from "parser/linterConfig/types";
import { FormatterAnswer, FrontFrameworkAnswer, ModeAnswer, TestFrameworkAnswer, TypescriptAnswer } from "types";

export interface TestService {
  loadInputConfig: (config: InputConfig) => void;
  loadInitialLinterConfig: (config: LinterConfigs) => void;
  installPackages: (packages: string[]) => Promise<void>;
  runClinter: () => Promise<void>;
  getOutputConfig: () => LinterConfigs;
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

  const loadInitialLinterConfig = (config: LinterConfigs) => {
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

  const getOutputConfig = () => {
    return JSON.parse(fs.readFileSync(outputConfigPath, "utf-8")) as LinterConfigs;
  };

  const getInstalledPackages = () => {
    return [];
  };

  return {
    getInstalledPackages,
    getOutputConfig,
    installPackages,
    loadInitialLinterConfig,
    loadInputConfig,
    runClinter,
  };
}

export const defaultInputConfig: InputConfig = {
  modeConfig: {
    mode: ModeAnswer.Generator,
  },
  generatorConfig: {
    typescript: TypescriptAnswer.None,
    env: [],
    formatter: FormatterAnswer.None,
    frontFramework: FrontFrameworkAnswer.None,
    test: TestFrameworkAnswer.None,
  },
};
