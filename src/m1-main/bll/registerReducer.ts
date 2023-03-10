import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {loadingAC} from "./loadingReducer";
import {authAPI, RecoverPassRequestType, RegistrationType} from "../dal/auth-api";
import {AppActionType} from "./store";

export type PasswordStatusType = 'none' | 'succeeded' | 'failed'
export type RegistrationStateType = {
    isRegistered: boolean
    errorRegMessage: string
    passwordStatus: PasswordStatusType
    errorPassRecMessage: string
}
const initialState: RegistrationStateType = {
    isRegistered: false,
    errorRegMessage: '',
    passwordStatus: 'none',
    errorPassRecMessage: '',
};
const registerReducer = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegistration(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        },
        setErrorRegistration(state, action: PayloadAction<string>) {
            state.errorRegMessage = action.payload
        },
        setPasswordStatus(state, action: PayloadAction<PasswordStatusType>) {
            state.passwordStatus = action.payload
        },
        setErrorPassRecover(state, action: PayloadAction<string>) {
            state.errorPassRecMessage = action.payload
        },
    }
})
export const {
    setRegistration,
    setErrorRegistration,
    setPasswordStatus,
    setErrorPassRecover
} = registerReducer.actions
export default registerReducer.reducer

export const registrationTC = (payload: RegistrationType) => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    debugger
    dispatch(loadingAC('loading'))
    authAPI.registrationUser(payload)
        .then(res => {
                dispatch(setRegistration(true))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        e.response && e.response.data && dispatch(setErrorRegistration(e.response.data.error))
        console.log(error)
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}

export const forgotTC = (email: string) => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.recoverPass(email)
        .then((res) => {
            dispatch(setPasswordStatus('succeeded'))
        })
        .catch((err) => {
            dispatch(setErrorPassRecover(err.response?.data.error))
            dispatch(setPasswordStatus('failed'))
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
        })
}

export const createNewPasswordTC = (payload: RecoverPassRequestType) =>
    (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
        dispatch(loadingAC('loading'))
        authAPI.setNewPass(payload)
            .then((res) => {
                dispatch(setPasswordStatus('succeeded'))
            })
            .catch((err) => {
                debugger
                dispatch(setPasswordStatus('failed'))
                dispatch(setErrorPassRecover(err.response?.data?.error))
            })
            .finally(() => {
                dispatch(loadingAC('succeeded'))
            })
    }
