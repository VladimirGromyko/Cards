import { createAppAsyncThunk } from "m1-main/bll/utils/create-app-asynk-thunk";
import { authAPI, LoginType } from "m1-main/dal/auth-api";
import { loadingAC } from "m1-main/bll/loadingReducer";
import { handleServerNetworkError } from "m1-main/bll/utils/error-utils";
import { setErrorRegistration } from "m1-main/bll/registerReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "m1-main/bll/store";

export const login = createAppAsyncThunk(
  "auth/login",
  async (payload: LoginType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(loadingAC("loading"));
    try {
      return await authAPI.login(payload);
    } catch (e: any) {
      console.log(e);
      handleServerNetworkError(e, dispatch);
      dispatch(setErrorRegistration(e.response.data.error));
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
const loginReducer = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    rememberMe: true,
    error: false,
    errorEmail: false,
  },
  reducers: {
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.error = false;
      state.errorEmail = false;
      state.email = action.payload.email;
    },
    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.error = false;
      state.errorEmail = false;
      state.password = action.payload.password;
    },
    setRememberMe: (state, action: PayloadAction<{ rememberMe: boolean }>) => {
      state.error = false;
      state.errorEmail = false;
      state.rememberMe = action.payload.rememberMe;
    },
  },
});
export const loginActions = loginReducer.actions;
export default loginReducer.reducer;
export const loginThunk = { login };
export const selectLogin = (state: RootState) => state.login;
