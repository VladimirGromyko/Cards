import {
  authAPI,
  LoginType,
  UserDataType,
  UserProfileType,
} from "../dal/auth-api";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AppActionType } from "./store";
import { loadingAC } from "./loadingReducer";
import { setErrorRegistration } from "./registerReducer";

import { handleServerNetworkError } from "./utils/error-utils";
import { createAppAsyncThunk } from "./utils/create-app-asynk-thunk";

export type authStateType = {
  meStatus: MeStatusType;
  meStatusResponse: meStatusResponseType;
  error?: string;
};
export type MeStatusType = UserDataType | null;
export type meStatusResponseType =
  | "none"
  | "done"
  | "error"
  | "logout"
  | "progress"
  | "forgot"
  | "work";

const initialState: authStateType = {
  meStatus: null,
  meStatusResponse: "none",
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
    changeMeStatusResponse(state, action: PayloadAction<meStatusResponseType>) {
      state.meStatusResponse = action.payload;
    },
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.meStatus = action.payload.profile;
      state.meStatusResponse = "done";
    });
    builder.addCase(getAuthUserTC.fulfilled, (state, action) => {
      action.payload && (state.meStatus = action.payload.value);
      action.payload && (state.meStatusResponse = "work");
    });
  },
});
export const authActions = authReducer.actions;
export default authReducer.reducer;

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
      dispatch(authActions.changeMeStatusResponse("error"));
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const login = createAppAsyncThunk(
  "auth/login",
  async (payload: LoginType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(loadingAC("loading"));
    try {
      const response = await authAPI.login(payload);
      return { profile: response.data };
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
export const logoutUserTC =
  () => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC("loading"));
    authAPI
      .logout()
      .then(() => {
        dispatch(authActions.logOutUser(null));
        dispatch(authActions.changeMeStatusResponse("logout"));
        // dispatch(setPacksData({} as PacksGetResponseDataType))
        // dispatch(filterPacks({params: {}} ))
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ", more details in the console";
        console.log(error);
        dispatch(authActions.changeMeStatusResponse("error"));
      })
      .finally(() => {
        dispatch(loadingAC("succeeded"));
      });
  };
export const updateUserProfileTC =
  (payload: UserProfileType) =>
  (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC("loading"));
    authAPI
      .updateUser(payload)
      .then((response) => {
        dispatch(authActions.setAuthUserData(response.data.updatedUser));
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ", more details in the console";
        console.log(error);
        dispatch(setErrorRegistration(error));
      })
      .finally(() => {
        dispatch(loadingAC("succeeded"));
      });
  };
