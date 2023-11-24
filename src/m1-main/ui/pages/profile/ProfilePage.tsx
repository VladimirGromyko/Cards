import React, { useRef, KeyboardEvent, useEffect, useState } from "react";
import s from "./Profile.module.css";
import { ReactComponent as Svg } from "./../utils/direction-arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { PATH } from "m1-main/navigation/Paths";
import { logoutUserTC, updateUser } from "m1-main/bll/authReducer";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import SuperButton from "../../common/button/SuperButton";
import { initialPacksState, setPacksDataTC } from "m1-main/bll/packsReducer";
import defaultAvatar from "./../utils/enot.jpg";
import { ReactComponent as PhotoInput } from "./../utils/photoInput.svg";
import { authSelector } from "m1-main/bll/selectors/auth-selectors";

export const ProfilePage = () => {
  const userName = useAppSelector(authSelector.userName);
  const userEmail = useAppSelector(authSelector.userEmail);
  const userAvatar = useAppSelector(authSelector.userAvatar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nameFromInput, setNameFromInput] = useState<string | undefined>(
    userName
  );
  const [fieldValue, setFieldValue] = useState<boolean>(false);
  const [viewEdit, setViewEdit] = useState<boolean>(false);
  const [currentRows, setCurrentRows] = useState<number>(1);
  const [inputPhoto, setInputPhoto] = useState<boolean>(false);
  const [ava, setAva] = useState(
    userAvatar?.toString() ? userAvatar : defaultAvatar
  );
  const [isAvaBroken, setIsAvaBroken] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      saveName(ava);
      setFieldValue(false);
      setViewEdit(false);
    }
  };
  const adjustHeight = (
    e: React.SyntheticEvent<HTMLTextAreaElement> | string
  ) => {
    let textLength = 0;
    if (typeof e === "string" && (e as string)) {
      textLength = e.length;
    } else if (typeof e !== "string" && (e as React.SyntheticEvent)) {
      textLength = e.currentTarget.textLength;
    }
    if (textLength > 24) {
      setCurrentRows(2);
      if (typeof e !== "string" && (e as React.SyntheticEvent))
        e.currentTarget.style.height = 47 + "px";
    } else {
      setCurrentRows(1);
      if (typeof e !== "string" && (e as React.SyntheticEvent))
        e.currentTarget.style.height = 23 + "px";
    }
  };
  const returnBack = () => {
    navigate(PATH.MAIN);
  };
  const onOutClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = (e.target as HTMLElement).className;
    const isContentButton = target?.includes("SuperButton_icon");
    const isContentInput = target?.includes("editValue");
    if (fieldValue) {
      if (!isContentButton && !isContentInput) {
        setFieldValue(false);
        setViewEdit(false);
      }
      if (fieldValue && !isContentInput && userName !== nameFromInput) {
        setNameFromInput(userName);
        userName && adjustHeight(userName);
      }
    }
  };
  const changeValueClick = (e: React.SyntheticEvent<EventTarget>) => {
    setFieldValue(true);
    userName && adjustHeight(userName);
  };
  const saveName = (newAva: string) => {
    const trimNameFromInput = nameFromInput?.trim();
    if (userName !== trimNameFromInput || userAvatar !== newAva) {
      dispatch(updateUser({ name: trimNameFromInput, avatar: newAva }));
    }
  };
  const onLogoutHandle = () => {
    dispatch(setPacksDataTC({ params: initialPacksState })).then(() => {
      dispatch(logoutUserTC());
    });
  };

  useEffect(() => {
    setNameFromInput(userName);
    userName && adjustHeight(userName);
  }, [userName]);

  const selectPhoto = () => {
    inputRef && inputRef.current?.click();
  };
  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file: File = e.target.files[0];
      const pattern = /^image\//;
      if (!pattern.test(file.type)) {
        alert(`File ${file.name} - invalid format`);
        return;
      }
      if (file.size < 4000000) {
        setIsAvaBroken(false);
        convertFileToBase64(file, (file64: string) => {
          setAva(file64);
          saveName(file64);
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };
  const convertFileToBase64 = (
    file: File,
    callBack: (value: string) => void
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  const errorHandler = () => {
    setIsAvaBroken(true);
    alert("Inappropriate picture");
  };

  let userNameStyle =
    currentRows === 1 ? { height: "25px" } : { height: "50px" };
  const nameFromInputCorrect =
    nameFromInput && nameFromInput.length < 31
      ? nameFromInput
      : nameFromInput?.slice(0, 30) + "...";
  return (
    <div className={s.superWrapper}>
      <div
        className={s.superWrapper}
        onClick={fieldValue ? onOutClick : undefined}
      >
        <div className={s.returnBack} onClick={returnBack}>
          <Svg width="30px" height="25px" />
          Back to Packs List
        </div>
        <div className={s.wrapper}>
          <div className={s.container}>
            <span>Personal Information</span>
            <div className={s.photoWrapper}>
              <div
                className={s.photo}
                onMouseOver={() => setInputPhoto(true)}
                onMouseLeave={() => setInputPhoto(false)}
              >
                <img
                  src={isAvaBroken ? defaultAvatar : ava}
                  // src={ava}
                  alt="UserPhoto"
                  onError={errorHandler}
                  className={s.photoImg}
                />
                {inputPhoto && (
                  <div className={s.photoInput}>
                    <PhotoInput
                      width="30px"
                      height="30px"
                      onClick={selectPhoto}
                    />
                    <input
                      style={{ display: "none", height: "0", width: "0" }}
                      ref={inputRef}
                      type={"file"}
                      name="myImage"
                      accept="image/*"
                      onChange={onPhotoChange}
                    />
                  </div>
                )}
              </div>
            </div>
            {fieldValue ? (
              <div className={s.textFieldValue}>
                <div className={s.textField}>Nickname</div>
                <div className={s.line}>
                  <textarea
                    rows={currentRows}
                    value={nameFromInput}
                    onChange={(e) => setNameFromInput(e.currentTarget.value)}
                    onKeyDown={onKeyPressCallback}
                    onKeyUp={adjustHeight}
                    onClick={adjustHeight}
                    className={s.editValue}
                    autoFocus
                  />
                  <SuperButton
                    style={{
                      borderWidth: 0,
                      minWidth: "25px",
                      borderRadius: "4px",
                      color: "white",
                      fontSize: "16px",
                      maxHeight: "25px",
                    }}
                    onClick={() => saveName(ava)}
                  >
                    SAVE
                  </SuperButton>
                </div>
              </div>
            ) : (
              <div className={s.textBlockWrapper}>
                <div
                  className={s.textBlock}
                  onMouseOver={() => setViewEdit(true)}
                  onMouseLeave={() => setViewEdit(false)}
                >
                  <span
                    onDoubleClick={changeValueClick}
                    className={s.showValue}
                    style={userNameStyle}
                  >
                    {nameFromInputCorrect}
                  </span>
                  {viewEdit && (
                    <span className={s.edit}>
                      <SuperButton
                        onClick={changeValueClick}
                        icon="edit"
                        style={{ borderWidth: 0 }}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className={s.containerForEmail}>{userEmail}</div>
            <div className={s.button} onClick={onLogoutHandle}>
              <SuperButton
                icon="logout"
                iconWithText={true}
                style={{
                  borderWidth: 0,
                  boxShadow: "0 0 10px #889792",
                  background: "white",
                }}
              >
                Log out
              </SuperButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
