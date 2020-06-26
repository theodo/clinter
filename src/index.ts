import { promptUserQuestions } from "parser";
import { generateEslintConfig } from "generator";
import { writeEslintConfig } from "fileWriter";

async function main() {
  const userAnswers = await promptUserQuestions();
  const eslintConfig = generateEslintConfig(userAnswers);
  writeEslintConfig(eslintConfig);
}

void main();
