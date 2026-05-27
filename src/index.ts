#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import {
  createProject,
  editProject,
  listProjectAndTasks,
  listProjects,
  removeProject,
} from "./commands/project-controller.ts";
import {
  selectChange,
  selectProject,
  selectProperty,
  selectTask,
} from "./commands/select.ts";
import {
  createTask,
  editTask,
  listTasks,
  listTasksFromProject,
  removeTask,
} from "./commands/task-controller.ts";
import chalk from "chalk";
import { confirm } from "@inquirer/prompts";

const main = defineCommand({
  meta: {
    name: "TODOALL",
    version: "0.0.1",
    description: "A simple TODO app to manage your projects from the terminal",
  },
  subCommands: {
    newp: defineCommand({
      meta: {
        description: "Create a new project",
      },
      run({ args }) {
        if (args._.length <= 0) {
          console.log(
            chalk.bold.bgRed(
              "You need to insert [newp] <project name> <color>",
            ),
          );
          return;
        } else {
          console.log("Creating a new project " + args._);
          createProject(args._);
        }
      },
    }),
    add: defineCommand({
      meta: {
        description: "Add a new task to the selected project",
      },
      async run({ args }) {
        if (args._.length <= 0) {
          console.log(
            chalk.bold.bgRed("You need to insert [add] <title> <due date>"),
          );
          return;
        } else {
          const project_id = await selectProject();
          console.log("Adding a new task " + args._);
          createTask(project_id.toString(), args._);
        }
      },
    }),
    edit: defineCommand({
      meta: {
        description: "Edit a single task",
      },
      async run() {
        const project_id = await selectProject();
        const task = await selectTask(project_id.toString());
        const property = await selectProperty(task, "t");
        const newValue = await selectChange(property, "t");
        await editTask(project_id.toString(), task, property, newValue);
      },
    }),
    editp: defineCommand({
      meta: {
        description: "Edit a project",
      },
      async run() {
        const project_id = await selectProject();
        const property = await selectProperty(project_id.toString(), "p");
        const newValue = await selectChange(property, "p");
        await editProject(project_id.toString(), property, newValue);
      },
    }),
    removep: defineCommand({
      meta: {
        description: "Remove a project and all its tasks",
      },
      async run() {
        const project_id = await selectProject();
        const answer = await confirm({
          message:
            "Are you sure you want to delete the project and all its tasks?",
        });
        if (answer) {
          await removeProject(project_id.toString());
        } else {
          return;
        }
      },
    }),
    remove: defineCommand({
      meta: {
        description: "Remove a task",
      },
      async run() {
        const project_id = await selectProject();
        const task_id = await selectTask(project_id.toString());

        const answer = await confirm({
          message: "Are you sure you want to delete this task?",
        });
        if (answer) {
          await removeTask(task_id, project_id.toString());
        } else {
          return;
        }
      },
    }),
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
      async run() {
        const project_id = await selectProject();
        listTasksFromProject(project_id.toString());
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
    listpt: defineCommand({
      meta: {
        description: "lists a project and all its tasks",
      },
      async run() {
        const project_id = await selectProject();
        listProjectAndTasks(project_id.toString());
      },
    }),
  },
});

runMain(main);
