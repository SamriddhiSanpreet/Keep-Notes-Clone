const initialState = JSON.parse(localStorage.getItem("notes")) || [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      const newStateAdd = [...state, action.payload];
      localStorage.setItem("notes", JSON.stringify(newStateAdd));
      return newStateAdd;

    case "DELETE_NOTE":
      const newStateDelete = state.filter((_, index) => index !== action.payload);
      localStorage.setItem("notes", JSON.stringify(newStateDelete));
      return newStateDelete;

    case "UPDATE_NOTE":
      const { index, title, note, priority } = action.payload;
      const newStateUpdate = state.map((item, i) =>
        i === index ? { title, note, priority } : item
      );
      localStorage.setItem("notes", JSON.stringify(newStateUpdate));
      return newStateUpdate;

    default:
      return state;
  }
};

export default notesReducer;
