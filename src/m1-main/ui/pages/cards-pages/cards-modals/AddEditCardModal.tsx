import React, {ChangeEvent, useState} from "react";
import SuperButton from "m1-main/ui/common/button/SuperButton";
import Modal from "m1-main/ui/common/modal/Modal";
import SuperInputText from "m1-main/ui/common/input/SuperInputText";
import s from "./CardsModal.module.css";
import {CardsType} from "m1-main/dal/cards-api";
import {ActionPackCardType} from "m1-main/ui/pages/packs-pages/paks-table/PacksTable";

export type NewCardType = {
    packId: string,
    question: string,
    answer: string
}
type AddEditCardModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    packId: string | undefined
    addCard?: (newCard: NewCardType) => void
    editCard?: (card: CardsType) => void
    card?: CardsType
    modalType?: ActionPackCardType;
    setModalType?: (value: ActionPackCardType) => void
}
const modalStyle = {
    backgroundColor: '#FFFFFF',
    width: '395px',
    height: 'auto',
    borderRadius: '2px'
}
const buttonStyle = {
    color: "white",
    width: "12ch",
    fontWeight: "500",
    border: "none",
    background: "#678EFE"
}
export const AddEditCardModal = ({ show, setShow , packId,
                                   addCard, editCard, card,
                                   modalType, setModalType }: AddEditCardModalPropsType) => {
    const [question, setQuestion] = useState(card ? card.question : '')
    const [answer, setAnswer] = useState(card ? card.answer : '')

    const onClickAddCards = () => {
        if (packId) {
            if (addCard) addCard({packId, question, answer})
            if (editCard) {
                setModalType && setModalType("none")
                editCard({_id: card?._id, question, answer})
            }
            setShow(false)
            setQuestion('')
            setAnswer('')
        }
    }
    if (modalType && modalType !== "edit") return (<></>)
    return (
        <>
            <Modal width={500} height={400} show={show} enableBackground={true}
                   backgroundOnClick={() => setShow(false)}
                   modalStyle={modalStyle}
            >
                <div className={s.delHeader}>
                    <div>{card ? `Edit card - ${card.question}` : 'Add card'}</div>
                    <SuperButton icon="close" style={{borderWidth: 0}} onClick={() => setShow(false)}
                                 imgStyle={{width: "15px", height: "15px"}}
                    />
                </div>
                <div className={s.delPackBody}>
                    <div className={s.textField}>Question:</div>
                    <SuperInputText type='text' placeholder='Name Card' className={'inOneLine'}
                                    onChangeText={setQuestion}
                                    value={question}
                    />
                    <div className={s.textField}>Answer:</div>
                    <SuperInputText type='text' placeholder='Answer' className={'inOneLine'}
                                    onChangeText={setAnswer}
                                    value={answer}/>
                </div>
                <div className={s.buttonsBlock}>
                    <SuperButton onClick={() => setShow(false)} dis={true}
                                 style={{width: "12ch", fontWeight: "500", border: "none",}}
                    >Cancel
                    </SuperButton>
                    <SuperButton onClick={onClickAddCards} dis={true} style={buttonStyle}>Save</SuperButton>
                </div>
            </Modal>
        </>
    );
};
