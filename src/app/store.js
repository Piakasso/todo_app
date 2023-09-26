import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/Users/usersSlice";
import todosReducer from "../features/Todos/todosSlice";
import controlReducer from "../features/Controls/controlSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todosReducer,
    control: controlReducer,
  },
});
