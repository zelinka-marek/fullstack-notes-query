import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, getNotes, updateNote } from "./requests";

export function App() {
  const queryClient = useQueryClient();
  const notesResult = useQuery("notes", getNotes);
  const newNoteMutation = useMutation(createNote, {
    onSuccess: () => queryClient.invalidateQueries("notes"),
  });
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => queryClient.invalidateQueries("notes"),
  });

  const addNote = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    newNoteMutation.mutate(
      { content: formData.get("note"), important: true },
      {
        onSuccess: () => {
          form.reset();
          form.elements.note.focus();
        },
      }
    );
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input type="text" name="note" required aria-label="New note" />
        <button type="submit">Save</button>
      </form>
      {notesResult.isLoading ? (
        <p>
          <i>Loading notes..</i>
        </p>
      ) : notesResult.data.length ? (
        notesResult.data.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button onClick={() => toggleImportance(note)}>
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
