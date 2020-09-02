import { ProjectInfoInferer } from "parser/project-info-inferer/types";
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

const inferTypescriptInfo = (dirPath: string): ProjectInfoInferer => (projectInfo) => {
  const isProjectUsingTypescript = existsSync(path.join(dirPath, TYPESCRIPT_CONFIG_FILE));
  return {
    ...projectInfo,
    typescript: isProjectUsingTypescript ? TypescriptInfo.WithTypeChecking : TypescriptInfo.None,
  };
};

const inferTestEnvInfo = (projectDependencies: string[]): ProjectInfoInferer => (projectInfo) => {
  const isProjectUsingJest = projectDependencies.includes(JEST_DEPENDENCY);
  return {
    ...projectInfo,
    test: isProjectUsingJest ? TestFrameworkInfo.Jest : TestFrameworkInfo.None,
  };
};

const inferFrontFrameworkInfo = (projectDependencies: string[]): ProjectInfoInferer => (projectInfo) => {
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

const inferFormatterInfo = (projectDependencies: string[]): ProjectInfoInferer => (projectInfo) => {
  return {
    ...projectInfo,
    formatter: FormatterInfo.Prettier,
  };
};

const inferEnvInfo = (): ProjectInfoInferer => (projectInfo) => {
  return {
    ...projectInfo,
    env: [EnvInfo.Browser, EnvInfo.Node],
  };
};

export interface InferProjectInfoParams {
  dirPath: string;
  projectDependencies: string[];
}

export const inferProjectInfo = ({ dirPath, projectDependencies }: InferProjectInfoParams): ProjectInfoObject =>
  pipe(
    inferTypescriptInfo(dirPath),
    inferTestEnvInfo(projectDependencies),
    inferFrontFrameworkInfo(projectDependencies),
    inferFormatterInfo(projectDependencies),
    inferEnvInfo()
  )(makeDefaultProjectInfo());
