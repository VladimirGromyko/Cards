import React, {useCallback, useState} from "react";
import SuperButton from "../../../common/button/SuperButton";
import s from "./PacksModal.module.css";
import {CardPacksType} from "../../../../dal/packs-api";
import {ActionPackType} from "../paks-table/PacksTable";

type DeletePackModalType = {
    deletePack: (packId: string) => void
    pack: CardPacksType
    setShow: (value: boolean) => void
    setModalType: (value: ActionPackType) => void
}
export const DeletePackModal = ({deletePack, pack, setShow, setModalType}: DeletePackModalType) => {

    const onDeleteClick = useCallback(() => {
        debugger
        console.log(pack)
        deletePack(pack._id)
        setShow(false)
        setModalType("none")
    }, [deletePack])

    const OnCancelClick = useCallback(() => {
        setShow(false)
    }, [setShow])

    return (
        <div >
            <div className={s.delHeader}>
                <div>Delete Pack</div>
                <SuperButton icon="close"
                             style={{borderWidth: 0}}
                             onClick={OnCancelClick}
                             imgStyle={{width: "15px", height: "15px"}}
                >Close
                </SuperButton>
            </div>

            <div className={s.delPackBody}>
                <div>Do you really want to remove <b>{pack.name}</b></div>
                <div>All cards well be excluded from this course</div>
            </div>

            <div className={s.delButtons}>
                <SuperButton
                    onClick={OnCancelClick}
                    dis={true}
                    style={{
                        width: "113px",
                        height: "36px",
                        fontWeight: "500",
                        border: "none",
                    }}
                >Cancel
                </SuperButton>
                <SuperButton onClick={onDeleteClick} red={true}
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
        </div>
    )
}
