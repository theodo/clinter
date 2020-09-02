import { findESLintConfigurationFiles } from "parser/linter-config-parser";
import { ClinterModeInfo } from "types";

const isEslintConfigSetup = (dirPath: string) => findESLintConfigurationFiles(dirPath).length > 0;

export const inferClinterMode = (dirPath: string): ClinterModeInfo => {
  return isEslintConfigSetup(dirPath) ? ClinterModeInfo.Upgrade : ClinterModeInfo.Generator;
};
