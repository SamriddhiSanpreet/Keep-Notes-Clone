export const addNote = (note) => ({
  type: "ADD_NOTE",
  payload: note,
});

export const deleteNote = (index) => ({
  type: "DELETE_NOTE",
  payload: index,
});

export const updateNote = (note) => ({
  type: "UPDATE_NOTE",
  payload: note,
});