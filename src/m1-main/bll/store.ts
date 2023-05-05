import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer, {meStatusResponseType, MeStatusType} from "../bll/authReducer"
import {PacksGetRequestType, PacksGetResponseDataType} from "../dal/packs-api";
import loadingReducer, {LoadingStatusType} from "./loadingReducer";
import packsReducer, { statePacksType } from "./packsReducer";
import registerReducer, {PasswordStatusType} from "./registerReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    register: registerReducer,
    packs: packsReducer,
})

const store = configureStore({
    reducer: rootReducer,
    // reducer: {
    //     auth: authReducer,
    //     loading: loadingReducer,
    //     register: registerReducer,
    //     packs: packsReducer,
    // },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } })
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppActionType = MeStatusType
    | LoadingStatusType
    | meStatusResponseType
    | PasswordStatusType
    | boolean
    | string
    | statePacksType
    | PacksGetResponseDataType
    | PacksGetRequestType

    // CardsActionType
    // | RegisterActionType
    // | PacksReducerType
    // | LoginActionsType
    // | LoadingACType
    // | ResponseErrorACType
    // | authReducerType
    // | NewPassActionsType
    // | ResponseConfirmACType

// @ts-ignore
window.store = store // for dev
