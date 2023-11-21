import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./navigation.module.css";
import { useAppDispatch, useAppSelector } from "../bll/hooks";
import { PATH } from "./Paths";
import { authActions, logoutUserTC } from "../bll/authReducer";
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

  useEffect(() => {
    debugger;
    switch (isLoggedIn) {
      case "done":
        navigate(PATH.PACKS);
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
      case "work":
        break;
    }
  }, [isLoggedIn]);
  const logOutHandler = () => {
    if (isLoggedIn === "done" || isLoggedIn === "work") {
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
    if (element.type === "profile") linkProfile();
    if (element.type === "logout") logOutHandler();
  };

  return (
    <div>
      <nav>
        <Waiting />
        <div className={s.menu}>
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
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
