import fs from "fs";
import { Linter } from "eslint";
import { Options } from "prettier";

export function writeEslintConfig(config: Linter.Config): void {
  fs.writeFileSync("./eslintrc.json", JSON.stringify(config, null, 2));
}

export function writePrettierConfig(config: Options): void {
  fs.writeFileSync("./prettier.json", JSON.stringify(config, null, 2));
}
