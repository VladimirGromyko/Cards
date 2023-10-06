import React from "react";
import l from "../../common/loading/loader07.module.css";
import { useAppSelector } from "../../../bll/hooks";

const Waiting = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  return <>{isLoading === "loading" && <div className={l.loader07}></div>}</>;
};
export default Waiting;
