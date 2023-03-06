import React, {useCallback, useEffect, useState} from 'react'
// import l from "../../common/c7-Loading/loader07.module.css";
import s from './PassRecovery.module.css'
// import {resetNewPasswordTC, SendForgotPassStatusType} from "../../../m2-bll/authReducer1";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../../m2-bll/store";
import {useNavigate, useParams} from "react-router-dom";
import Waiting from "../errorPage/Waiting";
import SuperInputText from "../../common/input/SuperInputText";
import SuperButton from "../../common/button/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {PATH} from "../../../navigation/Paths";
import {createNewPasswordTC, setErrorPassRecover} from "../../../bll/registerReducer";

// import {PATH} from "../../routes/Paths";
// import {LoadingStatusType} from "../../../m2-bll/loadingReducer";
// import {ResponseErrorStateType} from "../../../m2-bll/errorReducer";
// import {errorResponse} from "../../../../n2-features/f0-test/errorResponse";


const ChangePasswordPage = () => {
    debugger
    // const newPassStatus = useAppSelector<AppStoreType, SendForgotPassStatusType>(state => state.auth1.isNewPassSet)
    const newPassStatus = useAppSelector(state => state.register.passwordStatus)
    let errorRes = useAppSelector(state => state.register.errorPassRecMessage)
    // const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    // const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    if (errorRes.indexOf("bad token") > -1) {
        errorRes += ". You'll be redirected to the password recovery page"
    }

    useEffect(() => {
        if (newPassStatus === 'succeeded') navigate(PATH.LOGIN)
        if (newPassStatus === 'failed') {
            if (errorRes && errorRes.indexOf("Password not valid") === -1) {
                setTimeout(() => {
                    errorRes && dispatch(setErrorPassRecover(''))
                    navigate(PATH.PASSWORD_RECOVERY)
                }, 2500)
            }
        }
    }, [newPassStatus, navigate, errorRes])

    const param = useParams<'token'>()
    const resetPasswordToken = param.token

    const [password, setPassword] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        debugger
        dispatch(createNewPasswordTC({password, resetPasswordToken}))
    }, [dispatch, password, resetPasswordToken])
    const onOutClick = () => {
        if (errorRes && errorRes.indexOf("Password not valid") === -1) {
            navigate(PATH.PASSWORD_RECOVERY)
        }
        dispatch(setErrorPassRecover(''))
    }

    return (<div className={s.superWrapper}>
            <div className={s.wrapper} onClick={onOutClick}>
                {/*<div style={{width: '100%'}}>*/}
                {/*    {isLoading === "loading" && <div className={l.loader07}></div>}*/}
                {/*</div>*/}
                <Waiting />
                <div className={s.container}>
                    <h3>Create new password</h3>
                    <div className={s.inputField}>
                        <SuperInputText value={password}
                                        onChangeText={setPassword}
                                        onEnter={onKeyPressHandler}
                                        placeholder={'New password'}
                                        error={errorRes}
                                        spanClassName={s.inputError}
                        />
                    </div>
                    <div className={s.helpText}>Create new password and we will send you further instruction to email</div>
                    <div className={s.forgotEmail}><br/></div>
                    <div>
                        <SuperButton onClick={onKeyPressHandler} className={s.forgotButton}>Create new password</SuperButton>
                    </div>
                </div>
            </div>
    </div>

    )
}
export default ChangePasswordPage
