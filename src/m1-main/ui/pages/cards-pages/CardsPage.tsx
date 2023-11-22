import React, { useCallback, useEffect, useState } from "react";

import CardsTable from "./cards-table/CardsTable";

import { useNavigate, useParams } from "react-router-dom";
import cs from "./CardsPage.module.css";
import { authActions } from "m1-main/bll/authReducer";
import { PATH } from "m1-main/navigation/Paths";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";

import { ReactComponent as Svg } from "./../utils/direction-arrow-left.svg";
import SuperButton from "../../common/button/SuperButton";
import {
  addCardTC,
  deleteCardTC,
  setCardsTC,
  updateCardTC,
} from "m1-main/bll/cardsReducer";
import { CardsType, SortCardsHeaderType } from "m1-main/dal/cards-api";
import {
  HeaderTable,
  triangleViewType,
} from "../utils/header-table/HeaderTable";
import Popover from "../../common/popover/Popover";
import Waiting from "m1-main/ui/pages/error-page/Waiting";
import {
  AddEditCardModal,
  NewCardType,
} from "m1-main/ui/pages/cards-pages/cards-modals/AddEditCardModal";
import { setPacksModal } from "m1-main/bll/packsModalReducer";
import { TablePacksModal } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";
import { packsSelector } from "m1-main/bll/selectors/paks-selectors";
import Search from "m1-main/ui/common/search/Search";

type HeadingsElementType = {
  headings: string;
  sortField: SortCardsHeaderType;
  arrow: triangleViewType;
};
type ColumnHeadingsType = HeadingsElementType[];
export type RecordType = {
  name: "Edit" | "Delete" | "Learn" | "Login" | "LogOut" | "Profile";
  type: "edit" | "delete" | "learn" | "profile" | "logout";
};
const buttonStyle = {
  color: "white",
  width: "20ch",
  fontWeight: "200",
  border: "none",
};
const records: RecordType[] = [
  { name: "Edit", type: "edit" },
  { name: "Delete", type: "delete" },
  { name: "Learn", type: "learn" },
];
const CardsPage = () => {
  const userId = useAppSelector((state) => state.auth.meStatus?._id);
  const sort = useAppSelector((state) => state.cards.sortCards);
  const cardsSet = useAppSelector((state) => state.cards.cardsSet);
  const packUserId = cardsSet.packUserId;
  const modal = useAppSelector((state) => {
    return state.packsModal;
  });
  const packs = useAppSelector(packsSelector.packs);

  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const packId = params.id ? params.id : "";

  const initialColumnHeadings: ColumnHeadingsType = [
    { headings: "Question", sortField: "question", arrow: "none" },
    { headings: "Answer", sortField: "none", arrow: "none" },
    { headings: "Last Updated", sortField: "updated", arrow: "none" },
    { headings: "Grade", sortField: "grade", arrow: "none" },
    { headings: "", sortField: "none", arrow: "none" },
  ];
  const returnBack = useCallback(() => {
    dispatch(authActions.changeMeStatusResponse("done"));
    navigate(PATH.PACKS);
  }, [dispatch, navigate]);

  useEffect(() => {
    const getCards = async () => {
      dispatch(
        setCardsTC({
          cardsPack_id: packId,
          pageCount: 1000,
        })
      );
    };
    getCards().then(() => {
      dispatch(
        setPacksModal({
          currentPack: {
            _id: packId,
            name: cardsSet.packName,
            status: cardsSet.packPrivate,
          },
          modalAction: "none",
          showModal: false,
        })
      );
    });
  }, [packId, dispatch, cardsSet.packName, cardsSet.packPrivate]);
  useEffect(() => {
    if (packs?.cardPacks?.length) {
      const currentPack = packs.cardPacks.filter((el) => el._id === packId);
      if (!currentPack.length) {
        returnBack();
      }
    }
  }, [packs, packId, returnBack]);

  const learnCards = () => {
    navigate(`${PATH.LEARN}/${packId}`);
  };

  // Block for Add card
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const addCard = useCallback(
    (newCard: NewCardType) => {
      dispatch(
        addCardTC({
          cardsPack_id: newCard.packId,
          question: newCard.question,
          answer: newCard.answer,
        })
      );
    },
    [dispatch]
  );
  //-------------

  // Block for Delete card
  const deleteCard = useCallback(
    (cardId: string | undefined) => {
      const params = { cardId, packId };
      dispatch(deleteCardTC(params));
    },
    [dispatch, packId]
  );
  // }, [dispatch])
  //-------------

  // Block for Edit card

  const editCard = useCallback(
    (card: CardsType) => {
      dispatch(
        updateCardTC({
          cardsPack_id: packId,
          _id: card._id,
          question: card.question,
          answer: card.answer,
        })
      );
    },
    [dispatch, packId]
  );
  //-------------

  const setSorting = async (sortField: string) => {
    await dispatch(
      setCardsTC({
        cardsPack_id: packId,
        sortCards: sortField,
        min: 1,
        max: 100,
        page: 1,
      })
    );
  };

  const selectedRecord = (element: RecordType) => {
    switch (element.type) {
      case "edit":
      case "delete":
        dispatch(
          setPacksModal({
            currentPack: {
              _id: packId,
              name: cardsSet.packName,
              status: cardsSet.packPrivate,
            },
            modalAction: element.type,
            showModal: true,
          })
        );
        break;
      case "learn":
        navigate(`${PATH.LEARN}/${packId}`);
        break;
      default:
        break;
    }
  };
  return (
    <div className={cs.wrapper}>
      <Waiting />
      {modal && <TablePacksModal />}
      <div className={cs.TableWrapper}>
        <div className={cs.returnBack} onClick={returnBack}>
          <Svg width="30px" height="25px" />
          Back to Packs List
        </div>
        <span className={cs.headerBlock}>
          <div className={cs.cardName}>
            <span className={cs.cardNameText}>{cardsSet.packName}</span>
            {userId === packUserId ? (
              <Popover
                records={records}
                selectedRecord={selectedRecord}
                outStyle={{ width: "20px", height: "20px" }}
              >
                <div className={cs.circle}>
                  <div className={cs.pointBlock}>
                    <div className={cs.point}></div>
                    <div className={cs.point}></div>
                    <div className={cs.point}></div>
                  </div>
                </div>
              </Popover>
            ) : (
              <></>
            )}
          </div>

          {userId !== packUserId && cardsSet.cards.length ? (
            <SuperButton onClick={learnCards} style={buttonStyle}>
              Learn to pack
            </SuperButton>
          ) : userId === packUserId && cardsSet.cards.length ? (
            <SuperButton
              onClick={() => setShowAddCardModal(true)}
              style={buttonStyle}
            >
              Add new card
            </SuperButton>
          ) : (
            <></>
          )}
        </span>
        {cardsSet.cards.length ? (
          <>
            <div className={cs.search}>
              <span className={cs.searchCardsHeader}>Search</span>
              <Search
                placeholder="Provide your text"
                searchPlace="cards"
                id={packId}
              />
            </div>
            <div className={cs.tableBlock}>
              <div className={cs.wrapper_header}>
                <HeaderTable
                  columArr={initialColumnHeadings}
                  sorted={sort}
                  setSorting={setSorting}
                />
              </div>
              <CardsTable
                cards={cardsSet.cards}
                packId={packId}
                userId={userId}
                deleteCard={deleteCard}
                editCard={editCard}
              />
            </div>
          </>
        ) : (
          <div className={cs.emptyBody}>
            <div className={cs.emptyBodyText}>
              {`This pack is empty.${
                userId === packUserId
                  ? " Click add new card to fill this pack"
                  : ""
              }`}
            </div>
            {userId === packUserId ? (
              <SuperButton
                onClick={() => setShowAddCardModal(true)}
                style={buttonStyle}
              >
                Add new card
              </SuperButton>
            ) : (
              <></>
            )}
          </div>
        )}
        <AddEditCardModal
          show={showAddCardModal}
          setShow={setShowAddCardModal}
          packId={packId}
          addCard={addCard}
        />
      </div>
    </div>
  );
};

export default CardsPage;
