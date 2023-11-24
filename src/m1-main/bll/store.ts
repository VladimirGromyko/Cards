import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { MeStatusType } from "../bll/authReducer";
import {
  PacksGetRequestType,
  PacksGetResponseDataType,
} from "../dal/packs-api";
import loadingReducer, { LoadingStatusType } from "./loadingReducer";
import packsReducer, { statePacksType } from "./packsReducer";
import registerReducer, { PasswordStatusType } from "./registerReducer";
import utilsReducer from "./utilsReducer";
import cardsReducer from "./cardsReducer";
import { CardsGetRequestType, CardsGetResponseType } from "../dal/cards-api";
import packsModalReducer, {
  statePacksModalType,
} from "m1-main/bll/packsModalReducer";
import loginReducer from "m1-main/bll/loginReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  loading: loadingReducer,
  register: registerReducer,
  packs: packsReducer,
  cards: cardsReducer,
  main: utilsReducer,
  packsModal: packsModalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } })
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppActionType =
  | MeStatusType
  | LoadingStatusType
  | PasswordStatusType
  | boolean
  | string
  | statePacksType
  | PacksGetResponseDataType
  | PacksGetRequestType
  | CardsGetRequestType
  | CardsGetResponseType
  | statePacksModalType;

// @ts-ignore
window.store = store; // for dev
