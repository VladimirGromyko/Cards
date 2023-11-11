import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import CardsTable from "./cards-table/CardsTable";

import { useNavigate, useParams } from "react-router-dom";
import cs from "./CardsPage.module.css";
import useDebounce from "../../features/hooks/useDebounce";
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
import SuperInputText from "../../common/input/SuperInputText";
import Popover from "../../common/popover/Popover";
import Waiting from "m1-main/ui/pages/error-page/Waiting";
import {
  AddEditCardModal,
  NewCardType,
} from "m1-main/ui/pages/cards-pages/cards-modals/AddEditCardModal";

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
  const meStatus = useAppSelector((state) => state.auth.meStatusResponse);
  const sort = useAppSelector((state) => state.cards.sortCards);
  const cardsSet = useAppSelector((state) => state.cards.cardsSet);
  const packUserId = cardsSet.packUserId;

  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const packId = params.id ? params.id : "";
  debugger;

  const initialColumnHeadings: ColumnHeadingsType = [
    { headings: "Question", sortField: "question", arrow: "none" },
    { headings: "Answer", sortField: "none", arrow: "none" },
    { headings: "Last Updated", sortField: "updated", arrow: "none" },
    { headings: "Grade", sortField: "grade", arrow: "none" },
    { headings: "", sortField: "none", arrow: "none" },
  ];

  // if(meStatus === "work") {
  //     const getCards = async () => {
  //         await dispatch(setCardsTC({
  //             // cardAnswer: "",
  //             // cardQuestion: "",
  //             cardsPack_id: packId,
  //             // min: 3,
  //             // max: 5,
  //             // sortCards: "",
  //             // page: 1,
  //             pageCount: 1000,
  //         }))
  //
  //     }
  //     getCards()
  //         .then(() => {
  //             console.log(selectedCards)
  //         })
  // }

  useEffect(() => {
    // if (selectedCards.cards[0].cardsPack_id !== packId) {
    // console.log("packId :", packId)
    // dispatch(setCardsTC({
    //     // cardAnswer: "",
    //     // cardQuestion: "",
    //     cardsPack_id: packId,
    //     // min: 3,
    //     // max: 5,
    //     // sortCards: "",
    //     // page: 1,
    //     pageCount: 1000,
    // }))
    // }
  }, [packId]);
  // }, [packId, selectedCards.cards[0].cardsPack_id])

  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedValue = useDebounce(searchValue, 1500);

  useEffect(() => {
    if (debouncedValue) {
      setIsSearching(true);
      if (packId) {
        // dispatch(getCardsBySearchTC({packId, search: searchValue}))
      }
    } else {
      if (packId) {
        // dispatch(getCardsBySearchTC({packId, search: searchValue}))
      }
    }
  }, [debouncedValue]);

  // const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType, search?: string) => {
  // dispatch(getCardsTC({packId, sortNumber, sortName}))
  // }
  const returnBack = () => {
    dispatch(authActions.changeMeStatusResponse("done"));
    navigate(PATH.PACKS);
  };

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  const learnCards = () => {
    debugger;
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
      debugger;
      const params = { cardId, packId };
      dispatch(deleteCardTC(params));
    },
    [dispatch, deleteCardTC]
  );
  // }, [dispatch])
  //-------------

  // Block for Edit card

  const editCard = useCallback(
    (card: CardsType) => {
      debugger;
      dispatch(
        updateCardTC({
          cardsPack_id: packId,
          _id: card._id,
          question: card.question,
          answer: card.answer,
        })
      );
    },
    [dispatch]
  );
  //-------------

  const setSorting = async (sortField: string) => {
    debugger;
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
  const settingParameters = () => {};
  // const onSearchClick = () => {
  //     if (packId) {
  //         dispatch(getCardsBySearchTC({ packId, search: searchValue }))
  //     }

  // }
  const selectedRecord = async (element: RecordType) => {
    debugger;
    console.log(element.type);
    switch (element.type) {
      case "edit":
        // await dispatch(editPackTC({ params: { id: packId } }));
        break;
      case "delete":
        break;
      case "learn":
        break;
      default:
        break;
    }
    // if (element.type = 'delete') {
    //     try {
    //         await dispatch(deletePackTC( {params: {id: packId}}))
    //         returnBack()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // if (element.type = 'edit') {
    //     try {
    //         await dispatch(deletePackTC( {params: {id: packId}}))
    //         returnBack()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
  };
  return (
    <div className={cs.wrapper}>
      <Waiting />
      <div className={cs.TableWrapper}>
        <div className={cs.returnBack} onClick={returnBack}>
          <Svg width="30px" height="25px" />
          Back to Packs List
        </div>
        {/*<div className={cs.TableWrapper}>*/}
        {/*<div style={{width: '100%'}}>*/}
        {/*    {isLoading === "loading" && <div className={l.loader07}></div>}*/}
        {/*</div>*/}
        {/*<div style={{width: '1008px'}}>*/}
        <span className={cs.headerBlock}>
          <div className={cs.cardName}>
            <span className={cs.cardNameText}>{cardsSet.packName}</span>
            {/*<div className={cs.circle} onClick={settingParameters}>*/}
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
              <SuperInputText
                placeholder="Provide your text"
                onChange={onSearchHandler}
                value={searchValue}
              />
            </div>

            {/*<div className={packsStyle.search}>*/}
            {/*    <SuperInputText onChange={onSearchInputChange}*/}
            {/*                    placeholder='Enter cards name for searching'/>*/}
            {/*</div>*/}
            <div className={cs.tableBlock}>
              <div className={cs.wrapper_header}>
                <HeaderTable
                  columArr={initialColumnHeadings}
                  sorted={sort}
                  setSorting={setSorting}
                />
              </div>

              {/*<HeaderCards getCards={getCards} packId={packId}/>*/}
              <CardsTable
                cards={cardsSet.cards}
                packId={packId}
                userId={userId}
                deleteCard={deleteCard}
                editCard={editCard}
              />

              {/*</div>*/}
              {/*</div>*/}
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
                // onClick={() => setShow(true)}
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
