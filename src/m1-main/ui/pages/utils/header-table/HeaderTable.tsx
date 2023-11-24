import s from "./HeaderTable.module.css";
import React, { useState } from "react";
import SuperSorting from "../../../common/sorting/SuperSorting";

export type triangleViewType = "none" | "down" | "up";

type HeadingsElementType = {
  headings: string;
  sortField: string;
  arrow: triangleViewType;
};
type ColumnHeadingsType = {
  columArr: HeadingsElementType[];
  sorted: string | undefined;
  setSorting: (sortField: string) => void;
};
export const HeaderTable = ({
  columArr,
  sorted,
  setSorting,
}: ColumnHeadingsType) => {
  const [isSorting, setIsSorting] = useState(false);
  const [columnHeadings, setColumnHeadings] =
    useState<HeadingsElementType[]>(columArr);
  const mainSorting = async (sortName: string) => {
    if (sortName !== "none") {
      const sortField = isSorting ? `1${sortName}` : `0${sortName}`;
      setIsSorting(!isSorting);
      await setSorting(sortField);
      sortingOver("", sortName);
    }
  };
  const checkArrow = (sortName: string, event: "click" | "mouse") => {
    let arrow: triangleViewType = "down";
    if (sorted?.includes(sortName) && sorted.includes("0")) {
      arrow = event === "mouse" ? "up" : "down";
    } else if (sorted?.includes(sortName) && sorted.includes("1")) {
      arrow = event === "click" ? "up" : "down";
    }
    return arrow;
  };
  const sortingOver = (
    e: React.MouseEvent<HTMLDivElement> | string,
    sortName: string
  ) => {
    let arrow: triangleViewType = "none";
    if (typeof e === "string" || e.type === "mouseover") {
      const event = typeof e === "string" ? "click" : "mouse";
      arrow = checkArrow(sortName, event);
    }
    if (sortName !== "none") {
      const newColumnHeadings = columnHeadings.map((el) => {
        if (el.sortField === sortName) {
          el.arrow = arrow;
        }
        return el;
      });
      setColumnHeadings(newColumnHeadings);
    }
  };
  return (
    <>
      {columnHeadings.map((el, index) => {
        return (
          <div
            className={s.header_tableItem}
            onMouseOver={(e) => sortingOver(e, el.sortField)}
            onMouseLeave={(e) => sortingOver(e, el.sortField)}
            key={el.sortField + index}
          >
            {el.headings}
            <SuperSorting
              sort={sorted}
              sorting={el.sortField}
              show={el.arrow}
              handleClick={() => mainSorting(el.sortField)}
            />
          </div>
        );
      })}
    </>
  );
};
