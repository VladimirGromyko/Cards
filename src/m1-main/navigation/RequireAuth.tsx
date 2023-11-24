import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "m1-main/bll/hooks";
import { selectAuth } from "m1-main/bll/authReducer";
import { PATH } from "./Paths";
import Layout from "m1-main/ui/common/layout/Layout";

type RequireAuthType = {
  children: ReactNode;
};
const RequireAuth: React.FC<RequireAuthType> = ({ children }) => {
  const { meStatus } = useAppSelector(selectAuth);
  debugger;
  if (!meStatus) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return <Layout>{children}</Layout>;
};

export default RequireAuth;
