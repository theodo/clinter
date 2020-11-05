import { ESLint } from "eslint";
import { pool } from "workerpool";

import { MigrationResults } from "migration/types";

const computeErrors = async (dirPath: string): Promise<ESLint.LintResult[]> => {
  const eslint = new ESLint({
    cwd: dirPath,
  });
  const results = await eslint.lintFiles("**/*.{js,ts,jsx,tsx}");

  return results;
};

export const migrateProject = async (dirPath: string): Promise<MigrationResults> => {
  const errors = await computeErrors(dirPath);
  const workerPool = pool(__dirname + "/insertIgnoreLinesScript.js");

  const promises = errors.map((error) =>
    workerPool.exec("insertIgnoreLinesInFile", [error.filePath, error.messages]).catch(console.log)
  );

  await Promise.all(promises);
  await workerPool.terminate();

  return errors.reduce(
    (results: MigrationResults, error) => ({
      errorCount: results.errorCount + error.errorCount,
      fixableErrorCount: results.fixableErrorCount + error.fixableErrorCount,
    }),
    {
      errorCount: 0,
      fixableErrorCount: 0,
    }
  );
};
