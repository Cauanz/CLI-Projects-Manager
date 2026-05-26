import { input, select } from "@inquirer/prompts";
import { getProject, getProjects } from "./project-controller";
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

export async function selectProperty(id: string, flag: string) {
  if (flag === "t") {
    const task = await getTask(id);

    return select({
      message: "Select a property:",
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
  } else {
    const project = await getProject(id);

    return select({
      message: "Select a property:",
      choices: [
        {
          name: "name",
          description: `current value: ${project.name}`,
          value: "name",
        },
        {
          name: "status",
          description: `current value: ${project.status}`,
          value: "status",
        },
        {
          name: "color",
          description: `current value: ${project.color}`,
          value: "color",
        },
      ],
    });
  }
}

export async function selectChange(property: string, flag: string) {
  let choices: { name: string; value: string }[] = [];

  if (flag === "t") {
    switch (property) {
      case "title":
        return input({
          required: true,
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
  } else {
    switch (property) {
      case "name":
        return input({
          required: true,
          message: `Enter the new value for ${property}`,
        });
      case "status":
        choices = [
          {
            name: "active",
            value: "active",
          },
          {
            name: "closed",
            value: "closed",
          },
          {
            name: "finished",
            value: "finished",
          },
        ];
        break;
      case "color":
        choices = [
          {
            name: "blue",
            value: "blue",
          },
          {
            name: "red",
            value: "red",
          },
          {
            name: "green",
            value: "green",
          },
          {
            name: "yellow",
            value: "yellow",
          },
          {
            name: "purple",
            value: "purple",
          },
        ];
    }
  }

  return select({
    message: `Select a new ${property}`,
    choices: choices,
  });
}
