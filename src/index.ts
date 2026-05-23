#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { drawWelcome } from "./ui/welcome.ts";
import {
  createProject,
  listProjects,
} from "./commands/project-controller.ts";
import {
  selectProject,
  selectProperty,
  selectTask,
} from "./commands/select.ts";
import {
  createTask,
  editTask,
  listTasks,
  listTasksFromProject,
} from "./commands/task-controller.ts";
import { input } from "@inquirer/prompts";

const main = defineCommand({
  meta: {
    name: "TODOALL",
    version: "0.0.1",
    description: "A simple TODO app to manage your projects",
  },
  run() {
    drawWelcome();
  },
  subCommands: {
    newp: defineCommand({
      meta: {
        description: "Create a new project",
      },
      run({ args }) {
        console.log("Creating a new project " + args._);
        createProject(args._);
      },
    }),
    add: defineCommand({
      meta: {
        description: "Add a new task to the selected project",
      },
      async run({ args }) {
        const project_id = await selectProject();
        console.log("Adding a new task " + args._);
        createTask(project_id, args._);
      },
    }),
    edit: defineCommand({
      meta: {
        description: "Edit a single task",
      },
      async run({ args }) {
        const project_id = await selectProject();
        const task = await selectTask(project_id);
        const property = await selectProperty(task);
        const newValue = await input({
          message: `Enter the new value for ${property}`,
        });
        await editTask(project_id, task, property, newValue);
      },
    }),
    removep: defineCommand({}),
    remove: defineCommand({}),
    list: defineCommand({
      meta: {
        description: "List all tasks",
      },
      run() {
        listTasks();
      },
    }),
    listfromp: defineCommand({
      meta: {
        description: "List all tasks from one project",
      },
      async run({ args }) {
        const project_id = await selectProject();
        listTasksFromProject(project_id);
      },
    }),
    listp: defineCommand({
      meta: {
        description: "List all projects",
      },
      run() {
        listProjects();
      },
    }),
  },
});

runMain(main);