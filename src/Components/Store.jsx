import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for notes
const notesSlice = createSlice({
  name: "notes",
  initialState: JSON.parse(localStorage.getItem("notes")) || [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      const updatedState = state.filter((_, index) => index !== action.payload);
      localStorage.setItem("notes", JSON.stringify(updatedState));
      return updatedState;
    },
    updateNote: (state, action) => {
      const { index, title, note, priority } = action.payload;
      state[index] = { title, note, priority };
      localStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

// Export actions
export const { addNote, deleteNote, updateNote } = notesSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});

export default store;
