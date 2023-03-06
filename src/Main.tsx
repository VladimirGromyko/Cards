// import MainRoutes from "./routes/mainRoutes";
// import Header from "./header/Header";
import {useEffect} from "react";
import Navigation from "./m1-main/navigation/Navigation";
import {getAuthUserTC} from "./m1-main/bll/authReducer";
import {useAppDispatch, useAppSelector} from "./m1-main/bll/hooks";
import MainRoutes from "./m1-main/navigation/mainRoutes";
import {PATH} from "./m1-main/navigation/Paths";
import {useLocation, useParams} from "react-router-dom";
// import {initializeMainTC} from "../m2-bll/loginReducer";

const Main = () => {
    debugger
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.meStatusResponse);
    const passwordStatus = useAppSelector((state) => state.register.passwordStatus);
    const isChangePass = useLocation().pathname.indexOf("change-pass")

    useEffect(()=>{
    if (isLoggedIn === 'none' && isChangePass === -1 && passwordStatus === 'none') {
        dispatch(getAuthUserTC())
    }
        // dispatch(initializeMainTC())
    },[dispatch, isLoggedIn, isChangePass])

  return <>
      <Navigation />
      <MainRoutes />
  </>
}
export default Main
