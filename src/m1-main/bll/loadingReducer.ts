import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoadingStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  isLoading: "idle" as LoadingStatusType,
};
const loadingReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingAC(state, action: PayloadAction<LoadingStatusType>) {
      state.isLoading = action.payload;
    },
  },
});

export const { loadingAC } = loadingReducer.actions;
export default loadingReducer.reducer;
