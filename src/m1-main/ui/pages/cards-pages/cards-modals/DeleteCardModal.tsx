import React from "react";
import SuperButton from "m1-main/ui/common/button/SuperButton";
import {CardsType} from "m1-main/dal/cards-api";
import {ActionPackCardType} from "m1-main/ui/pages/packs-pages/paks-table/PacksTable";
import s from "./CardsModal.module.css";

type DeleteCardModalPropsType = {
    setShow: (value:boolean)=>void
    card: CardsType
    deleteCard: (cardId: string | undefined) => void
    modalType: ActionPackCardType;
    setModalType: (value: ActionPackCardType) => void
}

export const DeleteCardModal = ({modalType, setModalType, setShow , card, deleteCard}: DeleteCardModalPropsType) => {
    const onClickDeleteCards = () => {
        deleteCard(card._id)
        setModalType("none")
        setShow(false)
    }
    const onClickCancel = () => {
        setShow(false);
        // setModalType("none")
    }
    if (modalType !== "delete") return (<></>)
    return (
        <>
            <div className={s.delHeader}>
                <div>Delete Card</div>
                <SuperButton icon="close"
                             style={{borderWidth: 0}}
                             onClick={() => setShow(false)}
                             imgStyle={{width: "15px", height: "15px"}}
                />
            </div>
            <div className={s.delPackBody}><span>Do you really want to remove card <b>{card.question}</b>?</span></div>
            <div className={s.delButtons}>
                <SuperButton onClick={() => setShow(false)}
                             dis={true}
                             style={{ width: "113px", height: "36px", fontWeight: "500", border: "none"}}
                >Cancel</SuperButton>
                <SuperButton onClick={onClickDeleteCards}
                                 red={true}
                                 style={{
                                     width: "113px",
                                     height: "36px",
                                     fontWeight: "500",
                                     border: "none",
                                     color: "rgb(255, 255, 255)",
                                     borderRadius: "36px"
                                 }}
                >Delete</SuperButton>
            </div>
        </>
    );
};
