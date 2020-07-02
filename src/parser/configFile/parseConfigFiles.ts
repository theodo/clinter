/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, readFileSync } from "fs";
import { parse } from "comment-json";
import path from "path";
import { ConfigContainer, ConfigFileObject, FileExtension, LinterConfigs } from "./types";

/**
 * Maps the FileObject name by joining its name with the dirname
 */
export function mapPath(dirPath: string): (filePath: ConfigFileObject) => ConfigFileObject {
  return (filePath: ConfigFileObject) => ({ ...filePath, name: path.join(dirPath, filePath.name) });
}

/**
 * Check if the filePath exists within the directory
 */
export function checkFilePath(filePath: ConfigFileObject): boolean {
  return existsSync(filePath.name);
}

/**
 * Check if the configjuration exists within file object
 */
export function checkIfConfigurationExists<T extends LinterConfigs>(container: ConfigContainer<T>): boolean {
  return Boolean(container.config);
}

function parseJSONFile<T extends LinterConfigs>(configFile: ConfigFileObject): ConfigContainer<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const configObject: any = parse(readFileSync(configFile.name, "utf-8"), undefined, true);
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config: (configFile.attribute !== undefined ? configObject[configFile.attribute] : configObject) as T,
    fileName: configFile.name,
  };
}

function parseJSFile<T extends LinterConfigs>(configFile: ConfigFileObject): ConfigContainer<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const configObject: any = require(configFile.name);
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config: (configFile.attribute !== undefined ? configObject[configFile.attribute] : configObject) as T,
    fileName: configFile.name,
  };
}

/**
 * Parse files according to their extensions and return their configs
 */
export function parseConfigFiles<T extends LinterConfigs>(
  configFiles: ConfigFileObject[],
  dirPath = ""
): ConfigContainer<T>[] {
  return configFiles
    .map(mapPath(dirPath))
    .filter(checkFilePath)
    .map<ConfigContainer<T>>((configFile) => {
      switch (configFile.extension) {
        case FileExtension.JSON:
        case FileExtension.NONE:
          return parseJSONFile(configFile);

        case FileExtension.YAML:
          throw "NO PARSER FOR YAML FILES DEFINED";

        case FileExtension.JS:
          return parseJSFile(configFile);
      }
    })
    .filter(checkIfConfigurationExists);
}
