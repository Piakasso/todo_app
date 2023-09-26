import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: "all",
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    changeControl: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export default controlSlice.reducer;

export const { changeControl } = controlSlice.actions;

//SELECTORS
export const selectActiveFilter = (state) => state.control.activeFilter;
