import { select, Separator } from "@inquirer/prompts";
import { getProjects } from "./project";

const answer = await select({
  message: "Select a project to add the new task to:",
  choices: getProjects(),
});
