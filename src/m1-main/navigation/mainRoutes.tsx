import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "m1-main/navigation/Paths";
import { useAppSelector } from "m1-main/bll/hooks";
import { authThunks, selectAuth } from "m1-main/bll/authReducer";
import { useActions } from "m1-main/bll/utils/helpers";

const MainRoutes = () => {
  const { meStatus } = useAppSelector(selectAuth);
  const { getAuthUserTC } = useActions(authThunks);
  useEffect(() => {
    if (!meStatus) {
      getAuthUserTC({});
    }
  }, []);
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.component} key={route.path} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
