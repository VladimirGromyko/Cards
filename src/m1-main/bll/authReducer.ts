import {authAPI, LoginType, UserDataType} from "../dal/auth-api";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppActionType} from "./store";
import {loadingAC} from "./loadingReducer";
import {setErrorRegistration} from "./registerReducer";


export type authStateType = {
    meStatus: MeStatusType,
    meStatusResponse: meStatusResponseType
}
export type MeStatusType = UserDataType | null
export type meStatusResponseType = 'none' | 'done' | 'error' | 'logout' | 'progress' | 'forgot'

const initialState: authStateType = {
    // isInstructionEmailed: 'failed',
    // isNewPassSet: 'failed',
    meStatus: null,
    meStatusResponse: 'none'
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getMeStatus(state, action: PayloadAction<UserDataType>) {
            state.meStatus = action.payload
        },
        setAuthUserData(state, action: PayloadAction<UserDataType>) {
            state.meStatus = action.payload
        },
        logOutUser(state, action: PayloadAction<MeStatusType>) {
            state.meStatus = action.payload
        },
        changeMeStatusResponse (state, action: PayloadAction<meStatusResponseType>) {
            state.meStatusResponse = action.payload
        }
    }
});
export const {
    getMeStatus,
    setAuthUserData,
    logOutUser,
    changeMeStatusResponse
} = authReducer.actions
export default authReducer.reducer

export const getAuthUserTC = () => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.me()
        .then((res) => {
            // if (res.data.resultCode === 0) {
            //     // dispatch(setAppStatusAC('succeeded'))
            // dispatch(setIsLoggedInAC(true))
            // dispatch(setAuthUserDataAC(res.data))
            // dispatch(setMeStatusAC(res.data))
            dispatch(getMeStatus(res.data))
            dispatch(changeMeStatusResponse('done'))
            // } else {
            //     handleServerAppError(dispatch, res.data)
            // }
        })
        .catch((err) => {
            dispatch(changeMeStatusResponse('error'))
            // handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            // dispatch(setIsInitializedAC(true))
        })
}
export const setAuthUserDataTC = (payload: LoginType) => (dispatch: Dispatch<PayloadAction<AppActionType>>) => {
    dispatch(loadingAC('loading'))
    authAPI.login(payload)
        .then(response => {
                dispatch(setAuthUserData(response.data))
                dispatch(changeMeStatusResponse('done'))
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
        .then(response => {
            dispatch(logOutUser(null))
            dispatch(changeMeStatusResponse('logout'))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
        dispatch(changeMeStatusResponse('error'))
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}

// export const forgotTC = (name: string) => (dispatch: Dispatch<authReducerType>) => {
//     dispatch(loadingAC('loading'))
//     authAPI.recoverPass(name)
//         .then((res) => {
//             dispatch(setForgotPassStatusAC('succeeded'))
//             // dispatch(setForgotPassStatusAC('succeeded'))
//             setTimeout(()=>{
//                 dispatch(setForgotPassStatusAC('failed'))
//             },3000)
//         })
//         .catch((err: AxiosError) => {
//             dispatch(responseErrorAC(true, 'passwordRec', err.response?.data.error))
//             setTimeout(()=>{
//                 dispatch(responseErrorAC(false, 'passwordRec', ''))
//             },3000)
//
//         })
//         .finally(() => {
//             dispatch(loadingAC('succeeded'))
//         })
// }

// export const resetNewPasswordTC = (password: string, resetPasswordToken: string | undefined) =>
//     (dispatch: Dispatch<authReducerType>) => {
//         dispatch(loadingAC('loading'))
//         authAPI.setNewPass(password, resetPasswordToken)
//             .then((res) => {
//                 dispatch(resetNewPassStatusAC('succeeded'))
//                 setTimeout(()=>{
//                     dispatch(resetNewPassStatusAC('failed'))
//                 },3000)
//             })
//             .catch((err: AxiosError) => {
//                 dispatch(responseErrorAC(true, 'changePas', err.response?.data.error))
//                 setTimeout(()=>{
//                     dispatch(responseErrorAC(false, 'changePas', ''))
//                 },3000)
//             })
//             .finally(() => {
//                 dispatch(loadingAC('succeeded'))
//             })
//     }
// export const setMeStatusAC = (status: UserDataType) => ({type: 'AUTH/ME-STATUS', status} as const)

// export const setForgotPassStatusAC = (status: SendForgotPassStatusType) =>
//     ({type: 'AUTH/FORGOT-PASS-STATUS', status} as const)
//
// export const resetNewPassStatusAC = (status: SendForgotPassStatusType) =>
//     ({type: 'AUTH/NEW-PASS-STATUS', status} as const)
//
// export type SetMeStatusACType = ReturnType<typeof setMeStatusAC>
// export type SetForgotPassACType = ReturnType<typeof setForgotPassStatusAC>
// export type ResetNewPassACType = ReturnType<typeof resetNewPassStatusAC>

// export PayloadActionType = UserDataType

// export type authActionsType = SetMeStatusACType
    // | SetForgotPassACType
    // | ResetNewPassACType
    // | LoadingACType
    // | ResponseErrorACType


