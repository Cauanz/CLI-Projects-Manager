import { db } from "./db";
import { execute } from "./execute";

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
  }
};
