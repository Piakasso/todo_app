import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks/useFetch";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const { request } = useFetch();

  return await request(`https://jsonplaceholder.typicode.com/users`);
});

const initialState = {
  list: [],

  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: () => initialState,
    setUsers: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.error = null;
        state.status = "idle";
        state.list = action.payload;
      }),
});

export default usersSlice.reducer;
export const { clearUsers, setUsers } = usersSlice.actions;

//SELECTORS

export const selectUsers = (state) => state.users.list;
export const selectLoadingUsers = (state) => state.users.status;
export const selectErrorUsers = (state) => state.users.error;
