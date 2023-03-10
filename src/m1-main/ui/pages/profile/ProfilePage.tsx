import React, {MouseEventHandler, MutableRefObject, useEffect, useRef, useState} from 'react'
import s from './Profile.module.css';


// import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
// import SuperButton from "../../../common/c1-SuperButton/SuperButton";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../../../m2-bll/store";
// import {changeUserNameTC} from "../../../../m2-bll/auth-reducer";
// import {Navigate, useNavigate} from 'react-router-dom';
// import {PATH} from "../../../routes/Paths";
import { ReactComponent as Svg} from "./../utils/direction-arrow-left.svg";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../navigation/Paths";
import {changeMeStatusResponse, updateUserProfileTC} from "../../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import SuperInputText from "../../common/input/SuperInputText";
import SuperButton from "../../common/button/SuperButton";

export const ProfilePage = () => {
    // debugger
    const userName = useAppSelector((state) => state.auth.meStatus?.name)
    const userEmail = useAppSelector((state) => state.auth.meStatus?.email)
    // const userEmail = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.email)
    // const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate(PATH.LOGIN)
    //     }
    //             else return
    // }, [])

    const [nameFromInput, setNameFromInput] = useState<string | undefined>(userName)
    const [fieldValue, setFieldValue] = useState<boolean>(false)
    const [viewEdit, setViewEdit] = useState<boolean>(false)

    // const onChangeNameHandler = () => {
    //     dispatch(changeUserNameTC(nameFromInput))
    // }

    useEffect(() => {
        userName && setNameFromInput(userName)

    }, [userName])
    const returnBack = () => {
        dispatch(changeMeStatusResponse('done'))
        navigate(PATH.PACKS)
    }
    const onOutClick = (e: React.SyntheticEvent<EventTarget>) => {
        const target =  (e.target as HTMLElement).className
        const isContentButton = target.indexOf("SuperButton_icon")
        const isContentInput = target.indexOf("SuperInputText")
        if (isContentButton < 0 && isContentInput < 0) {
            setFieldValue(false)
            setViewEdit(false)
        }
    }
    const changeValueClick = (e: React.SyntheticEvent<EventTarget>) => {
        setFieldValue(true)
    }
    const saveName = () => {
        dispatch(updateUserProfileTC({name: nameFromInput, avatar:"https://www.meme-arsenal.com/memes/8d5e37167343dd477fde3ba2e59f9dee.jpg"}))
    }

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
                                <div className={s.textField}>
                                    <SuperInputText
                                        value={nameFromInput}
                                        onChangeText={setNameFromInput}
                                        style={{maxWidth:'40%'}}
                                        className={s.editValue}
                                        // id={'t2'}
                                    />
                                    <SuperButton
                                        style={{borderWidth: 0}}
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
                                <span className={s.showValue}>{nameFromInput}</span>
                                {viewEdit &&
                                    <div className={s.edit}>
                                        <SuperButton
                                            onClick={changeValueClick}
                                            icon="edit"
                                            style={{borderWidth: 0}}
                                        />
                                    </div>

                                }

                            </div>
                        }
                    </>
                    <div className={s.containerForEmail}>
                        {/*<span className={s.textField}>Email</span>*/}
                        {/*<span className={s.showValue}>*/}
                            {userEmail}
                        {/*</span>*/}
                    </div>
                    {/*<div className={s.button}><SuperButton onClick={onChangeNameHandler}>SAVE</SuperButton></div>*/}
                </div>
            </div>
        </div>
    )
}


