import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./projects");

db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL UNIQUE,
      status     TEXT DEFAULT 'active',
      color      TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );


    CREATE TABLE IF NOT EXISTS tasks (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER REFERENCES projects(id),
      title      TEXT NOT NULL UNIQUE,
      status     TEXT DEFAULT 'todo',
      priority   TEXT DEFAULT 'medium',
      due_date   TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      done_at    TEXT
    );
  `);
