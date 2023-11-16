import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: {
    id: 1,
    name: "",
    content: "",
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentInput: (state, action) => {
      action;
    },
  },
});

//commentSlice안에 있는 AC 빼내기
export const {} = commentSlice.actions;
//commentSlice 안에 있는 리듀서 빼내기
export default commentSlice.reducer;
