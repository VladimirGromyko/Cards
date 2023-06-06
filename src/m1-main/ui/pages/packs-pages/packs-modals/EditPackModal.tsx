import React, {useCallback, useState} from 'react'
import s from './PacksModal.module.css';
import {CardPacksType} from "../../../../dal/packs-api";
import {ActionPackCardType} from "../paks-table/PacksTable";
import SuperCheckbox from "../../../common/сheckbox/SuperCheckbox";
import SuperButton from "../../../common/button/SuperButton";
import SuperInputText from "../../../common/input/SuperInputText";


type EditPackType = {
    editPack: (packName: string, privateStatus:boolean, packId: string) => void
    pack: CardPacksType
    modalType: ActionPackCardType;
    setShow: (value: boolean) => void
    setModalType: (value: ActionPackCardType) => void
}

const EditPackModal = ({editPack, pack, modalType, setShow, setModalType}: EditPackType) => {

    const [newPackName, setNewPackName] = useState<string>(pack.name)
    const [privateStatus, setPrivate] = useState<boolean>(pack.private)

    const onKeyPressHandler = useCallback(() => {

        editPack(newPackName.trim(), privateStatus, pack._id)
        setShow(false)
        setModalType("none")
    }, [setShow, setModalType, editPack, newPackName, privateStatus])

    const OnCancelClick = useCallback(() => {
        setShow(false)
    }, [setShow])

    if (modalType !== "edit") return (<></>)

    return (
        <div>
            <div className={s.delHeader}>
                <div>Edit pack</div>
                <SuperButton icon="close"
                             style={{borderWidth: 0}}
                             onClick={OnCancelClick}
                             imgStyle={{width: "15px", height: "15px"}}
                >Close
                </SuperButton>
            </div>

            <div className={s.delPackBody}>
                <div className={s.textField}>Name pack</div>
                <SuperInputText value={newPackName}
                                onChangeText={setNewPackName}
                                onEnter={onKeyPressHandler}
                                placeholder={'Name Pack'}
                                className={'inOneLine'}
                />
                <div className={s.textField}>
                    <SuperCheckbox defaultChecked={privateStatus} onChangeChecked={setPrivate}>Private pack</SuperCheckbox>
                </div>
            </div>
            <div className={s.delButtons}>
                <SuperButton
                    onClick={OnCancelClick}
                    dis={true}
                    style={{
                        width: "12ch",
                        fontWeight: "500",
                        border: "none",
                    }}
                >Cancel
                </SuperButton>
                <SuperButton
                    onClick={onKeyPressHandler}
                    // dis={true}
                    dis={true}
                    style={{
                        color: "white",
                        width: "12ch",
                        fontWeight: "500",
                        border: "none",
                        background: "#678EFE"
                    }}>Save
                </SuperButton>
            </div>

            {/*{confirmRes.isResponseConfirm && */}
            {/*    <div style={{color: 'blue'}}>*/}
            {/*        {confirmResponse(confirmRes, 'editPack')}*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{errorRes.isResponseError && <div style={{color: 'red'}}>*/}
            {/*    {errorResponse(errorRes, 'editPack')}*/}
            {/*</div>}*/}
        </div>
    )
}

export default EditPackModal
