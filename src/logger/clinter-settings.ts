import signale from "signale";
import { ClinterSettings } from "types";

export const logClinterSettings = (settings: ClinterSettings): void => {
  console.log("");
  signale.info("Project settings:");
  signale.note("Mode", settings.modeConfig.mode);
  signale.note("Typescript", settings.generatorConfig.typescript);
  signale.note("Formatter", settings.generatorConfig.formatter);
  signale.note("Front Framework", settings.generatorConfig.frontFramework);
  signale.note("Environment", settings.generatorConfig.env);
  console.log("");
};
