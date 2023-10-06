import s from "./HeaderCards.module.css";
import React from "react";
import { CardsTablePropsType } from "../cards-table/CardsTable";
import { SortNameType, SortNumberType } from "../../../../dal/cards-api";
// import {CardsTablePropsType} from "./Cards/CardsTable";
// import {SortNameType, SortNumberType} from "../../../../m3-dal/cards-api";

export const HeaderCards = ({
  // getCards,
  packId,
  ...props
}: CardsTablePropsType) => {
  const sortCards = (sortNumber?: SortNumberType, sortName?: SortNameType) => {
    // if (packId) {
    //     getCards(packId, sortNumber, sortName)
    // }
  };

  return (
    <div className={s.wrapper_header}>
      <div className={s.wrapper_header_table}>
        <div className={s.header_tableItem}>
          Question
          <button className={s.button} onClick={() => sortCards(1, "question")}>
            <div className={s.triangle_up}></div>
          </button>
          <button className={s.button} onClick={() => sortCards(0, "question")}>
            <div className={s.triangle_down}></div>
          </button>
        </div>

        <div className={s.header_tableItem}>
          Answer
          <button className={s.button} onClick={() => sortCards(1, "answer")}>
            <div className={s.triangle_up}></div>
          </button>
          <button className={s.button} onClick={() => sortCards(0, "answer")}>
            <div className={s.triangle_down}></div>
          </button>
        </div>
        <div className={s.header_tableItem}>
          Updated
          <button className={s.button} onClick={() => sortCards(1, "updated")}>
            <div className={s.triangle_up}></div>
          </button>
          <button className={s.button} onClick={() => sortCards(0, "updated")}>
            <div className={s.triangle_down}></div>
          </button>
        </div>
        <div className={s.header_tableItem}>
          Grade
          <button className={s.button} onClick={() => sortCards(1, "grade")}>
            <div className={s.triangle_up}></div>
          </button>
          <button className={s.button} onClick={() => sortCards(0, "grade")}>
            <div className={s.triangle_down}></div>
          </button>
        </div>
        <div className={s.header_tableItem}>Actions</div>
      </div>
    </div>
  );
};
