//FUNÇÕES RELACIONADAS A PROJETOS

import { db } from "../db/db";
import { addToProjects } from "../db/project";

//CREATE PROJECT
//* APARENTEMENTE JÁ FUNCIONANDO
export function createProject(data) {
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

//LIST PROJECTS
export function getProjects() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects) => {
      if (err) return reject(err);
      console.log(projects);
      resolve(projects);
    });
  });
}

//LIST PROJECT (TASKS ETC...)
