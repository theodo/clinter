import { findESLintConfigurationFiles } from "parser/linter-config-parser";
import { ClinterModeInfo, ClinterModeInfoObject } from "types";

const isEslintConfigSetup = (dirPath: string) => findESLintConfigurationFiles(dirPath).length > 0;

const makeUpgradeClinterMode = (): ClinterModeInfoObject => ({
  mode: ClinterModeInfo.Upgrade,
});

const makeGeneratorClinterMode = (): ClinterModeInfoObject => ({
  mode: ClinterModeInfo.Generator,
});

export const inferClinterMode = (dirPath: string): ClinterModeInfoObject => {
  return isEslintConfigSetup(dirPath) ? makeUpgradeClinterMode() : makeGeneratorClinterMode();
};
