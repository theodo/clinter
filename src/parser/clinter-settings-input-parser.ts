import signale from "signale";
import { existsSync, readFileSync } from "fs";
import { ClinterSettings } from "types";

export function parseInputConfigFile(inputFileName: string): ClinterSettings {
  if (!existsSync(inputFileName)) {
    signale.error(`Cannot find InputFile ${inputFileName}`);
    process.exit(1);
  }

  try {
    return JSON.parse(readFileSync(inputFileName, "utf-8")) as ClinterSettings;
  } catch (error) {
    signale.error("Error parsing InputFile configuration");
    process.exit(1);
  }
}
