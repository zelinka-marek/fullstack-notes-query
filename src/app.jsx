export function App() {
  const notes = [];

  const addNote = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const content = formData.get("note");
    console.log("add note", content);

    form.reset();
    form.elements.note.focus();
  };

  const toggleImportance = (id) => {
    console.log("toggle importance of", id);
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input type="text" name="note" required aria-label="New note" />
        <button type="submit">Save</button>
      </form>
      {notes.length ? (
        notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button onClick={() => toggleImportance(note.id)}>
              {note.important ? "make not important" : "make important"}
            </button>
          </li>
        ))
      ) : (
        <p>
          <i>No notes found.</i>
        </p>
      )}
    </div>
  );
}
