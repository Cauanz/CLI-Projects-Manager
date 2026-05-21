//FUNÇÕES RELACIONADAS A TASKS DE PROJETOS

import { db } from "../db/db";
import { addToProjects } from "../db/project";
import { generateTable } from "../ui/table";

//CREATE TASK
export function createTask(project_id, data) {
  //TODO - ADICIONAR VALIDAÇÕES ANTES DE ENVIAR AO DB

  const project = getProject(project_id);

  const name = data[0];
  const color = data[1];

  console.log(name, color);

  if (!name || !color) {
    return;
  }

  let newProject = addToProjects(name, color);
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
