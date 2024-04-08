import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const prevSavedNote = JSON.parse(localStorage.getItem("savedNote"));

  const [notes, setNotes] = React.useState(prevSavedNote || []);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    const savedNotes = JSON.stringify(notes);
    localStorage.setItem("savedNote", savedNotes);
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text, currentNote) {
    const currentNotee = notes.find((note) => note.id === currentNote.id);

    const newNote = {
      ...currentNotee,
      body: text,
    };
    const filteredNotes = notes.filter((note) => note.id !== currentNote.id);

    setNotes([...filteredNotes, newNote]);

    // setNotes((oldNotes) => {
    //   const newArr = [];
    //   for (let i; i < oldNotes.length; i++) {
    //     const oldNote = oldNotes[i];
    //     if (oldNote.id === currentNoteId) {
    //       return newArr.unshift({ ...oldNote, body: text });
    //     } else {
    //       return newArr.push(oldNote);
    //     }
    //   }
    //   return newArr.push;
    // });

    //not rearranging notes

    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }))
  }

  function findCurrentNote() {
    return (
      notes?.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
