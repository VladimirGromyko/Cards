import React, {useCallback, useState} from 'react'
import s from './PassRecovery.module.css';
import SuperInputText from "../../common/input/SuperInputText";
import Waiting from "../errorPage/Waiting";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import SuperButton from "../../common/button/SuperButton";
import {changeMeStatusResponse} from "../../../bll/authReducer";
import {forgotTC, setErrorPassRecover, setPasswordStatus} from "../../../bll/registerReducer";
import openMail from "../utils/open-mail.png"
import checkEmail from "../utils/checkEmail";

const PasswordRecoveryPage = () => {

    const passwordStatus = useAppSelector(state => state.register.passwordStatus)
    const errorRes = useAppSelector(state => state.register.errorPassRecMessage)
    const dispatch = useAppDispatch()


    const [email, setEmail] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        checkEmail(email)
            ? dispatch(forgotTC(email))
            : dispatch(setErrorPassRecover('Inter correct email !'))
    }, [dispatch, email])
    const onOutClick = () => {
        errorRes && dispatch(setErrorPassRecover(''))
    }
    const backToLogin = () => {
        dispatch(changeMeStatusResponse('logout'))
        dispatch(setPasswordStatus('failed'))
    }

    return (<div className={s.superWrapper}>
            <div className={s.wrapper} onClick={onOutClick}>
                <Waiting />
                <div className={s.container}>

                    {passwordStatus !== 'succeeded' &&
                        <div>
                            <h3>Forgot you password ?</h3>
                            <div className={s.containerForEmail}>
                                <SuperInputText value={email}
                                                onChangeText={setEmail}
                                                onEnter={onKeyPressHandler}
                                                placeholder={'Email'}
                                                error={errorRes}
                                                spanClassName={'Input'}
                                />
                            </div>
                            <div className={s.containerForPassword}>
                                <div className={s.helpEmailText}>Enter your email address and we will send you further
                                    instruction
                                </div>
                            </div>
                            <div><SuperButton onClick={onKeyPressHandler} className={s.forgotButton}>
                                Send instruction
                            </SuperButton>
                            </div>
                            <div className={s.helpText}>Did you remember your password ?</div>
                            <div className={s.helpTextBold}
                                 onClick={() => dispatch(changeMeStatusResponse('error'))}
                            >
                                Try logging in
                            </div>
                        </div>
                    }
                    <div className={s.forgotEmail}>
                        {passwordStatus === 'succeeded' &&
                        <div>
                            <div className={s.helpEmailTextBold}>Check Email</div>
                            <img className={s.photo}
                                 src={openMail}
                                 alt="UserPhoto"/>
                            <div className={s.helpEmailText1}>We've sent Email with instruction to {email}</div>
                                <SuperButton onClick={backToLogin}
                                              className={s.forgotButton}
                                >Back to login
                                </SuperButton>
                        </div>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PasswordRecoveryPage
