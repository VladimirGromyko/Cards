import {authAPI, LoginType, UserDataType, UserProfileType} from "../dal/auth-api";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppActionType} from "./store";
import {loadingAC} from "./loadingReducer";
import {setErrorRegistration} from "./registerReducer";

import {PacksGetResponseDataType} from "../dal/packs-api";
// import {Simulate} from "react-dom/test-utils";
// import loadedData = Simulate.loadedData;

export type authStateType = {
    meStatus: MeStatusType,
    meStatusResponse: meStatusResponseType
}
export type MeStatusType = UserDataType | null
export type meStatusResponseType = 'none' | 'done' | 'error' | 'logout' | 'progress' | 'forgot' | 'work'

const initialState: authStateType = {
    meStatus: null,
    meStatusResponse: 'none'
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // getMeStatus(state, action: PayloadAction<UserDataType>) {
        //     state.meStatus = action.payload
        // },
        setAuthUserData(state, action: PayloadAction<UserDataType>) {
            state.meStatus = action.payload
        },
        logOutUser(state, action: PayloadAction<MeStatusType>) {
            state.meStatus = action.payload
        },
        changeMeStatusResponse (state, action: PayloadAction<meStatusResponseType>) {
            debugger
            state.meStatusResponse = action.payload
        },
        // updateUserData(state, action: PayloadAction<UserDataType>) {
        //     state.meStatus = action.payload
        // },
        // updateUserProfile (state, action: PayloadAction<UserDataType>) {
        // state.meStatus = action.payload
        //     if (state.meStatus?.name) {
        //         state.meStatus.name = action.payload.name
        //     }
        //     if (state.meStatus?.avatar) {
        //         state.meStatus.avatar = action.payload.avatar
        //     }
        // }
    }
});
// export const {
//     setAuthUserData,
//     logOutUser,
//     changeMeStatusResponse,
// } = authReducer.actions
export const authActions = authReducer.actions
export default authReducer.reducer

export const getAuthUserTC = () => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.me()
        .then((res) => {
            dispatch(authActions.setAuthUserData(res.data))
            dispatch(authActions.changeMeStatusResponse('done'))
        })
        .catch((err) => {
            console.log(err)
            dispatch(authActions.changeMeStatusResponse('error'))
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
        })
}
export const setAuthUserDataTC = (payload: LoginType) => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.login(payload)
        .then(response => {
                dispatch(authActions.setAuthUserData(response.data))
                dispatch(authActions.changeMeStatusResponse('done'))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
        dispatch(setErrorRegistration(error))
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}
export const logoutUserTC = () => (dispatch:  Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.logout()
        .then(() => {
                dispatch(authActions.logOutUser(null))
                // dispatch(changeMeStatusResponse('none'))
                dispatch(authActions.changeMeStatusResponse('logout'))
                // dispatch(setPacksData({} as PacksGetResponseDataType))
                // dispatch(filterPacks({params: {}} ))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
        dispatch(authActions.changeMeStatusResponse('error'))
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}
export const updateUserProfileTC = (payload: UserProfileType) => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.updateUser(payload)
        .then(response => dispatch(authActions.setAuthUserData(response.data.updatedUser))
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
        dispatch(setErrorRegistration(error))
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}
