import figlet from "figlet";

export async function drawWelcome() {
  const text = await figlet("TODOALL");
  return text;
}