import { ESLint, Linter } from "eslint";
import fs from "fs";
import { MigrationResults } from "migration/types";

const getErrors = async (dirPath: string): Promise<ESLint.LintResult[]> => {
  const eslint = new ESLint({
    cwd: dirPath,
  });
  const results = await eslint.lintFiles("**/*.{js,ts,jsx,tsx}");

  return results;
};

const groupErrorsByLine = (errors: Linter.LintMessage[]): Record<number, Linter.LintMessage[]> => {
  return errors.reduce((result: Record<number, Linter.LintMessage[]>, error) => {
    const lineNumber = error.line;
    if (result[lineNumber] === undefined) {
      result[lineNumber] = [];
    }

    result[lineNumber].push(error);
    return result;
  }, {});
};

const insertErrorIgnoreLines = (sourceLines: string[], errorsByLine: Record<number, Linter.LintMessage[]>): string[] =>
  ((Object.entries(errorsByLine) as unknown) as [number, Linter.LintMessage[]][])
    .sort(([lineA], [lineB]) => lineB - lineA)
    .reduce((source, [lineNumber, errors]) => {
      const mappedErrors = errors
        .filter((error) => error.severity === 2 && error.fix === undefined)
        .map((error) => error.ruleId);

      if (mappedErrors.length === 0) {
        return source;
      }

      const errorRulesString = mappedErrors.join(", ");

      const ignoreString = `// eslint-disable-next-line ${errorRulesString}`;

      const indentation = /^\s*/.exec(source[lineNumber - 1])?.[0] ?? "";

      source.splice(lineNumber - 1, 0, indentation + ignoreString);

      return source;
    }, sourceLines);

const insertIgnoreLinesInFile = (filePath: string, fileErrors: Linter.LintMessage[]) => {
  const fileSource = fs.readFileSync(filePath).toString().split("\n");

  const errorsByLine = groupErrorsByLine(fileErrors);

  const newSource = insertErrorIgnoreLines(fileSource, errorsByLine).join("\n");

  fs.writeFileSync(filePath, newSource);
};

export const migrateProject = async (dirPath: string): Promise<MigrationResults> => {
  const errors = await getErrors(dirPath);

  return errors.reduce(
    (results: MigrationResults, error) => {
      insertIgnoreLinesInFile(error.filePath, error.messages);

      return {
        errorCount: results.errorCount + error.errorCount,
        fixableErrorCount: results.fixableErrorCount + error.fixableErrorCount,
      };
    },
    {
      errorCount: 0,
      fixableErrorCount: 0,
    }
  );
};
