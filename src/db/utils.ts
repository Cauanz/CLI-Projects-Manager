import sqlite3 from "sqlite3";

type SqliteDb = sqlite3.Database;

export const execute = async (
  db: SqliteDb,
  sql: string,
  params: any[] = [],
): Promise<void> => {
  if (params && params.length > 0) {
    return new Promise<void>((resolve, reject) => {
      db.run(sql, params, (err: Error | null) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  return new Promise<void>((resolve, reject) => {
    db.exec(sql, (err: Error | null) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const fetchAll = async (
  db: SqliteDb,
  sql: string,
  params: any[] = [],
): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    db.all(sql, params, (err: Error | null, rows: any[]) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const fetchFirst = async (
  db: SqliteDb,
  sql: string,
  params: any[] = [],
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};
