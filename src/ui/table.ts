import Table from "cli-table3";

type projectType = {
  id: number;
  name: string;
  status: string;
  color: string;
  created_at: string;
};

type taskType = {
  id: number;
  project_id: number;
  title: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
  done_at: string;
};

export function generateTable(flag: string, header: string[], values: any[]) {
  const table = new Table({
    head: [...header],
  });

  switch (flag) {
    case "p":
      values.map((project: projectType) => {
        table.push([
          project.id,
          project.name,
          project.status,
          project.color,
          project.created_at,
        ]);
      });
      break;
    case "t":
      values.map((task: taskType) => {
        table.push([
          task.id,
          task.project_id,
          task.title,
          task.status,
          task.priority,
          task.due_date,
          task.created_at,
          task.done_at,
        ]);
      });
      break;
    default:
      break;
  }

  console.log(table.toString());
}
