import { TypescriptAnswer } from "types";
import { identity, pipe } from "utility";
import { ESLintGenerator } from "generator/types";
import { concatConfig } from "generator/generate";
import { typescriptBaseEslintConfig, typescriptTypeEslintConfig } from "generator/baseConfigs/typescriptEslintConfig";

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
