import signale from "signale";
import { existsSync, readFileSync } from "fs";

import { InputConfig } from "parser/clinter-settings-input/types";

export function parseInputConfigFile(inputFileName: string): InputConfig {
  if (!existsSync(inputFileName)) {
    signale.error(`Cannot find InputFile ${inputFileName}`);
    process.exit(1);
  }

  try {
    return JSON.parse(readFileSync(inputFileName, "utf-8")) as InputConfig;
  } catch (error) {
    signale.error("Error parsing InputFile configuration");
    process.exit(1);
  }
}
