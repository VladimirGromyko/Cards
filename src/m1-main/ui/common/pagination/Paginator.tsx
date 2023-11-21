import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

export type PaginatorPropsType = {
  cardPacksTotalCount: number;
  pageCount: number;
  currentPage?: number;
  onPageChanged: (pageNumber: number) => void | undefined;
  portionSize?: number;
};

let paginatorSpan = (
  currentPage: number,
  selectedPage: number,
  onPageChanged: (page: number) => void
) => {
  return (
    <span
      className={cn(
        { [styles.selectedPage]: currentPage === selectedPage },
        styles.pageNumber
      )}
      key={selectedPage}
      onClick={(e) => onPageChanged(selectedPage)}
    >
      {selectedPage}
    </span>
  );
};
let Paginator = ({
  cardPacksTotalCount,
  pageCount,
  currentPage = 1,
  onPageChanged,
  portionSize = 10,
}: PaginatorPropsType) => {
  let pages: Array<number> = [];
  for (let i = 1; i <= Math.ceil(cardPacksTotalCount / portionSize); i++) {
    pages.push(i);
  }
  // const portionCount = useCallback(() => {
  //     return Math.ceil(cardPacksTotalCount / pageCount)
  // }, [cardPacksTotalCount, pageCount])
  const portionCount = Math.ceil(cardPacksTotalCount / pageCount);
  // useEffect(() => {
  //     portionCount = Math.ceil(cardPacksTotalCount / pageCount)
  // }, [cardPacksTotalCount, pageCount])
  let [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  const getRight = currentPage === portionCount;
  const getLeft = currentPage === 1;

  useEffect(() => {
    if (currentPage === portionCount) {
      setPortionNumber(Math.ceil(currentPage / portionSize));
    }
    if (currentPage === 1) {
      setPortionNumber(1);
    }
  }, [getRight, getLeft, portionSize]);

  // useEffect(() => {
  //     const prevPortionNumber = Math.ceil(currentPage / portionSize)
  //     currentPage !== portionCount && onPageChanged(leftPortionPageNumber)
  //     currentPage === portionCount && (prevPortionNumber !== portionNumber) && onPageChanged(leftPortionPageNumber)
  // }, [leftPortionPageNumber, portionNumber])

  const changePortion = (portion: number) => {
    setPortionNumber(portion);
    onPageChanged((portion - 1) * portionSize + 1);
  };

  return (
    <div className={styles.paginator}>
      {/*{portionNumber > 1 && <span onClick={() => setPortionNumber(portionNumber - 1)}*/}
      {portionNumber > 1 && (
        <span
          onClick={() => changePortion(portionNumber - 1)}
          className={styles.arrow}
        >
          {"<"}
        </span>
      )}
      {portionNumber > 1 && (
        <>
          {paginatorSpan(currentPage, 1, onPageChanged)}
          {"..."}
        </>
      )}

      {pages
        .filter(
          (p) =>
            p >= leftPortionPageNumber &&
            p <= rightPortionPageNumber &&
            p <= portionCount
        )
        .map((p) => paginatorSpan(currentPage, p, onPageChanged))}
      {portionCount > portionNumber * portionSize && (
        <>
          <>
            {"..."}
            {paginatorSpan(currentPage, portionCount, onPageChanged)}
          </>
          {/*<span onClick={() => setPortionNumber(portionNumber + 1)}*/}
          <span
            onClick={() => changePortion(portionNumber + 1)}
            className={styles.arrow}
          >
            {">"}
          </span>
        </>
      )}
    </div>
  );
};
export default Paginator;
