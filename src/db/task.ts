import { db } from "./db";
import { execute, fetchAll, fetchFirst } from "./utils";

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

export const getTasksOfProjectFromDB = async (project_id: string) => {
  const sql = `SELECT * FROM tasks WHERE project_id = ?`;

  try {
    const tasks = await fetchAll(db, sql, project_id);
    return tasks;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const getTasksFromDB = async () => {
  const sql = `SELECT * FROM tasks`;

  try {
    const tasks = await fetchAll(db, sql);
    return tasks;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
