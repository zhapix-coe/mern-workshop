const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'storage.json');

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]');
}

exports.getNotes = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

exports.addNote = (title, content) => {
  const notes = exports.getNotes();
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};
