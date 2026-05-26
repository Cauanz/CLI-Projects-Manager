import { db } from "./db";
import { execute, fetchFirst } from "./utils";

type projectData = {
  name: string;
  color: string;
};

//CREATE A NEW PROJECT
export const addToProjects = async (name: string, color: string) => {
  const sql = `INSERT INTO projects(name, color) VALUES(?, ?)`;

  try {
    await execute(db, sql, [name, color]);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

//GET ALL PROJECTS
export const getProjectsFromDB = (): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects: any[]) => {
      if (err) return reject(err);
      resolve(projects);
    });
  });
};

//EDIT A PROPERTY OF ONE PROJECT
export const editProjectOnDB = async (
  project_id: string,
  field: string,
  newValue: string,
) => {
  const sql = `UPDATE projects SET ${field} = ? WHERE id = ?`;

  try {
    const project = await execute(db, sql, [newValue, project_id]);
  } catch (error) {
    throw error;
  }
};

//GET ONE PROJECT
export const getProjectFromDB = async (id: string) => {
  const sql = `SELECT * FROM projects WHERE id = ?`;

  try {
    const project = await fetchFirst(db, sql, [id]);
    return project;
  } catch (error) {
    throw error;
  }
};

//REMOVE ONE PROJECT
export const removeProjectFromDB = async (project_id: string) => {
  const sql = `DELETE FROM projects WHERE id = ?`;
  const sql2 = `DELETE FROM tasks WHERE project_id = ?`;

  try {
    const project = await execute(db, sql, [project_id]);
    const tasks = await execute(db, sql2, [project_id]);
    return;
  } catch (error) {
    throw error;
  }
};
