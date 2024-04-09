import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
const prevSavedNote = localStorage.getItem("savedNote");
if (prevSavedNote !== null) {
    const userObject = JSON.parse(prevSavedNote);
}


  const [notes, setNotes] = React.useState((prevSavedNote)? prevSavedNote : []);
  const [currentNoteId, setCurrentNoteId] = React.useState(
        notes[0]?.id || ""
    );
    
    const currentNote = notes.find((note) => note.id === currentNoteId || note[0]);
    
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
    // Find the note with the same id as the current note
    const currentNotee = notes.find((note) => note.id === currentNote.id);

    // Create a new note object with the updated body
    const newNote = {
      ...currentNotee,
      body: text,
    };

    // Filter out the current note from the notes array
    const filteredNotes = notes.filter((note) => note.id !== currentNote.id);

    // Add the updated note back to the notes array
    setNotes([...filteredNotes, newNote]);

    // setNotes((oldNotes) => {
    //   const newArr = [];
    //   for (let i = 0; i < oldNotes.length; i++) {
    //     const oldNote = oldNotes[i];
    //     if (oldNote.id === currentNoteId) {
    //        newArr.unshift({ ...oldNote, body: text });
    //     } else {
    //        newArr.push(oldNote);
    //     }
    //   }
    //   return newArr;
    // });

    //not rearranging notes

    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }))
  }

 
    function deleteNote(event, noteId) {
        event.stopPropagation() //doesnt allow event to be passed on to the parent element
        setNotes((oldNote) => { oldNote.filter(note => note.id !== noteId)
        })
        
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
                      deleteNote={deleteNote}
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
