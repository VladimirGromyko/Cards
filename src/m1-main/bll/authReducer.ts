import {
  authAPI,
  LoginType,
  UserDataType,
  UserProfileType,
} from "../dal/auth-api";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AppActionType, RootState } from "./store";
import { loadingAC } from "./loadingReducer";
import { setErrorRegistration } from "./registerReducer";

import { handleServerNetworkError } from "./utils/error-utils";
import { createAppAsyncThunk } from "./utils/create-app-asynk-thunk";
import { login } from "m1-main/bll/loginReducer";

export type authStateType = {
  meStatus: MeStatusType;
  error?: string;
};
export type MeStatusType = UserDataType | null;

const initialState: authStateType = {
  meStatus: null,
  error: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserData(state, action: PayloadAction<UserDataType>) {
      state.meStatus = action.payload;
    },
    logOutUser(state, action: PayloadAction<MeStatusType>) {
      state.meStatus = action.payload;
    },
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.meStatus = action.payload.data;
      })
      .addCase(getAuthUserTC.fulfilled, (state, action) => {
        action.payload && (state.meStatus = action.payload.value);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        action.payload && (state.meStatus = action.payload);
      });
  },
});
export const authActions = authReducer.actions;
export default authReducer.reducer;
export const selectAuth = (state: RootState) => state.auth;

// export const getAuthUserTC = () => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
export const getAuthUserTC = createAppAsyncThunk(
  "auth/me",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(loadingAC("loading"));
    try {
      const res = await authAPI.me();
      return { value: res.data };
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const logoutUserTC =
  () => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC("loading"));
    authAPI
      .logout()
      .then(() => {
        dispatch(authActions.logOutUser(null));
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ", more details in the console";
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingAC("succeeded"));
      });
  };
export const updateUser = createAppAsyncThunk(
  "user/update",
  async (payload: UserProfileType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(loadingAC("loading"));
    try {
      const res = await authAPI.updateUser(payload);
      return res.data.updatedUser;
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

export const authThunks = { getAuthUserTC, logoutUserTC, updateUser };
