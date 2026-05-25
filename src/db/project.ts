import { db } from "./db";
import { execute, fetchFirst } from "./utils";

type projectData = {
  name: string;
  color: string;
};

/**
 *
 * @param {Object} data - json object, data = {name,status,color}
 *
 */
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

/**
 *
 * @returns Promise<unknown[]>
 */
export const getProjectsFromDB = (): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects: any[]) => {
      if (err) return reject(err);
      resolve(projects);
    });
  });
};

export const getProjectFromDB = async (id: string) => {
  const sql = `SELECT * FROM projects WHERE id === ?`;

  try {
    const project = await fetchFirst(db, sql, [id]);
    return project;
  } catch (error) {
    throw error;
  }
};

export const removeProjectFromDB = async (project_id) => {
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
