import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
// import { nanoid } from "nanoid";
import { doc, addDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { noteCollection, db } from "./config/firebase";

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");

  const currentNote = currentNoteId
    ? notes.find((note) => note.id === currentNoteId)
    : null;

  useEffect(() => {
    if (notes.length > 0) {
      setCurrentNoteId(notes[0].id);
    }
  }, [notes]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(noteCollection, function (snapshot) {
      const savedNotesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(savedNotesArr);
    });
    return unsubscribe;
  }, []);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    // setNotes((prevNotes) => [newNote, ...prevNotes]); prev because it was on local storage
    const newNoteRef = await addDoc(noteCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  function updateNote(text, currentNote) {
    // Find the note with the same id as the current note
    // const currentNotee = notes.find((note) => note.id === currentNote.id);

    // Create a new note object with the updated body
    // const newNote = {
    //   ...currentNotee,
    //   body: text,
    // };

    // Filter out the current note from the notes array
    // const filteredNotes = notes.filter((note) => note.id !== currentNote.id);

    // Add the updated note back to the notes array
    // setNotes([...filteredNotes, newNote]);

    setNotes((oldNotes) => {
      const newArr = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArr.unshift({ ...oldNote, body: text });
        } else {
          newArr.push(oldNote);
        }
      }
      return newArr;
    });

    //not rearranging notes

    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }))
  }

  async function deleteNote(id) {
    const docRef = doc(db, "savedNotes", id);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes?.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            handleDelete={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
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
