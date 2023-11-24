import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./navigation.module.css";
import { useAppDispatch, useAppSelector } from "../bll/hooks";
import { PATH } from "m1-main/navigation/Paths";
import { logoutUserTC, selectAuth } from "../bll/authReducer";
import Waiting from "../ui/pages/error-page/Waiting";
import SuperButton from "../ui/common/button/SuperButton";
import { initialPacksState, setPacksDataTC } from "../bll/packsReducer";
import Popover from "../ui/common/popover/Popover";
import { RecordType } from "../ui/pages/cards-pages/CardsPage";
import { authSelector } from "m1-main/bll/selectors/auth-selectors";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { meStatus } = useAppSelector(selectAuth);

  const logOutHandler = () => {
    dispatch(setPacksDataTC({ params: initialPacksState })).then(() => {
      dispatch(logoutUserTC());
    });
  };
  const linkProfile = () => {
    navigate(PATH.PROFILE);
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
          {meStatus ? (
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
