import React from "react";
import "../App.css";

export default function Sidebar(props) {


    console.log(props.currentNote);


  const noteElements = props.notes?.map((note, index) => (
    <div key={note?.id}>
      <div
        className={`title ${
          note?.id === props.currentNote?.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note?.id)}
      >
        <h4 className="text-snippet">
          {note?.body ? note?.body.split("\n")[0] : ""}
        </h4>
        <button
          className="delete-btn"
          onClick={() => props.handleDelete(props.currentNote?.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
