import { Navigate } from "react-router-dom";
import Registration from "m1-main/ui/pages/registration/Registration";
import LoginPage from "m1-main/ui/pages/login-page/LoginPage";
import PasswordRecoveryPage from "m1-main/ui/pages/pass-recovery/PasswordRecoveryPage";
import ChangePasswordPage from "m1-main/ui/pages/pass-recovery/ChangePasswordPage";
import { ProfilePage } from "m1-main/ui/pages/profile/ProfilePage";
import { PacksPage } from "m1-main/ui/pages/packs-pages/PacksPage";
import CardsPage from "m1-main/ui/pages/cards-pages/CardsPage";
import { LearnPage } from "m1-main/ui/pages/learn/LearnPage";
import RequireAuth from "m1-main/navigation/RequireAuth";
import Error404 from "m1-main/ui/pages/error-page/Error404";
import Layout from "m1-main/ui/common/layout/Layout";
import React from "react";

export const PATH = {
  REGISTRATION: "/registration",
  LOGIN: "/login",
  ERROR: "/404",
  BAD: "/*",
  EDIT_PROFILE: "/edit",
  START_PAGE: "/",
  PROFILE: "/profile",
  MAIN: "/main",
  TEST: "/test",
  CHANGE_PASSWORD: "/change-pass/:token",
  PASSWORD_RECOVERY: "/pass-recovery",
  CARDS: "/main/cards",
  CARD_ID: "/main/cards/:id",
  PACK: "/pack",
  PACK_ID: "/pack/:id",
  LEARN: "/learn",
  LEARN_ID: "/learn/:id",
};

export interface IRoute {
  path: string;
  component: JSX.Element;
}

export const routes: IRoute[] = [
  {
    path: PATH.START_PAGE,
    component: <Navigate to={PATH.MAIN} />,
  },
  {
    path: PATH.LOGIN,
    component: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: PATH.REGISTRATION,
    component: <Registration />,
  },
  {
    path: PATH.PASSWORD_RECOVERY,
    component: <PasswordRecoveryPage />,
  },
  {
    path: PATH.CHANGE_PASSWORD,
    component: <ChangePasswordPage />,
  },
  {
    path: PATH.ERROR,
    component: (
      <h2 style={{ textAlign: "center" }}>
        <Error404 />
      </h2>
    ),
  },
  {
    path: PATH.BAD,
    component: <Navigate to={PATH.ERROR} />,
  },

  //require auth below
  {
    path: PATH.PROFILE,
    component: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  {
    path: PATH.MAIN,
    component: (
      <RequireAuth>
        <PacksPage />
      </RequireAuth>
    ),
  },
  {
    path: PATH.PACK_ID,
    component: (
      <RequireAuth>
        <CardsPage />
      </RequireAuth>
    ),
  },
  {
    path: PATH.LEARN_ID,
    component: (
      <RequireAuth>
        <LearnPage />
      </RequireAuth>
    ),
  },
];
