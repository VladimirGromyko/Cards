import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../ui/pages/error-page/Error404";
import {PATH} from "./Paths";
// import MainPage from "../pages/MainPage/MainPage";
// import ChangePasswordPage from "../pages/p3-pass-recovery/ChangePasswordPage";
// import PasswordRecoveryPage from "../pages/p3-pass-recovery/PasswordRecoveryPage";
// import {EditProfilePage} from "../pages/MainPage/profile/EditProfilePage";
// import {PacksPage} from "../pages/MainPage/PackList/PacksPage";
// import CardsPage from '../pages/MainPage/PackList/Cards/CardsPage';
// import Registration from "../pages/p1-registration/Registration";
import LoginPage from "../ui/pages/login-page/LoginPage";
import {PacksPage} from "../ui/pages/packs-pages/PacksPage";
import Waiting from "../ui/pages/error-page/Waiting";
import Registration from "../ui/pages/registration/Registration";
import PasswordRecoveryPage from "../ui/pages/pass-recovery/PasswordRecoveryPage";
import ChangePasswordPage from "../ui/pages/pass-recovery/ChangePasswordPage";
import {ProfilePage} from "../ui/pages/profile/ProfilePage";
import CardsPage from "../ui/pages/cards-pages/CardsPage";
import {LearnPage} from "m1-main/ui/pages/learn/LearnPage";
// import {ProfilePacksPage} from "../pages/MainPage/PackList/ProfilePacksPage";
// import { LearnPage } from '../pages/learn/LearnPage';


const MainRoutes = () => {
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
                <Route path={PATH.CARDS} element={<CardsPage/>}/>
                <Route path={PATH.CARD_ID} element={<CardsPage/>}/>
                <Route path={PATH.LEARN} element={<LearnPage/>}/>
                <Route path={PATH.LEARN_PACK} element={<LearnPage/>}/>
                <Route path={PATH.WAITING} element={<Waiting />}/>
                <Route path={'/404'} element={<h2 style={{textAlign: "center"}}><Error404/></h2>}/>
                <Route path='*' element={<Navigate to={'/404'}/>}/>

            </Routes>

        </div>
    )
}

export default MainRoutes
