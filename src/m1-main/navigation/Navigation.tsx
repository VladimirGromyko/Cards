import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./navigation.module.css";
import { useAppDispatch, useAppSelector } from "../bll/hooks";
import { PATH } from "./Paths";
import { authActions, getAuthUserTC, logoutUserTC } from "../bll/authReducer";
import Waiting from "../ui/pages/error-page/Waiting";
import SuperButton from "../ui/common/button/SuperButton";
import { initialPacksState, setPacksDataTC } from "../bll/packsReducer";
import Popover from "../ui/common/popover/Popover";
import { RecordType } from "../ui/pages/cards-pages/CardsPage";
import { authSelector } from "m1-main/bll/selectors/auth-selectors";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(authSelector.isLoggedIn);
  const [menuProfile, setMenuProfile] = useState<boolean>(false);

  useEffect(() => {
    debugger;
    switch (isLoggedIn) {
      case "done":
        navigate(PATH.PACKS);
        // dispatch(setPacksDataTC({params: {packName: '', pageCount: 40}}))
        break;
      case "error":
      case "logout":
        navigate(PATH.LOGIN);
        break;
      case "progress":
        navigate(PATH.REGISTRATION);
        break;
      case "forgot":
        navigate(PATH.PASSWORD_RECOVERY);
        break;
      case "none":
        // dispatch(getAuthUserTC())
        break;
      case "work":
        break;
    }
  }, [isLoggedIn]);
  // },[navigate, isLoggedIn])
  const logOutHandler = () => {
    if (isLoggedIn === "done" || isLoggedIn === "work") {
      debugger;
      dispatch(setPacksDataTC({ params: initialPacksState })).then(() => {
        dispatch(logoutUserTC());
      });
    }
  };
  const linkProfile = () => {
    if (isLoggedIn === "done") {
      dispatch(authActions.changeMeStatusResponse("work"));
      navigate(PATH.PROFILE);
    }
  };
  const selectedRecord = (element: RecordType) => {
    debugger;
    console.log(element.type);
    if (element.type === "profile") linkProfile();
    if (element.type === "logout") logOutHandler();
  };
  const showMenu = `${s.profileMenuWrapper} ${
    menuProfile ? s.profileMenuShow : s.profileMenuHidden
  }`;

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
          {isLoggedIn === "done" || isLoggedIn === "work" ? (
            <>
              <Popover
                records={[
                  { name: "Profile", type: "profile" },
                  { name: "LogOut", type: "logout" },
                ]}
                selectedRecord={selectedRecord}
              >
                Menu profile
              </Popover>

              {/*<div className={s.profile}*/}
              {/*     onMouseOver={() => setMenuProfile(true)}*/}
              {/*     onMouseLeave={() => setMenuProfile(false)}*/}
              {/*>Menu profile*/}
              {/*    <div className={showMenu}>*/}
              {/*        <div className={s.arrow}></div>*/}
              {/*        <div className={s.profileMenu} onMouseLeave={() => setMenuProfile(false)}>*/}
              {/*            <div className={s.profile_item} onClick={linkProfile}>Profile</div>*/}
              {/*            <div className={s.profile_item} onClick={logOutHandler}>LogOut</div>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
            </>
          ) : (
            <SuperButton
              style={{
                color: "white",
                width: "100px",
                fontWeight: "200",
                border: "none",
                height: "36px",
              }}
            >
              Sign in
            </SuperButton>
          )}

          {/*<NavLink to={PATH.LOGIN} className={''} onClick={logOutHandler}>LogOut</NavLink>*/}

          {/*<li className={``}>*/}
          {/*    <NavLink to={PATH.PACKS} className={''}>Packs</NavLink>*/}
          {/*</li>*/}
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
