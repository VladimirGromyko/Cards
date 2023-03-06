import React, {useState} from 'react'
// import SuperButton from "../../common/c1-SuperButton/SuperButton";
// import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import s from './LoginPage.module.css'
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../../m2-bll/store";
import {PATH} from "../../../navigation/Paths";
// import {getAuthUserDataTC} from "../../../m2-bll/loginReducer";
// import l from "../../common/loading/loader07.module.css";
import {NavLink} from 'react-router-dom';
import eye_open from '../utils/eye_open.png'
import eye_close from '../utils/eye_close.png'
import SuperInputText from "../../common/input/SuperInputText";
import SuperCheckbox from "../../common/сheckbox/SuperCheckbox";
import SuperButton from "../../common/button/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {changeMeStatusResponse, setAuthUserDataTC} from "../../../bll/authReducer";
import Waiting from "../errorPage/Waiting";
import checkEmail from "../utils/checkEmail";
import {registrationTC, setErrorRegistration} from "../../../bll/registerReducer";

const LoginPage = () => {
    // const isLoading = useAppSelector((state) => state.loading.isLoading);
    // const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const errorRegMessage = useAppSelector((state) => state.register.errorRegMessage);
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [type, setType] = useState<string>('password')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    type MessageType = {
        emailMessage: string
        passMessage: string
    }
    const initialMessage = {
        emailMessage: '',
        passMessage: ''
    }
    const [message, setMessage] = useState<MessageType>( initialMessage)

    const logInHandler = () => {
        // if (email && password) {
        //     dispatch(setAuthUserDataTC({email, password, rememberMe}))
        // } else {
        //     console.log("Заполните поля: Логин и Пароль")
        // }

        debugger
        let isRegDataCorrect = true
        const onRegClickMessages = {...initialMessage}
        if (!password) {
            onRegClickMessages.passMessage = 'Enter a password!'
            isRegDataCorrect = false
        }
        if (!checkEmail(email)) {
            onRegClickMessages.emailMessage = 'Email is not valid!'
            isRegDataCorrect = false
        }
        isRegDataCorrect
            ? dispatch(setAuthUserDataTC({email, password, rememberMe}))
            : setMessage(onRegClickMessages)
    }
    const changeEmail = (e: string) => {
        debugger
        setEmail(e)
    }
    const togglePassInput = () => {
        if (type === 'password') {
            setType('text')
            setTimeout(() => {
                setType('password')
            }, 1000);
        } else setType('password')
    }
    const onOutClick = () => {
        debugger
        if (message.passMessage || message.emailMessage) {
            setMessage(initialMessage)
        }
        errorRegMessage && dispatch(setErrorRegistration(''))
    }

    return (
        <div className={s.superWrapper}>
            <div className={s.wrapper} onClick={onOutClick}>
                <Waiting />
                <div className={s.container}>
                    <h4 className={s.title}>SIGN IN</h4>
                    <div className={s.containerForEmail}>
                        <div className={s.textField}>
                            <div className={s.label}>Email</div>
                        </div>
                        <SuperInputText type={'email'}
                                        value={email}
                                        placeholder={'Enter email'}
                                        onChangeText={changeEmail}
                                        error={message.emailMessage}
                        />
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>
                            <div className={s.label}>Password</div>
                            <div onClick={togglePassInput} className={s.viewImage}>
                                {type === 'password'
                                    ? (<img src={eye_close} alt='eye_close' className={s.passView}/>)
                                    : (<img src={eye_open} alt='eye_open' className={s.passView}/>)
                                }
                            </div>
                        </div>
                        <div className={s.passwordField}>
                            <SuperInputText type={type}
                                            value={password}
                                            placeholder={'Password'}
                                            onChangeText={setPassword}
                                            error={message.passMessage}
                            />
                        </div>

                    </div>

                    <div className={s.wrapper_submit_checkbox}>
                        <SuperCheckbox onChangeChecked={setRememberMe}
                        >Remember me
                        </SuperCheckbox>
                    </div>
                    <div className={s.forgotPass}
                         onClick={() => dispatch(changeMeStatusResponse('forgot'))}
                    >
                        Forgot password ?
                    </div>
                    {/*<div className={s.helpTextForgotPasswordContainer}>*/}
                    {/*    <NavLink to={PATH.PASSWORD_RECOVERY}*/}
                    {/*             className={s.helpTextForgotPassword}*/}
                    {/*    >Forgot Password*/}
                    {/*    </NavLink>*/}
                    {/*</div>*/}
                    <div>
                        <div className={s.wrapper_submit_button}>
                            <SuperButton
                                onClick={logInHandler}
                                // disabled={isLoggedIn}
                            >
                                Sign in
                            </SuperButton>
                        </div>
                    </div>
                    <div className={s.helpText}>Don't have an account?</div>
                    <div className={s.helpTextBold} onClick={() => dispatch(changeMeStatusResponse('progress'))}>
                        Sign Up
                    </div>
                        {/*<NavLink to={PATH.REGISTRATION}>*/}
                        {/*    Sign Up*/}
                        {/*</NavLink>*/}

                </div>
            </div>
        </div>
    );
}

export default LoginPage;
