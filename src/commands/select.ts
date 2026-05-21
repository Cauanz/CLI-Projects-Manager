import { select, Separator } from "@inquirer/prompts";
import { getProjects } from "./project";

const projects = await getProjects();

const choices = projects
  .filter((project) => project.status === "active")
  .map((project) => ({
    name: project.name,
    value: project.id,
  }));

export const answer = await select({
  message: "Select the project to add the new task to:",
  choices: choices,
});
