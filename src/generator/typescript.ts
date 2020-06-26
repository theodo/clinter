import { TypescriptAnswer } from "types";
import { identity, pipe } from "utility";
import { ESLintGenerator } from "./types";
import { concatConfig } from "./generate";
import { typescriptBaseEslintConfig, typescriptTypeEslintConfig } from "./baseConfigs/typescriptEslintConfig";

export const generateTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptAnswer.None:
      return identity;

    case TypescriptAnswer.WithTypeChecking:
      return pipe(concatConfig(typescriptBaseEslintConfig), concatConfig(typescriptTypeEslintConfig));

    case TypescriptAnswer.NoTypeChecking:
      return concatConfig(typescriptBaseEslintConfig);
  }
};
