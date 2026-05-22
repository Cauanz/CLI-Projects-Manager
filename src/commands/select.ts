import { select, Separator } from "@inquirer/prompts";
import { getProjects } from "./project-controller";
import { getTasksFromProject } from "./task-controller";

export async function selectProject() {
  const projects = await getProjects();

  const choices = projects
    .filter((project) => project.status === "active")
    .map((project) => ({
      name: project.name,
      value: project.id,
    }));

  return select({
    message: "Select a project:",
    choices,
  });
}

export async function selectTask(project_id) {
  const tasks = await getTasksFromProject(project_id);
  console.log(tasks);

  const choices = tasks.map((task) => ({
    name: task.title,
    value: task.id,
  }));

  return select({
    message: "Select a task:",
    choices,
  });
}

export async function selectProperty() {
  // TODO - TALVEZ ADICIONAR UM CAMPO EM CINZA COM CURRENT VALUE DE CADA CAMPO PARA DIMINUIR CONSULTAS
  return select({
    message: "Select a task:",
    choices: [
      {
        name: "title",
        value: "title",
      },
      {
        name: "status",
        value: "status",
      },
      {
        name: "priority",
        value: "priority",
      },
      {
        name: "due date",
        value: "due_date",
      },
      {
        name: "done at",
        value: "done_at",
      },
    ],
  });
}
