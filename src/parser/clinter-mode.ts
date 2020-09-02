import { findESLintConfigurationFiles } from "parser/linterConfig";
import { ClinterModeInfo } from "types";

const isEslintConfigSetup = (dirPath: string) => findESLintConfigurationFiles(dirPath).length > 0;

export const inferClinterMode = (dirPath: string): ClinterModeInfo => {
  return isEslintConfigSetup(dirPath) ? ClinterModeInfo.Upgrade : ClinterModeInfo.Generator;
};
