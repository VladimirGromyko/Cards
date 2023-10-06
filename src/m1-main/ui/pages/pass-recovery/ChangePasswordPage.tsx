import React, { useCallback, useEffect, useState } from "react";
import s from "./PassRecovery.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Waiting from "../error-page/Waiting";
import SuperInputText from "../../common/input/SuperInputText";
import SuperButton from "../../common/button/SuperButton";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import { PATH } from "m1-main/navigation/Paths";
import {
  createNewPasswordTC,
  setErrorPassRecover,
} from "m1-main/bll/registerReducer";

const ChangePasswordPage = () => {
  const newPassStatus = useAppSelector(
    (state) => state.register.passwordStatus
  );
  let errorRes = useAppSelector((state) => state.register.errorPassRecMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (errorRes.indexOf("bad token") > -1) {
    errorRes += ". You'll be redirected to the password recovery page";
  }

  useEffect(() => {
    if (newPassStatus === "succeeded") navigate(PATH.LOGIN);
    if (newPassStatus === "failed") {
      if (errorRes && errorRes.indexOf("Password not valid") === -1) {
        setTimeout(() => {
          errorRes && dispatch(setErrorPassRecover(""));
          navigate(PATH.PASSWORD_RECOVERY);
        }, 2500);
      }
    }
  }, [dispatch, newPassStatus, navigate, errorRes]);

  const param = useParams<"token">();
  const resetPasswordToken = param.token;

  const [password, setPassword] = useState<string>("");

  const onKeyPressHandler = useCallback(() => {
    debugger;
    dispatch(createNewPasswordTC({ password, resetPasswordToken }));
  }, [dispatch, password, resetPasswordToken]);
  const onOutClick = () => {
    if (errorRes && errorRes.indexOf("Password not valid") === -1) {
      navigate(PATH.PASSWORD_RECOVERY);
    }
    dispatch(setErrorPassRecover(""));
  };

  return (
    <div className={s.superWrapper}>
      <div className={s.wrapper} onClick={onOutClick}>
        <Waiting />
        <div className={s.container}>
          <h3>Create new password</h3>
          <div className={s.inputField}>
            <SuperInputText
              value={password}
              onChangeText={setPassword}
              onEnter={onKeyPressHandler}
              placeholder={"New password"}
              error={errorRes}
              spanClassName={s.inputError}
            />
          </div>
          <div className={s.helpText}>
            Create new password and we will send you further instruction to
            email
          </div>
          <div className={s.forgotEmail}>
            <br />
          </div>
          <div>
            <SuperButton onClick={onKeyPressHandler} className={s.forgotButton}>
              Create new password
            </SuperButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePasswordPage;
