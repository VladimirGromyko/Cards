import React, { useState } from "react";
import cardsStyle from "./CardsTable.module.css";
import { CardsType } from "m1-main/dal/cards-api";
import { CardItem } from "./CardItem";
import { ActionPackCardType } from "m1-main/ui/pages/packs-pages/paks-table/PacksTable";
import Modal from "m1-main/ui/common/modal/Modal";
import { DeleteCardModal } from "./../cards-modals/DeleteCardModal";
import { AddEditCardModal } from "m1-main/ui/pages/cards-pages/cards-modals/AddEditCardModal";

export type CardsTablePropsType = {
  cards: CardsType[];
  packId: string | undefined;
  userId: string | undefined;
  deleteCard: (cardId: string | undefined) => void;
  editCard: (card: CardsType) => void;
};

const CardsTable = ({
  cards,
  packId,
  userId,
  deleteCard,
  editCard,
  ...props
}: CardsTablePropsType) => {
  const initialCurrentCard: CardsType = {
    cardsPack_id: "",
    __v: null,
    question: "",
    answer: "",
    grade: null,
  };
  const [modalType, setModalType] = useState<ActionPackCardType>("none");
  const [currentCard, setCurrentCard] = useState<CardsType>(initialCurrentCard);
  const [show, setShow] = useState(false);

  // const getCards = useCallback((sortNumber?:SortNumberType, sortName?: SortNameType) => {
  //     if (packId) {
  //         props.getCards(packId, sortNumber, sortName)
  //     }
  // }, [packId, props])

  const selectedCardAction = (card: CardsType, type: ActionPackCardType) => {
    debugger;
    setModalType(type);
    if (type !== "none") {
      setShow(true);
      setCurrentCard(card);
    }
  };
  const backgroundOnClick = () => {
    setShow(false);
    setModalType("none");
  };

  return (
    <div className={cardsStyle.container}>
      {cards.map((card) => {
        return (
          <CardItem
            card={card}
            isMine={card.user_id === userId}
            selectedCardAction={selectedCardAction}
            key={card._id}
          />
        );
      })}
      <Modal
        width={500}
        height={300}
        show={show}
        enableBackground={true}
        backgroundOnClick={backgroundOnClick}
        modalStyle={{
          backgroundColor: "#FFFFFF",
          width: "395px",
          height: "auto",
          borderRadius: "2px",
        }}
      >
        <>
          <DeleteCardModal
            deleteCard={deleteCard}
            card={currentCard}
            setShow={setShow}
            setModalType={setModalType}
            modalType={modalType}
          />
          <AddEditCardModal
            show={show}
            setShow={setShow}
            packId={packId}
            editCard={editCard}
            card={currentCard}
            modalType={modalType}
            setModalType={setModalType}
          />
        </>
      </Modal>
    </div>
  );
};

export default CardsTable;
