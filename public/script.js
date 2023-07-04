document.addEventListener("DOMContentLoaded", async function () {
  const noteForm = document.getElementById("noteForm");
  const noteInput = document.getElementById("noteInput");
  const noteList = document.getElementById("noteList");

  // Function to create a new note item
  function createNoteItem(note) {
    const li = document.createElement("li");
    li.classList.add("noteItem");
    li.innerHTML = `
      <span>${note.note}</span>
      <button class="deleteButton" data-id="${note._id}">Delete</button>
    `;
    noteList.appendChild(li);
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    const content = noteInput.value.trim();
    if (content === "") return;

    const newNote = {
      content: content,
    };

    createNoteItem(newNote);
    saveNoteOnServer(newNote);

    noteInput.value = "";
  }

  // Function to save a note on the server
  async function saveNoteOnServer(note) {
    await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => console.log("Note saved:", data))
      .catch((error) => console.error("Error saving note:", error));
  }

  // Function to handle note deletion
  function handleNoteDelete(event) {
    if (!event.target.classList.contains("deleteButton")) return;

    const noteId = event.target.dataset.id;
    const noteItem = event.target.closest(".noteItem");

    deleteNoteOnServer(noteId);
    noteItem.remove();
  }

  // Function to delete a note on the server
  function deleteNoteOnServer(noteId) {
    fetch(`http://localhost:3000/api/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Note deleted successfully");
        } else {
          console.error("Error deleting note");
        }
      })
      .catch((error) => console.error("Error deleting note:", error));
  }

  // Event listeners
  noteForm.addEventListener("submit", handleFormSubmit);
  noteList.addEventListener("click", handleNoteDelete);

  // Fetch existing notes from the server
  const response = await fetch("http://localhost:3000/api/notes")
    .then((response) => response.json())
    .then((notes) => {
      notes.forEach((note) => createNoteItem(note));
    });
  });
