import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import s from './navigation.module.css'
import {useAppDispatch, useAppSelector} from "../bll/hooks";
import {PATH} from "./Paths";
import {changeMeStatusResponse, logoutUserTC} from "../bll/authReducer";
import Waiting from "../ui/pages/errorPage/Waiting";
import SuperButton from "../ui/common/button/SuperButton";
// import {ProfilePage} from "../ui/pages/profile/ProfilePage";
// import { setPacksDataTC } from '../bll/packsReducer';

function Navigation() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.meStatusResponse);
    const [menuProfile, setMenuProfile] = useState<boolean>(false)
    // const packsData = useAppSelector((state) => state.packs.packsData);

    useEffect(()=>{
            switch (isLoggedIn) {
                case 'done':
                    debugger
                    navigate(PATH.PACKS)
                    // dispatch(setPacksDataTC({params: {packName: '', pageCount: 40}}))
                    break
                case 'error':
                case 'logout':
                    navigate(PATH.LOGIN)
                    break
                case 'progress':
                    navigate(PATH.REGISTRATION)
                    break
                case 'forgot':
                    navigate(PATH.PASSWORD_RECOVERY)
                    break
                case 'none':
                case 'work':
                    break
            }

    },[isLoggedIn])
    // },[navigate, isLoggedIn])
    const logOutHandler = () => {
        if (isLoggedIn === "done" || isLoggedIn === "work") {
            dispatch(logoutUserTC())
        }
    }
    const linkProfile = () => {
        if (isLoggedIn === 'done') {
            dispatch(changeMeStatusResponse('work'))
            navigate(PATH.PROFILE)
        }
    }
    const showMenu = `${s.profileMenuWrapper} ${menuProfile ? s.profileMenuShow : s.profileMenuHidden}`

    return (
        <div>
            <nav>
                <Waiting />
                <div className={s.menu}>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PROFILE} className={''}>ProfilePage</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={onPackListHandler()} className={''}>Pack list</NavLink>*/}
                    {/*    /!*<NavLink to={PATH.PACKS} className={''}>Pack list</NavLink>*!/*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={onProfileHandler()} className={''}>Profile</NavLink>*/}
                    {/*</li>*/}

                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.MAIN} className={''}>Main</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.LOGIN} className={''}>Login</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.CHANGE_PASSWORD} className={''}>Change Password</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PASSWORD_RECOVERY} className={''}>Password Recovery</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.REGISTRATION} className={''}>Registration</NavLink>*/}
                    {/*</li>*/}
                    {(isLoggedIn === "done" || isLoggedIn === "work")
                        ? <>
                            <div className={s.profile}
                                 // onPointerEnter={() => setMenuProfile(true)}
                                 onMouseOver={() => setMenuProfile(true)}
                                 onClick={() => setMenuProfile(!menuProfile)}
                                 onMouseLeave={() => setMenuProfile(false)}
                            >Menu profile
                                <div className={showMenu}>
                                    <div className={s.arrow}></div>
                                    <div className={s.profileMenu} onMouseLeave={() => setMenuProfile(false)}>
                                        <div className={s.profile_item} onClick={linkProfile}>Profile</div>
                                        <div className={s.profile_item} onClick={logOutHandler}>LogOut</div>
                                    </div>
                                </div>
                            </div>
                        </>

                        :
                        <SuperButton style={{
                            color: "white",
                            width: "100px",
                            fontWeight: "200",
                            border: "none",
                            height: "36px"
                        }}>Sign in</SuperButton>
                    }



                        {/*<NavLink to={PATH.LOGIN} className={''} onClick={logOutHandler}>LogOut</NavLink>*/}


                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PACKS} className={''}>Packs</NavLink>*/}
                    {/*</li>*/}
                </div>
            </nav>
        </div>
    )
}

export default Navigation
