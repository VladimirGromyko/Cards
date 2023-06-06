import React, {ChangeEvent, useState} from "react";
import SuperButton from "m1-main/ui/common/button/SuperButton";
import Modal from "m1-main/ui/common/modal/Modal";
import SuperInputText from "m1-main/ui/common/input/SuperInputText";
import s from "./CardsModal.module.css";

export type NewCardType = {
    packId: string,
    quest: string,
    answer: string
}
type AddCardModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    packId: string | undefined
    addCard: (newCard: NewCardType) => void
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
export const AddCardModal = ({show, setShow , packId, addCard}: AddCardModalPropsType) => {
    const [quest, setQuest] = useState('')
    const [answer, setAnswer] = useState('')

    const onClickAddCards = () => {
        if (packId) {
            addCard({packId, quest, answer})
            // dispatch(addCardTC({packId, quest, answer}))
            setShow(false)
            setQuest('')
            setAnswer('')
        }
    }
    const onQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }
    const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <>
            <Modal width={500} height={400} show={show} enableBackground={true}
                   backgroundOnClick={() => setShow(false)}
                   modalStyle={modalStyle}
            >
                <div className={s.delHeader}>
                    <div>Add card</div>
                    <SuperButton icon="close" style={{borderWidth: 0}} onClick={() => setShow(false)}
                                 imgStyle={{width: "15px", height: "15px"}}
                    />
                </div>
                <div className={s.delPackBody}>
                    <div className={s.textField}>Question:</div>
                    <SuperInputText type='text' placeholder='Name Card' className={'inOneLine'} onChange={onQuestionInputChange}/>
                    <div className={s.textField}>Answer:</div>
                    <SuperInputText type='text' placeholder='Answer' className={'inOneLine'} onChange={onAnswerInputChange}/>
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
