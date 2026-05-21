//FUNÇÕES RELACIONADAS A TASKS DE PROJETOS
import * as chrono from "chrono-node";
import { db } from "../db/db";
import { addToProjects } from "../db/project";
import { generateTable } from "../ui/table";
import { createTaskOnDB, getTasksFromProjectFromDB } from "../db/task";

//CREATE TASK
export function createTask(project_id, data) {
  //TODO - ADICIONAR VALIDAÇÕES ANTES DE ENVIAR AO DB

  const title = data[0];
  const due_date = data.slice(1).join(" ");

  if (!title || !due_date) {
    return;
  }

  // const formatted_date = chrono.pt.parse(due_date);

  console.log(title, due_date);

  if (!title || !due_date) {
    return;
  }

  let newTask = createTaskOnDB(title, project_id, due_date);
}

//EDIT TASK

//REMOVE TASK

//LIST TASKS
export function getTasks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", (err, tasks) => {
      if (err) return reject(err);
      generateTable(
        "t",
        [
          "id",
          "project Id",
          "title",
          "status",
          "priority",
          "due date",
          "created_at",
          "done_at",
        ],
        tasks,
      );
      resolve(tasks);
    });
  });
}

//LIST TASKS FROM PROJECT X
export function getTasks(project_id) {
  const tasks = getTasksFromProjectFromDB(project_id);
  
  generateTable(
    "t",
    [
      "id",
      "project Id",
      "title",
      "status",
      "priority",
      "due date",
      "created_at",
      "done_at",
    ],
    tasks,
  );
  // return getTasksOfProjectFromDB;
}
