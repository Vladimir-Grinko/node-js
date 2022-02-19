const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.yellow.inverse("Here is the list of notes:"));
  notes.forEach((n) => {
    console.log(chalk.yellow(n.id, n.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  fs.writeFile(notesPath, JSON.stringify(notes.filter((note) => note.id !== id)));
  console.log(chalk.red.inverse(`Removed  note by Id: ${id}`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
