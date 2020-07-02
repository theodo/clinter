import { Linter } from "eslint";
import { ConfigContainer, ConfigFileObject, FileExtension } from "parser/configFile/types";
import { parseConfigFiles } from "parser/configFile/parseConfigFiles";

const possibleESLintFiles: ConfigFileObject[] = [
  { name: ".eslintrc", extension: FileExtension.NONE },
  { name: ".eslintrc.js", extension: FileExtension.JS },
  { name: ".eslintrc.json", extension: FileExtension.JSON },
  { name: ".eslintrc.yaml", extension: FileExtension.YAML },
  { name: "package.json", extension: FileExtension.JSON, attribute: "eslintConfig" },
];

export function findESLintConfigurationFiles(dirPath: string): ConfigContainer<Linter.Config>[] {
  return parseConfigFiles(possibleESLintFiles, dirPath);
}
