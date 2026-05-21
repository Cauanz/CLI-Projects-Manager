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

export const getProjectsFromDB = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, projects) => {
      if (err) return reject(err);
      resolve(projects);
    });
  });
};

//!NÃO PRONTA
//TODO - TERMINAR ESSA FUNÇÃO PARA PODER USAR NO CREATETASK PORQUE PRECISAMOS DO PROJECT PARA ADICIONAR A NOVA TASK A ELE
export const getProjectFromDB = (id) => {
  new Promise((resolve, reject) => {
    db.get("SELECT * FROM projects WHERE id === ?", (err, projects) => {
      if (err) return reject(err);
      resolve(projects);
    });
  });
};
