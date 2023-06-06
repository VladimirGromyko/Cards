import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
// import {addCardTC, editCardTC} from "../../n1-main/m2-bll/cardsReducer1";
// import SuperButton from "../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
// import SuperInputText from "../../n1-main/m1-ui/common/c2-SuperInput/SuperInputText";
// import {Modal} from "./Modal";

type EditCardModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    cardId: string
}

export const EditCardModal = ({show, setShow , cardId}: EditCardModalPropsType) => {
    const [quest, setQuest] = useState('')
    const dispatch = useDispatch()


    const onClickEditCards = () => {
        // dispatch(editCardTC(cardId, quest))
        setShow(false)
        setQuest('')
    }

    const onQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }

    return (
        <>
            {/*<SuperButton onClick={() => setShow(true)}>Edit</SuperButton>*/}
            {/*<Modal*/}
            {/*    enableBackground={true}*/}
            {/*    backgroundOnClick={() => setShow(false)}*/}
            {/*    width={400}*/}
            {/*    height={400}*/}
            {/*    show={show}*/}
            {/*>*/}
            {/*    <h2>Edit card</h2>*/}
            {/*    <div>New question:</div>*/}
            {/*    <div style={{margin:'10px'}}> <SuperInputText type='text' onChange={onQuestionInputChange}/></div>*/}

            {/*    <SuperButton onClick={onClickEditCards}>Save</SuperButton>*/}
            {/*    <SuperButton onClick={() => setShow(false)}>Close</SuperButton>*/}
            {/*</Modal>*/}
        </>
    );
};
