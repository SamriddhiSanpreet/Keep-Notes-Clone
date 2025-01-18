import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, updateNote } from "../Components/Store";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";

const MAIN = styled.div`
  margin-top: 1rem;
  box-shadow: 10px 10px 10px #b6bab6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 5px;
  width: 30vw;

  select {
    width: 100%;
    padding: 5px 0;
    border: none;
    outline: none;
    color: #4e4d4d;
    font-weight: 400;
    margin-bottom: 10px;
  }

  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
  }
  button {
    font-size: 30px;
    outline: none;
    border: none;
    background-color: transparent;
    color: orange;
    font-weight: bold;
  }
`;

const BODY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const BOX = styled.div`
  display: flex;
  justify-content: center;
`;

const BTN = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const OUTPUT = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  

  div {
    width: 300px;
    border: none;
    box-shadow: 10px 10px 10px #b0aeae;
    color: #4e4d4d;
    font-weight: 600;
    height: auto;
    margin: 30px;
    position: relative;
    padding:20px;
    padding-top:30px;

    h3,
    p {
      font-size: 1rem;
      margin-bottom: 25px;
      font-weight: 600;
      line-height: 1.2;
      font-family: "Roboto", serif;
    }

    button {
      border: none;
      background-color: transparent;
      color: red;
      font-size: 20px;
      cursor: pointer;
      margin: 0 10px 20px 10px;
    }
    .ri-edit-2-line {
      color: green;
    }
  }
`;

const Home = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const handleSort = (notes) => {
    if (sortOrder === "A-Z") {
      return [...notes].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOrder === "Z-A") {
      return [...notes].sort((a, b) => b.title.localeCompare(a.title));
    }
    return notes;
  };

  const filteredNotes = handleSort(
    notes.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.note.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      dispatch(updateNote({ index: editIndex, title, note, priority }));
      setEditIndex(null);
    } else {
      if (title && note && priority) {
        dispatch(addNote({ title, note, priority }));
      }
    }
    setTitle("");
    setNote("");
    setPriority("");
  };

  const handleDelete = (index) => {
    dispatch(deleteNote(index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(notes[index].title);
    setNote(notes[index].note);
    setPriority(notes[index].priority || "");
  };

  return (
    <BODY>
      <Header setSearchQuery={setSearchQuery} setSortOrder={setSortOrder} />
      <BOX>
        <MAIN>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <textarea
              placeholder="Write a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <br />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">Choose Priority...</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
            <BTN>
              <button type="submit">{editIndex !== null ? <span style={{fontSize:'18px'}}>Update</span>  : "+"}</button>
            </BTN>
          </form>
        </MAIN>
      </BOX>
      <OUTPUT>
        {filteredNotes.map((n, index) => (
          <div key={index}>
            <h3>{n.title}</h3>
            <p>{n.note}</p>
            <p>{n.priority || "Not Set"}</p>
            <button onClick={() => handleEdit(index)}>
              <i className="ri-edit-2-line"></i>
            </button>
            <button onClick={() => handleDelete(index)}>
              <i className="ri-delete-bin-6-fill"></i>
            </button>
          </div>
        ))}
      </OUTPUT>
      <Footer />
    </BODY>
  );
};

export default Home;
