//FUNÇÕES RELACIONADAS A PROJETOS

import { db } from "../db/db";
import {
  addToProjects,
  getProjectFromDB,
  getProjectsFromDB,
  removeProjectFromDB,
} from "../db/project";
import { generateTable } from "../ui/table";

//CREATE PROJECT
export function createProject(data: string[]) {
  //TODO - ADICIONAR VALIDAÇÕES ANTES DE ENVIAR AO DB

  const name = data[0];
  const color = data[1];

  console.log(name, color);

  if (!name || !color) {
    return;
  }

  let newProject = addToProjects(name, color);
}

//EDIT PROJECT

//REMOVE PROJECT
export function removeProject(project_id) {
  return removeProjectFromDB(project_id);
}

//GET PROJECTS
export function getProjects(): Promise<any[]> {
  return getProjectsFromDB();
}

//GET PROJECT
export function getProject(id: string) {
  return getProjectFromDB(id);
}

//LIST PROJECTS
export function listProjects() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects) => {
      if (err) return reject(err);
      generateTable(
        "p",
        ["id", "name", "status", "color", "created_at"],
        projects,
      );
      resolve(projects);
    });
  });
}

//LIST PROJECT (TASKS ETC...)
