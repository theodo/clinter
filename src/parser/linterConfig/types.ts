import { Options } from "prettier";
import { Linter } from "eslint";

export enum FileExtension {
  JSON = "json",
  YAML = "yml",
  JS = "js",
  NONE = "none",
}

export interface ConfigFileObject {
  name: string;
  extension: FileExtension;
  attribute?: string;
}

export type LinterConfigs = Options | Linter.Config;

export interface ConfigContainer<T extends LinterConfigs> {
  config: T;
  file: ConfigFileObject;
}
