import fs from "fs";
import { Linter } from "eslint";
import { Options } from "prettier";
import { ConfigContainer, FileExtension } from "parser/linter-config-parser/types";
import { assertUnreachable } from "utils/utility";

function writeJSConfig(path: string, config: unknown) {
  const prependString = "module.exports = ";
  const configString = prependString + JSON.stringify(config, null, 2);

  fs.writeFileSync(path, configString);
}

function writeJSONConfig(path: string, config: unknown) {
  fs.writeFileSync(path, JSON.stringify(config, null, 2));
}

function writePackageJSONConfig(path: string, config: unknown) {
  return;
}

export function writeEslintConfig(configContainer: ConfigContainer<Linter.Config>): void {
  switch (configContainer.file.extension) {
    case FileExtension.JS:
      return writeJSConfig(configContainer.file.name, configContainer.config);

    case FileExtension.NONE:
    case FileExtension.JSON:
      if (configContainer.file.attribute !== undefined) {
        return writePackageJSONConfig(configContainer.file.name, configContainer.config);
      }
      return writeJSONConfig(configContainer.file.name, configContainer.config);

    case FileExtension.YAML:
      throw new Error("YAML files are not supported for config writing");

    default:
      assertUnreachable(configContainer.file.extension);
  }
}

export function writePrettierConfig(config: Options): void {
  fs.writeFileSync("./prettier.json", JSON.stringify(config, null, 2));
}
