import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../ui/pages/errorPage/Error404";
import {PATH} from "./Paths";
// import MainPage from "../pages/MainPage/MainPage";
// import ChangePasswordPage from "../pages/p3-pass-recovery/ChangePasswordPage";
// import PasswordRecoveryPage from "../pages/p3-pass-recovery/PasswordRecoveryPage";
// import {EditProfilePage} from "../pages/MainPage/profile/EditProfilePage";
// import {PacksPage} from "../pages/MainPage/PackList/PacksPage";
// import CardsPage from '../pages/MainPage/PackList/Cards/CardsPage';
// import Registration from "../pages/p1-registration/Registration";
import LoginPage from "../ui/pages/loginPage/LoginPage";
import {PacksPage} from "../ui/pages/packsPage/PacksPage";
import Waiting from "../ui/pages/errorPage/Waiting";
import Registration from "../ui/pages/registration/Registration";
import PasswordRecoveryPage from "../ui/pages/passRecovery/PasswordRecoveryPage";
import ChangePasswordPage from "../ui/pages/passRecovery/ChangePasswordPage";
import {ProfilePage} from "../ui/pages/profile/ProfilePage";
// import {ProfilePacksPage} from "../pages/MainPage/PackList/ProfilePacksPage";
// import { LearnPage } from '../pages/learn/LearnPage';


const MainRoutes = () => {
    debugger
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION} element={<Registration/>}/>

                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
                {/*<Route path={PATH.EDIT_PROFILE} element={<h2 style={{textAlign: "center"}}><EditProfilePage/></h2>}/>*/}
                {/*<Route path={PATH.MAIN} element={<h2 style={{textAlign: "center"}}><MainPage/></h2>}/>*/}
                {/*<Route path={PATH.TEST} element={<h2 style={{textAlign: "center"}}><ProfilePacksPage/></h2>}/>*/}
                <Route path={PATH.CHANGE_PASSWORD} element={<ChangePasswordPage/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryPage/>}/>
                <Route path={PATH.PACKS} element={<PacksPage/>}/>
                {/*<Route path={PATH.CARDS} element={<h2 style={{textAlign: "center"}}><CardsPage/></h2>}/>*/}
                {/*<Route path={PATH.PACK_LIST_LEARN} element={<h2 style={{textAlign: "center"}}><LearnPage/></h2>}/>*/}
                <Route path={PATH.WAITING} element={<Waiting />}/>
                <Route path={'/404'} element={<h2 style={{textAlign: "center"}}><Error404/></h2>}/>
                <Route path='*' element={<Navigate to={'/404'}/>}/>

            </Routes>

        </div>
    )
}

export default MainRoutes
