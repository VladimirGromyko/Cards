import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPacksType } from '../../../../dal/packs-api'
import { changeDateView } from '../../utils/changeDateView'
import packsStyle from './PacksTable.module.css'
// import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {PATH} from "../../../../navigation/Paths";
import SuperButton from '../../../common/button/SuperButton'
import {useAppSelector} from "../../../../bll/hooks";
import {ActionPackType} from "./PacksTable";
// import {useNavigate} from "react-router-dom";
// import {changeDateView} from "../../../../../n2-features/f3-utils/changeDateView";

type TableItemPropsType = {
    deletePackList: (packId: string) => void
    // editPackList: (packName: string, packId: string) => void
    // learnPack: (packId: string) => void
    pack: CardPacksType
    selectedPackAction: (pack: CardPacksType, type: ActionPackType) => void
}

export const PackItem = ({
                             deletePackList,
                             // editPackList,
                             // learnPack,
                             selectedPackAction,
                             pack}: TableItemPropsType) => {
    const navigate = useNavigate()
    const user_id = useAppSelector(state => state.auth.meStatus?._id)
    // const packNameLength = pack.name.length
    // if (packNameLength) {}
    const onDeletePressHandler = useCallback(() => {
        deletePackList(pack._id)
    }, [deletePackList, pack._id])
    const onPressHandler = useCallback((type: ActionPackType) => {
        selectedPackAction(pack, type)
    }, [selectedPackAction, pack])
    //
    // const onEditPressHandler = useCallback(() => {
    //     editPackList(pack.name, pack._id)
    // }, [editPackList, pack.name, pack._id])
    //
    // const onLearnPressHandler = useCallback(() => {
    //     learnPack(pack._id)
    // }, [learnPack, pack._id])

    return (
        <div className={packsStyle.items}>
            <div className={packsStyle.item}
                 style={{cursor: "pointer"}}
                 // onClick={() => navigate(`${PATH.PACKS}/${pack._id}`)}
            >
                <div className={packsStyle.itemsLongName}>
                    {pack.name}
                </div>
            </div>

            <div className={packsStyle.item}>{pack.cardsCount}</div>
            <div className={packsStyle.item}>{changeDateView(pack.created)}</div>
            <div className={packsStyle.item}>{pack.user_name}</div>
            <div className={packsStyle.itemAction}>
                <SuperButton
                    // onClick={onLearnPressHandler}
                             icon="learn"
                             style={{borderWidth: 0}}
                >
                    Learn
                </SuperButton>
                {pack.user_id === user_id &&
                    (<SuperButton
                    // onClick={onEditPressHandler}
                        icon="edit"
                        style={{borderWidth: 0}}
                     >Edit
                    </SuperButton>)
                }
                {pack.user_id === user_id &&
                    (<SuperButton icon="delete"
                             style={{borderWidth: 0}}
                             onClick={() => onPressHandler("delete")}
                             // onClick={onDeletePressHandler}
                    >Delete
                    </SuperButton>)
                }
            </div>

        </div>
    )
}
