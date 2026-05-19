import Table from "cli-table3";

function generateTable() {
  const table = new Table({
    head: ["project", "id", "task name"],
  });

  table.push();
}
