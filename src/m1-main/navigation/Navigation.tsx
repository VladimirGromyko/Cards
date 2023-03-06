import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import s from './navigation.module.css'
import {useAppDispatch, useAppSelector} from "../bll/hooks";
import {PATH} from "./Paths";
import {logoutUserTC} from "../bll/authReducer";
import Waiting from "../ui/pages/errorPage/Waiting";

function Navigation() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.meStatusResponse);
    const passwordStatus = useAppSelector((state) => state.register.passwordStatus);

    useEffect(()=>{
        debugger
        // if (passwordStatus !== 'succeeded') {
            switch (isLoggedIn) {
                case 'done':
                    navigate(PATH.PACKS)
                    break
                case 'error':
                case 'logout':
                    navigate(PATH.LOGIN)
                    break
                case 'none':
                    // navigate(PATH.WAITING)
                    break
                case 'progress':
                    navigate(PATH.REGISTRATION)
                    break
                case 'forgot':
                    navigate(PATH.PASSWORD_RECOVERY)
                    break
            }
        // }

    },[navigate, isLoggedIn])
    const logOutHandler = () => {
        debugger
        if (isLoggedIn === 'done') {
            dispatch(logoutUserTC())
        }
    }

    // const onPackListHandler = () => {
    //     if (!isLoggedIn) {
    //         return PATH.LOGIN
    //     } else return PATH.PACKS
    // }
    // const onProfileHandler = () => {
    //     if (!isLoggedIn) {
    //         return PATH.LOGIN
    //     } else return PATH.PROFILE
    // }
    return (
        <div>
            <nav>
                <Waiting />
                <ul className={s.menu}>
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
                    <li className={``} style={{cursor: 'pointer'}} onClick={logOutHandler}>LogOut
                        {/*<NavLink to={PATH.LOGIN} className={''} onClick={logOutHandler}>LogOut</NavLink>*/}
                    </li>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PACKS} className={''}>Packs</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </div>
    )
}

export default Navigation
