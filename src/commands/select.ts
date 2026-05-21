import { select, Separator } from "@inquirer/prompts";
import { getProjects } from "./project-controller";

export async function selectProject() {
  const projects = await getProjects();

  const choices = projects
    .filter((project) => project.status === "active")
    .map((project) => ({
      name: project.name,
      value: project.id,
    }));

  return select({
    message: "Select the project to add the new task to:",
    choices,
  });
}
