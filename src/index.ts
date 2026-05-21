#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { db } from "./db/db.ts";
import { drawWelcome } from "./ui/welcome.ts";
import { createProject, getProjects } from "./commands/project.ts";
import { answer } from "./commands/select.ts";
import { createTask } from "./commands/task.ts";

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
      run({ args }) {
        const project_id = answer;
        console.log("Adding a new task " + args._);
        createTask(project_id, args._);
      },
    }),
    remove: defineCommand({}),
    list: defineCommand({
      meta: {
        description: "List all tasks",
      },
      run({ args }) {
        // getProjects();
      },
    }),
    listfromp: defineCommand({
      meta: {
        description: "List all tasks from one project",
      },
      run({ args }) {
        // getTasksFromProject(args._);
      },
    }),
    listp: defineCommand({
      meta: {
        description: "List all projects",
      },
      run({ args }) {
        getProjects();
      },
    }),
  },
});

runMain(main);
