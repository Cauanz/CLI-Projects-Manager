import { input, select } from "@inquirer/prompts";
import { getProjects } from "./project-controller";
import { getTask, getTasksFromProject } from "./task-controller";

type ProjectType = {
  id: number;
  name: string;
  status: string;
  color: string;
  created_at: string;
};

export async function selectProject() {
  const projects: ProjectType[] = await getProjects();

  const choices = projects
    .filter((project: ProjectType) => project.status === "active")
    .map((project) => ({
      name: project.name,
      value: project.id,
    }));

  return select({
    message: "Select a project:",
    choices,
  });
}

export async function selectTask(project_id: string) {
  const tasks = await getTasksFromProject(project_id);

  const choices = tasks.map((task) => ({
    name: task.title,
    value: task.id,
  }));

  return select({
    message: "Select a task:",
    choices,
  });
}

export async function selectProperty(task_id: string) {
  const task = await getTask(task_id);

  return select({
    message: "Select a task:",
    choices: [
      {
        name: "title",
        description: `current value: ${task.title}`,
        value: "title",
      },
      {
        name: "status",
        description: `current value: ${task.status}`,
        value: "status",
      },
      {
        name: "priority",
        description: `current value: ${task.priority}`,
        value: "priority",
      },
      {
        name: "due date",
        description: `current value: ${task.due_date}`,
        value: "due_date",
      },
      {
        name: "done at",
        description: `current value: ${task.done_at}`,
        value: "done_at",
      },
    ],
  });
}

export async function selectChange(property: string) {
  let choices: { name: string; value: string }[] = [];

  switch (property) {
    case "title":
      return input({
        message: `Enter the new value for ${property}`,
      });
    case "status":
      choices = [
        {
          name: "todo",
          value: "todo",
        },
        {
          name: "doing",
          value: "doing",
        },
        {
          name: "done",
          value: "done",
        },
      ];
      break;
    case "priority":
      choices = [
        {
          name: "low",
          value: "low",
        },
        {
          name: "medium",
          value: "medium",
        },
        {
          name: "high",
          value: "high",
        },
      ];
      break;
    case "done_at":
      return select({
        message: "Have you finished the task?",
        choices: [
          { name: "Yes", value: new Date().toLocaleString() },
          { name: "No", value: "" },
        ],
      });
  }

  return select({
    message: `Select a new ${property}`,
    choices: choices,
  });
}
