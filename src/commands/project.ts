//FUNÇÕES RELACIONADAS A PROJETOS

import { db } from "../db/db";
import { addToProjects } from "../db/project";

//CREATE PROJECT
function createProject(data) {
  //TODO - ADICIONAR VALIDAÇÕES ANTES DE ENVIAR AO DB
  let newProject = addToProjects(data);
}

//EDIT PROJECT

//REMOVE PROJECT

//LIST PROJECTS
export function getProjects() {
  // TODO - NÃO SEI SE ESTÁ FUNCIONANDO PORQUE AINDA NÃO TEM NENHUM PROJECT
  //TODO - PAREI AQUI FAZENDO A LIST PARA ADICIONAR NOVA TASK MAS PRECISAMOS DE PROJECTS FUNCIONANDO PRIMEIRO
  let projects = db.all("SELECT * FROM projects");
  console.log(projects);
  db.close();
  return;
}

//LIST PROJECT (TASKS ETC...)
getProjects();
