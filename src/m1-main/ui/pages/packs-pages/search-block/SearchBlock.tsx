import React, { useCallback, useEffect, useState } from "react";
import cps from "../PacksPage.module.css";
import SuperButton from "../../../common/button/SuperButton";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import { setPacksDataTC } from "m1-main/bll/packsReducer";
import Slider from "../../../common/slider/Slider";
import Search from "m1-main/ui/common/search/Search";

const SearchBlock = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.meStatus?._id);
  const authorId = useAppSelector((state) => state.packs.packsData.authorId);
  const [isClearSearching, setClearSearching] = useState(false);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  useEffect(() => {
    setSelectedAll(!authorId);
  }, [authorId]);

  const onSetMyPressHandler = useCallback(() => {
    dispatch(setPacksDataTC({ params: { user_id: user_id } }));
    setSelectedAll(false);
  }, [dispatch, user_id]);

  const onSetAllPressHandler = useCallback(() => {
    dispatch(setPacksDataTC({ params: { user_id: "" } }));
    setSelectedAll(true);
  }, [dispatch]);
  const onResetPressHandler = useCallback(() => {
    dispatch(
      setPacksDataTC({
        params: { user_id: "", packName: "", min: 0, max: 100 },
      })
    );
    setSelectedAll(true);
    setClearSearching(true);
  }, [dispatch]);
  const allMyClickStyle = (style: string) => {
    return cps.allMyClick + " " + style;
  };
  const allMyStyle = (style: string) => {
    return cps.allMy + " " + style;
  };

  return (
    <div className={cps.inputPlusButton}>
      <div className={cps.searchCards}>
        <span className={cps.searchCardsHeader}>Search</span>
        <span className={cps.searchCardsHeader}>Show Packs cards</span>
        <span className={cps.searchCardsHeader}>Number of cards</span>
        <span></span>
        <Search
          placeholder="Enter cardPacks name for searching"
          searchPlace="packs"
          clear={isClearSearching}
          setClear={setClearSearching}
        />
        <div style={{ textAlign: "start" }} className={cps.contentAllMy}>
          <div className={cps.allMyWrapper}>
            <SuperButton
              className={
                !selectedAll
                  ? allMyClickStyle(cps.myClick)
                  : allMyStyle(cps.myClick)
              }
              onClick={onSetMyPressHandler}
            >
              My
            </SuperButton>
            <SuperButton
              className={
                selectedAll
                  ? allMyClickStyle(cps.allClick)
                  : allMyStyle(cps.allClick)
              }
              onClick={onSetAllPressHandler}
            >
              All
            </SuperButton>
          </div>
          <div style={{ color: "red" }}>
            {/*{errorResponse(errorRes, 'setPacks')}*/}
          </div>
        </div>
        <Slider />
        <div className={cps.reset}>
          <SuperButton
            onClick={onResetPressHandler}
            icon="reset-filters"
            style={{ borderWidth: 0, padding: 0 }}
          ></SuperButton>
        </div>
      </div>
    </div>
  );
};
export default SearchBlock;
