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
export const getProjectsFromDB = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects) => {
      if (err) return reject(err);
      resolve(projects);
    });
  });
};

export const getProjectFromDB = async (id) => {
  const sql = `SELECT * FROM projects WHERE id === ?`;

  try {
    const project = await fetchFirst(db, sql, id);
  } catch (error) {
    throw error;
  }
};
