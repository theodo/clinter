import signale from "signale";
import boxen from "boxen";

import { promptUserQuestions } from "parser/userQuestions";
import { generateEslintConfig } from "generator";
import { writeEslintConfig } from "fileWriter";

async function main() {
  signale.log(
    boxen("Welcome to the ESLint Config Generator", {
      padding: 1,
      borderColor: "green",
      align: "center",
      float: "center",
      margin: 3,
    })
  );
  const userAnswers = await promptUserQuestions();
  signale.info("Retrieving answers ...");
  signale.info("Generating ESLint configuration ...");
  const eslintConfig = generateEslintConfig(userAnswers);
  signale.success("ESLint config generated");
  writeEslintConfig(eslintConfig);
  signale.success("ESLint config written to eslintrc.json file");
}

void main();
