let notes = [
  { id: 1, content: 'ncbdbcdbcd', category: 'Personal' },
  { id: 2, content: 'snfbsabfadbfmd', category: 'Work' },
  { id: 3, content: 'nfbsbj', category: 'Shopping' },
  { id: 4, content: 'bfjbfjebj', category: 'Ideas' }
];
let currentCategory = 'All';

function renderNotes() {
  const container = document.getElementById('notesContainer');
  const notesToRender = currentCategory === 'All' 
      ? notes 
      : notes.filter(note => note.category === currentCategory);
  
  // Clear existing notes
  container.innerHTML = '';

  // Render filtered notes
  notesToRender.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
          <button class="delete" onclick="deleteNote(${note.id})">&times;</button>
          <p>${note.content}</p>
      `;
      container.appendChild(noteElement);
  });

  // Add the new note input back
  const newNoteElement = document.createElement('div');
  newNoteElement.className = 'new-note';
  newNoteElement.innerHTML = `
      <textarea id="newNoteText" placeholder="Type a new note..."></textarea>
      <button onclick="addNote()">+</button>
  `;
  container.appendChild(newNoteElement);

  // Apply random colors after rendering notes
  applyRandomColors();
}

function addNote() {
  const content = document.getElementById('newNoteText').value.trim();
  if (content) {
      const newNote = {
          id: Date.now(),
          content: content,
          category: currentCategory === 'All' ? 'Personal' : currentCategory
      };
      notes.push(newNote);
      renderNotes();
      document.getElementById('newNoteText').value = '';
  }
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  renderNotes();
}

function setCategory(category) {
  currentCategory = category;
  document.querySelectorAll('#categories li').forEach(li => {
      li.classList.remove('active');
  });
  document.querySelector(`li[data-category="${category}"]`).classList.add('active');
  renderNotes();
}

// Set up category click listeners
document.querySelectorAll('#categories li').forEach(li => {
  li.addEventListener('click', function() {
      setCategory(this.dataset.category);
  });
});

// Initial render
renderNotes();

function generatePastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 25 + Math.floor(Math.random() * 20);
  const lightness = 80 + Math.floor(Math.random() * 10);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function applyRandomColors() {
  const notes = document.querySelectorAll('.note');
  notes.forEach(note => {
      let color = generatePastelColor();
      note.style.backgroundColor = color;
  });
}




