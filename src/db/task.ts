import { db } from "./db";
import { execute } from "./execute";

//CREATE TASK / ADD TO PROJECT
export const createTaskOnDB = async (
  title: string,
  project_id: string,
  due_date: string,
) => {
  const sql = `INSERT INTO tasks(title, project_id, due_date) VALUES(?, ?, ?)`;
  try {
    await execute(db, sql, [title, project_id, due_date]);
  } catch (error) {
    throw error;
  }
};

// TODO - TERMINAR ISSO PS: NÃO SEI COMO FAZ A QUERY
export const getTasksOfProjectFromDB = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks WHERE project_id === ", (err, tasks) => {
      if (err) return reject(err);
      resolve(tasks);
    });
  });
};
