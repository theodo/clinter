import { ProjectInfoObject } from "types";

export enum ProjectInfoRetrievalMode {
  Automatic = "automatic",
  Manual = "manual",
}

export interface ProjectInfoRetrievalModeObject {
  mode: ProjectInfoRetrievalMode;
}

export type ProjectInfoParser = (projectInfo: ProjectInfoObject) => ProjectInfoObject;
