const notes = require('./notes');

const args = process.argv.slice(2);

if (args[0] === 'add') {
  const [_, title, content] = args;
  if (!title || !content) {
    console.log('Usage: node cli.js add <title> <content>');
  } else {
    notes.addNote(title, content);
    console.log('Note added via CLI!');
  }
} else if (args[0] === 'list') {
  const allNotes = notes.getNotes();
  console.log(allNotes);
} else {
  console.log('Available commands: add, list');
}
