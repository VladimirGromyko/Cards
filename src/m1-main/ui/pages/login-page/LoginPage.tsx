import React, { useState } from "react";
import s from "./LoginPage.module.css";
import eye_open from "../utils/eye_open.png";
import eye_close from "../utils/eye_close.png";
import SuperInputText from "../../common/input/SuperInputText";
import SuperCheckbox from "../../common/сheckbox/SuperCheckbox";
import SuperButton from "../../common/button/SuperButton";
import { useAppDispatch, useAppSelector } from "../../../bll/hooks";
import Waiting from "../error-page/Waiting";
import checkEmail from "../utils/checkEmail";
import { setErrorRegistration } from "../../../bll/registerReducer";
import { useActions } from "m1-main/bll/utils/helpers";
import {
  loginActions,
  loginThunk,
  selectLogin,
} from "m1-main/bll/loginReducer";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "m1-main/navigation/Paths";

const LoginPage = () => {
  const errorRegMessage = useAppSelector(
    (state) => state.register.errorRegMessage
  );
  const { login } = useActions(loginThunk);
  const { email, password, rememberMe, error, errorEmail } =
    useAppSelector(selectLogin);
  const { setRememberMe, setPassword, setEmail } = useActions(loginActions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState<string>("password");

  type MessageType = {
    emailMessage: string;
    passMessage: string;
  };
  const initialMessage = {
    emailMessage: "",
    passMessage: "",
  };
  const [message, setMessage] = useState<MessageType>(initialMessage);

  const logInHandler = () => {
    let isRegDataCorrect = true;
    const onRegClickMessages = { ...initialMessage };
    if (!password) {
      onRegClickMessages.passMessage = "Enter a password!";
      isRegDataCorrect = false;
    }
    if (!checkEmail(email)) {
      onRegClickMessages.emailMessage = "Email is not valid!";
      isRegDataCorrect = false;
    }
    if (isRegDataCorrect) {
      login({ email, password, rememberMe })
        .unwrap()
        .then((res) => {
          if (!res.data.error) {
            navigate(`${PATH.MAIN}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessage(onRegClickMessages);
    }
  };
  const changeEmail = (e: string) => {
    setEmail({ email: e });
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
    if (message.passMessage || message.emailMessage) {
      setMessage(initialMessage);
    }
    errorRegMessage && dispatch(setErrorRegistration(""));
  };

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
            <SuperInputText
              type={"email"}
              value={email}
              placeholder={"Enter email"}
              onChangeText={changeEmail}
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
                onChangeText={(e) => setPassword({ password: e })}
                error={message.passMessage}
              />
            </div>
          </div>

          <div className={s.wrapper_submit_checkbox}>
            <SuperCheckbox
              onChangeChecked={(e) => setRememberMe({ rememberMe: e })}
            >
              Remember me
            </SuperCheckbox>
          </div>
          <div className={s.forgotPass}>
            <Link to={PATH.PASSWORD_RECOVERY}>Forgot password ?</Link>
          </div>
          <SuperButton
            onClick={logInHandler}
            className={s.wrapper_submit_button}
          >
            Sign in
          </SuperButton>
          <div className={s.helpText}>Don't have an account?</div>
          <div className={s.helpTextBold}>
            <Link to={PATH.REGISTRATION}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
