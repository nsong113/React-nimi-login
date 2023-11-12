import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  todos: {
    id: 1,
    title: "",
    contents: "",
  },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

// export const {}=todosSlice.actions
export default todosSlice.reducer;
