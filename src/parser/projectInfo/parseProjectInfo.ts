import { ProjectInfoParser } from "parser/projectInfo/types";
import path from "path";
import { existsSync } from "fs";
import {
  EnvInfo,
  FormatterInfo,
  FrontFrameworkInfo,
  ProjectInfoObject,
  TestFrameworkInfo,
  TypescriptInfo,
} from "types";
import { pipe } from "utils/utility";

const TYPESCRIPT_CONFIG_FILE = "tsconfig.json";
const JEST_DEPENDENCY = "jest";
const VUE_DEPENDENCY = "vue";
const REACT_DEPENDENCY = "react";

const makeDefaultProjectInfo = (): ProjectInfoObject => ({
  env: [],
  formatter: FormatterInfo.None,
  frontFramework: FrontFrameworkInfo.None,
  test: TestFrameworkInfo.None,
  typescript: TypescriptInfo.None,
});

const parseTypescriptInfo = (dirPath: string): ProjectInfoParser => (projectInfo) => {
  const isProjectUsingTypescript = existsSync(path.join(dirPath, TYPESCRIPT_CONFIG_FILE));
  return {
    ...projectInfo,
    typescript: isProjectUsingTypescript ? TypescriptInfo.WithTypeChecking : TypescriptInfo.None,
  };
};

const parseTestEnvInfo = (projectDependencies: string[]): ProjectInfoParser => (projectInfo) => {
  const isProjectUsingJest = projectDependencies.includes(JEST_DEPENDENCY);
  return {
    ...projectInfo,
    test: isProjectUsingJest ? TestFrameworkInfo.Jest : TestFrameworkInfo.None,
  };
};

const parseFrontFrameworkInfo = (projectDependencies: string[]): ProjectInfoParser => (projectInfo) => {
  const isProjectUsingVue = projectDependencies.includes(VUE_DEPENDENCY);
  const isProjectUsingReact = projectDependencies.includes(REACT_DEPENDENCY);

  return {
    ...projectInfo,
    frontFramework: isProjectUsingVue
      ? FrontFrameworkInfo.Vue
      : isProjectUsingReact
      ? FrontFrameworkInfo.React
      : FrontFrameworkInfo.None,
  };
};

const parseFormatterInfo = (projectDependencies: string[]): ProjectInfoParser => (projectInfo) => {
  return {
    ...projectInfo,
    formatter: FormatterInfo.Prettier,
  };
};

const parseEnvInfo = (): ProjectInfoParser => (projectInfo) => {
  return {
    ...projectInfo,
    env: [EnvInfo.Browser, EnvInfo.Node],
  };
};

export interface ParseProjectInfoParams {
  dirPath: string;
  projectDependencies: string[];
}

export const parseProjectInfo = ({ dirPath, projectDependencies }: ParseProjectInfoParams): ProjectInfoObject =>
  pipe(
    parseTypescriptInfo(dirPath),
    parseTestEnvInfo(projectDependencies),
    parseFrontFrameworkInfo(projectDependencies),
    parseFormatterInfo(projectDependencies),
    parseEnvInfo()
  )(makeDefaultProjectInfo());
