import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authActions } from "../authReducer";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(authActions.setAppError({ error }));
  } else {
    dispatch(authActions.setAppError({ error: `Native error ${err.message}` }));
  }
};
