import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import SuperButton from "../../../common/button/SuperButton";
import SuperInputText from "../../../common/input/SuperInputText";
import s from "./PacksModal.module.css";
import SuperCheckbox from "../../../common/сheckbox/SuperCheckbox";

// import {addCardTC} from "../../n1-main/m2-bll/cardsReducer1";
// import SuperButton from "../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
// import SuperInputText from "../../n1-main/m1-ui/common/c2-SuperInput/SuperInputText";
// import {Modal} from "./Modal";

type AddPackModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    packId: string | undefined
    addPack: (pack: {name: string, privateStatus: boolean}) => void
}

export const AddPackModal = ({packId, show, setShow, addPack}: AddPackModalPropsType) => {
// export const AddCardModal = ({show, setShow , packId}: AddCardModalPropsType) => {
    const [name, setPackName] = useState('')
    const [privateStatus, setPrivate] = useState<boolean>(false)
    // const [answer, setAnswer] = useState('')
    // const dispatch = useDispatch()


    const onClickAddCards = () => {
        debugger
        console.log(name)
        if (packId) {
            // dispatch(addCardTC({packId, quest, answer}))
            setShow(false)
            addPack({name, privateStatus})
            // setQuest('')
            // setAnswer('')
        }
    }

    const onInputName = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        setPackName(e.currentTarget.value)
    }
    const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setAnswer(e.currentTarget.value)
    }

    return (
        <>
                <h2>Add new pack</h2>
                <div className={s.textField}>Name pack</div>
                <div style={{margin:'10px'}}> <SuperInputText type='text' onChange={onInputName}/></div>
                <div className={s.textField}>
                    <SuperCheckbox onChangeChecked={setPrivate}>Private pack</SuperCheckbox>
                </div>
                <div className={s.buttonsBlock}>
                    <SuperButton
                        onClick={() => setShow(false)}
                        dis={true}
                        style={{
                            width: "12ch",
                            fontWeight: "500",
                            border: "none",
                        }}
                    >Cancel
                    </SuperButton>
                    <SuperButton
                        onClick={onClickAddCards}
                        dis={true}
                        style={{
                            color: "white",
                            width: "12ch",
                            fontWeight: "500",
                            border: "none",
                            background: "#678EFE"
                        }}
                    >Save
                    </SuperButton>
                </div>
        </>
    );
};
