import { db } from "./db";
import { execute } from "./execute";

type projectData = {
  name: string;
  status: string;
  color: string;
};

/**
 *
 * @param {Object} data - json object, data = {name,status,color}
 *
 */
export const addToProjects = async (data: projectData) => {
  const sql = `INSERT INTO projects(name, status, color) VALUES(?, ?, ?)`;
  try {
    await execute(db, sql, [data.name, data.status, data.color]);
  } catch (error) {
    throw error;
  }
};
