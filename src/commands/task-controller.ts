//FUNÇÕES RELACIONADAS A TASKS DE PROJETOS
import * as chrono from "chrono-node";
import { db } from "../db/db";
import { addToProjects } from "../db/project";
import { generateTable } from "../ui/table";
import {
  createTaskOnDB,
  editTask as editTaskOnDB,
  getTaskFromDB,
  getTasksFromDB,
  getTasksOfProjectFromDB,
} from "../db/task";

//CREATE TASK
export function createTask(project_id: string, data: string[]) {
  //TODO - ADICIONAR VALIDAÇÕES ANTES DE ENVIAR AO DB

  const title = data[0];
  const due_date = data.slice(1).join(" ");

  if (!title || !due_date) {
    return;
  }

  // const formatted_date = chrono.pt.parse(due_date);

  let newTask = createTaskOnDB(title, project_id, due_date);
}

//EDIT TASK
export async function editTask(
  project_id: string,
  task_id: string,
  field: string,
  new_value: string,
) {
  return editTaskOnDB(project_id, task_id, field, new_value);
}

//REMOVE TASK

//GET TASK
export async function getTask(task_id: string) {
  return await getTaskFromDB(task_id);
}

//GET TASKS
export async function getTasksFromProject(project_id: string) {
  return await getTasksOfProjectFromDB(project_id);
}

//LIST TASKS
export async function listTasks() {
  const tasks: unknown[] = await getTasksFromDB();

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
}

//LIST TASKS FROM PROJECT X
export async function listTasksFromProject(project_id: string) {
  const tasks: unknown[] = await getTasksOfProjectFromDB(project_id);
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
}
