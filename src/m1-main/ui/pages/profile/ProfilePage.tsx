import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import s from './Profile.module.css';
import {ReactComponent as Svg} from "./../utils/direction-arrow-left.svg";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../navigation/Paths";
import {authActions, logoutUserTC, updateUserProfileTC} from "../../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import SuperButton from "../../common/button/SuperButton";
import {initialPacksState, setPacksDataTC} from "../../../bll/packsReducer";

export const ProfilePage = () => {

    const userName = useAppSelector((state) => state.auth.meStatus?.name)
    const userEmail = useAppSelector((state) => state.auth.meStatus?.email)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [nameFromInput, setNameFromInput] = useState<string | undefined>(userName)
    const [fieldValue, setFieldValue] = useState<boolean>(false)
    const [viewEdit, setViewEdit] = useState<boolean>(false)
    const [currentRows, setCurrentRows] = useState<number>(1)

    const setName = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        setNameFromInput(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateUserProfileTC({name: nameFromInput, avatar:"https://www.meme-arsenal.com/memes/8d5e37167343dd477fde3ba2e59f9dee.jpg"}))
            setFieldValue(false)
            setViewEdit(false)
        }
    }
    const adjustHeight = (e: React.SyntheticEvent<HTMLTextAreaElement> | string) => {
        let textLength = 0
        if (typeof e === 'string' && e as string) {
            textLength = e.length
        } else if (typeof e !== 'string' && e as React.SyntheticEvent) {
            textLength = e.currentTarget.textLength
        }
        if (textLength > 24) {
            setCurrentRows(2)
            if (typeof e !== 'string' && e as React.SyntheticEvent) e.currentTarget.style.height = 47 + "px";
        } else {
            setCurrentRows(1)
            if (typeof e !== 'string' && e as React.SyntheticEvent) e.currentTarget.style.height = 23 + "px";
        }
    }
    const returnBack = () => {
        dispatch(authActions.changeMeStatusResponse('done'))
        navigate(PATH.PACKS)
    }
    const onOutClick = (e: React.SyntheticEvent<EventTarget>) => {
        const target =  (e.target as HTMLElement).className
        const isContentButton = target.indexOf("SuperButton_icon")
        const isContentInput = target.indexOf("editValue")
        if (isContentButton < 0 && isContentInput < 0) {
            setFieldValue(false)
            setViewEdit(false)
        }
        if (fieldValue && isContentInput < 0 && userName !== nameFromInput) {
            setNameFromInput(userName)
            userName && adjustHeight(userName);
        }
    }
    const changeValueClick = (e: React.SyntheticEvent<EventTarget>) => {
        setFieldValue(true)
        userName && adjustHeight(userName);
    }
    const saveName = () => {
        const trimNameFromInput = nameFromInput?.trim()
        if (userName !== trimNameFromInput) {
            dispatch(updateUserProfileTC({name: trimNameFromInput, avatar:"https://www.meme-arsenal.com/memes/8d5e37167343dd477fde3ba2e59f9dee.jpg"}))
        }
    }
    const onLogoutHandle = () =>{
        dispatch(setPacksDataTC({params: initialPacksState})).then(() => {
            dispatch(logoutUserTC())
        })
    }

    useEffect(() => {
        setNameFromInput(userName)
        userName && adjustHeight(userName);
    }, [userName])

    let userNameStyle = currentRows === 1 ? { height: "25px" } : { height: "50px" }
    const nameFromInputCorrect = (nameFromInput && nameFromInput.length < 31) ? nameFromInput : nameFromInput?.slice(0,30)+"..."

    return (
        <div className={s.superWrapper} onClick={onOutClick}>
            <div className={s.returnBack} onClick={returnBack} >
                <Svg width="30px" height="25px"/>
                Back to Packs List
            </div>
            <div className={s.wrapper} >

                <div className={s.container}>
                    <span>Personal Information</span>
                    <div className={s.photo}>
                        <img
                             src="https://www.meme-arsenal.com/memes/8d5e37167343dd477fde3ba2e59f9dee.jpg"
                             alt="UserPhoto"
                             className={s.photoImg}
                        />
                    </div>
                    <>
                        {fieldValue
                            ?
                            <div className={s.textFieldValue}>
                                <div className={s.textField}>Nickname</div>
                                <div className={s.line}>
                                    <textarea
                                        rows={currentRows}
                                        value={nameFromInput}
                                        onChange={setName}
                                        onKeyDown={onKeyPressCallback}
                                        onKeyUp={adjustHeight}
                                        onClick={adjustHeight}
                                        className={s.editValue}
                                        autoFocus
                                    />
                                    <SuperButton
                                        style={{
                                            borderWidth: 0,
                                            minWidth: '25px',
                                            borderRadius: '4px',
                                            color: 'white',
                                            fontSize: '16px',
                                            maxHeight: '25px'
                                        }}
                                        onClick={saveName}
                                    >SAVE</SuperButton>
                                </div>

                            </div>
                            :
                            <div onDoubleClick={changeValueClick}
                                  className={s.textBlock}
                                  // className={s.showValue}
                                  onMouseOver={() => setViewEdit(true)}
                                  onMouseLeave={() => setViewEdit(false)}
                            >
                                <span className={s.showValue} style={userNameStyle}>{nameFromInputCorrect}</span>
                                {viewEdit &&
                                    <span className={s.edit}>
                                        <SuperButton
                                            onClick={changeValueClick}
                                            icon="edit"
                                            style={{borderWidth: 0}}
                                        />
                                    </span>
                                }
                            </div>
                        }
                    </>
                    <div className={s.containerForEmail}>{userEmail}</div>
                    <div className={s.button}
                         onClick={onLogoutHandle}
                    >
                        <SuperButton icon="logout"
                                     iconWithText={true}
                                     style={{
                                         borderWidth: 0,
                                         boxShadow: "0 0 10px #889792",
                                         background: "white",
                                     }}
                        >Log out
                        </SuperButton>

                    </div>
                </div>
            </div>
        </div>
    )
}


