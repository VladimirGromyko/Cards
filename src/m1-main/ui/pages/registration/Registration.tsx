import React, { ChangeEvent, useEffect, useState } from "react";
import s from "../login-page/LoginPage.module.css";
import eye_open from "../utils/eye_open.png";
import eye_close from "../utils/eye_close.png";
import {
  registrationTC,
  setErrorRegistration,
  setRegistration,
} from "m1-main/bll/registerReducer";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import Waiting from "../error-page/Waiting";
import SuperInputText from "../../common/input/SuperInputText";
import SuperButton from "../../common/button/SuperButton";
import checkEmail from "../utils/checkEmail";
import { PATH } from "m1-main/navigation/Paths";
import { Link } from "react-router-dom";

type MessageType = {
  emailMessage: string;
  confirmPassMessage: string;
};
const Registration = () => {
  debugger;
  const isRegistered = useAppSelector((state) => state.register.isRegistered);
  const errorRegMessage = useAppSelector(
    (state) => state.register.errorRegMessage
  );
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<string>("password");
  const [confirmPass, setConfirmPass] = useState("");

  const initialMessage = {
    emailMessage: "",
    confirmPassMessage: "",
  };
  const [message, setMessage] = useState<MessageType>(initialMessage);
  const onConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.currentTarget.value);
  };
  const onRegisterClick = () => {
    let isRegDataCorrect = true;
    const onRegClickMessages = { ...initialMessage };
    if (!password) {
      onRegClickMessages.confirmPassMessage = "Enter a password!";
      isRegDataCorrect = false;
    } else if (password && password !== confirmPass) {
      onRegClickMessages.confirmPassMessage = "Password is incorrect!";
      isRegDataCorrect = false;
    }
    if (!checkEmail(email)) {
      onRegClickMessages.emailMessage = "Email is not valid!";
      isRegDataCorrect = false;
    }
    isRegDataCorrect
      ? dispatch(registrationTC({ email, password }))
      : setMessage(onRegClickMessages);
  };
  const togglePassInput = () => {
    if (type === "password") {
      setType("text");
      setTimeout(() => {
        setType("password");
      }, 1000);
    } else setType("password");
  };

  const onOutClick = () => {
    if (message.confirmPassMessage || message.emailMessage) {
      setMessage(initialMessage);
    }
    errorRegMessage && dispatch(setErrorRegistration(""));
  };
  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        dispatch(setRegistration(false));
      }, 1500);
    }
  }, [dispatch, isRegistered]);

  return (
    <div className={s.superWrapper}>
      <div className={s.wrapper} onClick={onOutClick}>
        <Waiting />
        <div className={s.container}>
          <h4 className={s.title}>SIGN UP</h4>
          <div className={s.containerForEmail}>
            <div className={s.textField}>
              <div className={s.label}>Email</div>
            </div>
            <SuperInputText
              type={"email"}
              value={email}
              placeholder={"Enter email"}
              onChangeText={setEmail}
              error={message.emailMessage}
            />
          </div>
          <div className={s.containerForPassword}>
            <div className={s.textField}>
              <div className={s.label}>Password</div>
              <div onClick={togglePassInput} className={s.viewImage}>
                {type === "password" ? (
                  <img src={eye_close} alt="eye_close" className={s.passView} />
                ) : (
                  <img src={eye_open} alt="eye_open" className={s.passView} />
                )}
              </div>
            </div>
            <div className={s.passwordField}>
              <SuperInputText
                type={type}
                value={password}
                placeholder={"Password"}
                onChangeText={setPassword}
              />
            </div>
          </div>
          <div className={s.containerForPassword}>
            <div className={s.textField}>
              <div className={s.label}>Confirm password</div>
              <div onClick={togglePassInput} className={s.viewImage}>
                {type === "password" ? (
                  <img src={eye_close} alt="eye_close" className={s.passView} />
                ) : (
                  <img src={eye_open} alt="eye_open" className={s.passView} />
                )}
              </div>
            </div>
            <SuperInputText
              className={s.input}
              type={type}
              placeholder="Confirm password"
              onChange={onConfirmPassChange}
              error={message.confirmPassMessage}
            />
          </div>
          <SuperButton
            onClick={onRegisterClick}
            className={s.wrapper_submit_button}
          >
            Sign Up
          </SuperButton>
          {errorRegMessage && (
            <div className={s.message}>{errorRegMessage}</div>
          )}
          {isRegistered && (
            <div className={s.messageSuccess}>Регистрация прошла успешно!</div>
          )}
          <div className={s.helpText}>Already have an account ?</div>
          <div className={s.helpTextBold}>
            <Link to={PATH.LOGIN}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
