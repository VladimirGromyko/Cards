import { useEffect } from "react";
import Navigation from "./m1-main/navigation/Navigation";
import { getAuthUserTC } from "./m1-main/bll/authReducer";
import { useAppDispatch, useAppSelector } from "./m1-main/bll/hooks";
import { useLocation } from "react-router-dom";
import MainRoutes from "./m1-main/navigation/mainRoutes";

const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => {
    return state.auth.meStatusResponse;
  });
  const passwordStatus = useAppSelector(
    (state) => state.register.passwordStatus
  );
  const isChangePass = useLocation().pathname.indexOf("change-pass");

  useEffect(() => {
    if (
      isLoggedIn === "none" &&
      isChangePass === -1 &&
      passwordStatus === "none"
    ) {
      dispatch(getAuthUserTC());
    }
  }, [isLoggedIn]);
  // },[dispatch, isLoggedIn, isChangePass, passwordStatus])

  return (
    <>
      <Navigation />
      <MainRoutes />
    </>
  );
};
export default Main;
