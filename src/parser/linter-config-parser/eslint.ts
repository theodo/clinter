import { Linter } from "eslint";
import { ConfigContainer, ConfigFileObject, FileExtension } from "parser/linter-config-parser/types";
import { parseLinterConfigFiles } from "parser/linter-config-parser/linter-config-parser";

const possibleESLintFiles: ConfigFileObject[] = [
  { name: ".eslintrc", extension: FileExtension.NONE },
  { name: ".eslintrc.js", extension: FileExtension.JS },
  { name: ".eslintrc.json", extension: FileExtension.JSON },
  { name: ".eslintrc.yaml", extension: FileExtension.YAML },
  { name: "package.json", extension: FileExtension.JSON, attribute: "eslintConfig" },
];

export function findESLintConfigurationFiles(dirPath: string): ConfigContainer<Linter.Config>[] {
  return parseLinterConfigFiles(possibleESLintFiles, dirPath);
}
