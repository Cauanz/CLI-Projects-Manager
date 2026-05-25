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
    const tasks = await fetchAll(db, sql, [project_id]);
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const getTasksFromDB = async () => {
  const sql = `SELECT * FROM tasks`;

  try {
    const tasks = await fetchAll(db, sql, []);
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const getTaskFromDB = async (task_id: string) => {
  const sql = `SELECT * FROM tasks WHERE id = ?`;

  try {
    const task = await fetchFirst(db, sql, [task_id]);
    return task;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (
  project_id: string,
  task_id: string,
  field: string,
  new_value: string,
) => {
  const sql = `UPDATE tasks SET ${field} = ? WHERE id = ? AND project_id = ?`;

  try {
    const task = await execute(db, sql, [new_value, task_id, project_id]);
  } catch (error) {
    throw error;
  }
};

export const removeTaskFromDB = async (task_id: string, project_id: string) => {
  const sql = `DELETE FROM tasks WHERE task_id = ? AND project_id = ?`;

  try {
    await execute(db, sql, [task_id, project_id]);
  } catch (error) {
    throw error;
  }
};
