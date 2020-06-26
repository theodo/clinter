import { EnvAnswer } from "../types";
import { identity, pipe } from "../utility";
import { ESLintGenerator } from "./types";
import { concatConfig } from "./generate";
import { browserESLintEnvConfig, nodeESLintEnvConfig } from "./baseConfigs/envESLintConfig";

const generateBrowserEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvAnswer.Browser) ? concatConfig(browserESLintEnvConfig) : identity;
};

const generateNodeEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvAnswer.Node) ? concatConfig(nodeESLintEnvConfig) : identity;
};

export const generateEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return pipe(generateBrowserEnvESLintConfig(userAnswers), generateNodeEnvESLintConfig(userAnswers));
};
