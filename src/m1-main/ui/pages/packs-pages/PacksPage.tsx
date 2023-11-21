import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cps from "./PacksPage.module.css";
import Waiting from "../error-page/Waiting";
import { addPacksTC, setPacksDataTC } from "m1-main/bll/packsReducer";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import { PacksTable } from "./paks-table/PacksTable";
import SearchBlock from "./search-block/SearchBlock";
import Paginator from "../../common/pagination/Paginator";
import { PackListSize } from "../../common/pack-list-size/PackListSize";
import ModalContainer from "../../common/modal/ModalContainer";
import { AddPackModal } from "./packs-modals/AddPackModal";
import { PATH } from "m1-main/navigation/Paths";
import { setCardsTC } from "m1-main/bll/cardsReducer";
import {
  HeaderTable,
  triangleViewType,
} from "../utils/header-table/HeaderTable";
import { SortPackNameType } from "m1-main/dal/packs-api";
import { authSelector } from "m1-main/bll/selectors/auth-selectors";
import { packsSelector } from "m1-main/bll/selectors/paks-selectors";

type HeadingsElementType = {
  headings: string;
  sortField: SortPackNameType;
  arrow: triangleViewType;
};
type ColumnHeadingsType = HeadingsElementType[];

export const PacksPage = () => {
  const packs = useAppSelector(packsSelector.packs);
  const sorted = useAppSelector(packsSelector.sorted);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(authSelector.isLoggedIn);

  const initialColumnHeadings: ColumnHeadingsType = [
    { headings: "Name", sortField: "name", arrow: "none" },
    { headings: "Cards", sortField: "cardsCount", arrow: "none" },
    { headings: "Last Updated", sortField: "updated", arrow: "none" },
    { headings: "Created by", sortField: "user_name", arrow: "none" },
    { headings: "Actions", sortField: "none", arrow: "none" },
  ];

  const portionSize = 10;

  let step = true;
  useEffect(() => {
    if (isLoggedIn === "done" && step) {
      step = false;
      const params = {};
      dispatch(setPacksDataTC({ params }));
    } else if (isLoggedIn === "error" || isLoggedIn === "logout") {
      step = true;
      alert("Waiting for the job was too long! Reauthorization required.");
      navigate(PATH.LOGIN);
    }
  }, [dispatch, isLoggedIn]);

  // Block for sorting
  const setSorting = async (sortField: string) => {
    debugger;
    await dispatch(setPacksDataTC({ params: { sortPacks: sortField } }));
  };

  // Block for Add pack
  const [showAddPacksModal, setShowAddPacksModal] = useState<boolean>(false);
  const addPack = useCallback(
    (pack: { name: string; privateStatus: boolean }) => {
      dispatch(
        addPacksTC({
          cardsPack: { name: pack.name, private: pack.privateStatus },
        })
      );
    },
    [dispatch]
  );
  //-------------

  // Block for view pack
  const viewPackList = useCallback(
    async (packId: string) => {
      await dispatch(
        setCardsTC({
          cardsPack_id: packId,
          sortCards: "0grade",
          pageCount: 1000,
        })
      );
      navigate(`${PATH.CARDS}/${packId}`);
    },
    [dispatch]
  );
  //-------------

  const learnPack = useCallback((packId: string) => {
    navigate(`${PATH.LEARN}/${packId}`);
  }, []);

  const onPageChanged = useCallback(
    (page: number) => {
      dispatch(setPacksDataTC({ params: { page } }));
    },
    [dispatch]
  );
  const changePackListSize = useCallback(
    (pageCount: number) => {
      dispatch(setPacksDataTC({ params: { pageCount } }));
    },
    [dispatch]
  );
  return (
    <div className={cps.wrapper}>
      <div className={cps.TableWrapper}>
        <Waiting />
        <span className={cps.content}>
          <span className={cps.headerBlock}>
            <h3>Packs list</h3>
            <ModalContainer
              title={"Add new pack"}
              buttonStyle={{
                color: "white",
                width: "20ch",
                fontWeight: "200",
                border: "none",
              }}
              show={showAddPacksModal}
              setShow={setShowAddPacksModal}
              modalStyle={{
                backgroundColor: "#FFFFFF",
                width: "395px",
                height: "auto",
                borderRadius: "2px",
              }}
            >
              <AddPackModal setShow={setShowAddPacksModal} addPack={addPack} />
            </ModalContainer>
          </span>
          <SearchBlock />

          <div className={cps.tableBlock}>
            <div className={cps.wrapper_header}>
              <HeaderTable
                sorted={sorted}
                columArr={initialColumnHeadings}
                setSorting={setSorting}
              />
            </div>
            {packs?.cardPacks?.length ? (
              <PacksTable
                learnPack={learnPack}
                viewPack={viewPackList}
                packs={packs}
              />
            ) : (
              <div style={{ height: "20px", backgroundColor: "#ffffff" }}></div>
            )}
            <div className={cps.paginationWrapper}>
              <Paginator
                cardPacksTotalCount={packs.cardPacksTotalCount}
                pageCount={packs.pageCount}
                currentPage={packs.page}
                onPageChanged={onPageChanged}
                portionSize={portionSize}
              />
              <PackListSize
                changePackListSize={changePackListSize}
                pageCount={packs.pageCount}
                currentPage={packs.page}
                onPageChanged={onPageChanged}
              />
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};
