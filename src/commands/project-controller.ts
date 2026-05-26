//FUNÇÕES RELACIONADAS A PROJETOS
import {
  addToProjects,
  editProjectOnDB,
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
export function editProject(
  project_id: string,
  field: string,
  new_value: string,
) {
  return editProjectOnDB(project_id, field, new_value);
}

//REMOVE PROJECT
export function removeProject(project_id: string) {
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
export async function listProjects() {
  const projects = await getProjectsFromDB();

  generateTable("p", ["id", "name", "status", "color", "created_at"], projects);
}

//LIST PROJECT (TASKS ETC...)
