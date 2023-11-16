import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../modules/commentSlice";

const store = configureStore({
  reducer: {
    //리듀서들...
    commentSlice,
  },
});

export default store;
