import React, {ChangeEvent, useCallback, useState} from "react";
import SuperButton from "../../../common/button/SuperButton";
import SuperInputText from "../../../common/input/SuperInputText";
import s from "./PacksModal.module.css";
import SuperCheckbox from "../../../common/сheckbox/SuperCheckbox";

type AddPackModalPropsType = {
    setShow: (value:boolean)=>void
    addPack: (pack: {name: string, privateStatus: boolean}) => void
}

export const AddPackModal = ({setShow, addPack}: AddPackModalPropsType) => {
    const [name, setPackName] = useState('')
    const [privateStatus, setPrivate] = useState<boolean>(false)
    // const [answer, setAnswer] = useState('')
    // const dispatch = useDispatch()


    const onClickAddCards = () => {
        debugger
        if (name) {
            setShow(false)
            addPack({name, privateStatus})
        }
    }
    const onInputName = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        setPackName(e.currentTarget.value.trim())
    }
    const OnCancelClick = useCallback(() => {
        setShow(false)
    }, [setShow])
    const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setAnswer(e.currentTarget.value)
    }

    return (
        <>
            <div className={s.delHeader}>
                <div>Add new pack</div>
                <SuperButton icon="close" style={{borderWidth: 0}} onClick={OnCancelClick}
                             imgStyle={{width: "15px", height: "15px"}}
                />
            </div>
            <div className={s.delPackBody}>
                <div className={s.textField}>Name pack</div>
                    <SuperInputText type='text' placeholder='Name Pack' className={'inOneLine'} onChange={onInputName}/>
                <div className={s.textField}>
                    <SuperCheckbox onChangeChecked={setPrivate}>Private pack</SuperCheckbox>
                </div>
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
