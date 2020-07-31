import { ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { browserESLintEnvConfig, nodeESLintEnvConfig } from "generator/baseConfigs";
import { concatConfig } from "generator/generate";
import { EnvAnswer } from "types";

const generateBrowserEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvAnswer.Browser) ? concatConfig(browserESLintEnvConfig) : identity;
};

const generateNodeEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvAnswer.Node) ? concatConfig(nodeESLintEnvConfig) : identity;
};

export const generateEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return pipe(generateBrowserEnvESLintConfig(userAnswers), generateNodeEnvESLintConfig(userAnswers));
};
