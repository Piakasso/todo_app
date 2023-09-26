import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { useFetch } from "../../hooks/useFetch";
import { selectActiveFilter } from "../Controls/controlSlice";

const todosAdapter = createEntityAdapter();

export const fetchTodos = createAsyncThunk("fetchTodos", async (userId) => {
  const { request } = useFetch();
  return await request(`https://jsonplaceholder.typicode.com/users/${userId}`);
});

const initialState = todosAdapter.getInitialState({
  activeUser: "",
  status: "idle",
  error: null,
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAll: (state, action) => {
      todosAdapter.setAll(state, action.payload);
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    clearTodos: () => initialState,
    addOneTodo: (state, action) => {
      // Сделал так, чтобы новые Todo'шки были сверху
      state.ids.unshift(action.payload.id);
      state.entities[action.payload.id] = action.payload;
    },
    deleteTodo: (state, action) => {
      todosAdapter.removeOne(state, action.payload);
    },
    toggleTodo: (state, action) => {
      const { id, changes } = action.payload;
      todosAdapter.updateOne(state, { id, changes });
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.error = null;
        state.status = "idle";
        todosAdapter.setAll(state, action.payload);
      }),
});

export default todosSlice.reducer;
export const {
  clearTodos,
  addOneTodo,
  deleteTodo,
  toggleTodo,
  setActiveUser,
  setAll,
} = todosSlice.actions;

//SELECTORS
export const { selectAll } = todosAdapter.getSelectors((state) => state.todos);
export const selectActiveUser = (state) => state.todos.activeUser;
export const selectErrorTodos = (state) => state.todos.error;
export const selectLoadingTodos = (state) => state.todos.status;
export const selectFilteredTodos = createSelector(
  selectActiveFilter,
  selectAll,
  (control, todos) => {
    if (control === "all") {
      return todos;
    }
    if (control === "completed") {
      return todos.filter((item) => item.completed);
    }
    if (control === "active") {
      return todos.filter((item) => !item.completed);
    }
  }
);
