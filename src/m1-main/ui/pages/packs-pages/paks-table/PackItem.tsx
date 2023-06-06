import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPacksType } from '../../../../dal/packs-api'
import { changeDateView } from '../../utils/changeDateView'
import packsStyle from './PacksTable.module.css'
// import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {PATH} from "../../../../navigation/Paths";
import SuperButton from '../../../common/button/SuperButton'
import {useAppSelector} from "../../../../bll/hooks";
import {ActionPackCardType} from "./PacksTable";
// import {changeDateView} from "../../../../../n2-features/f3-utils/changeDateView";

type TableItemPropsType = {
    // deletePackList: (packId: string) => void
    // editPackList: (packName: string, packId: string) => void
    // learnPack: (packId: string) => void
    pack: CardPacksType
    selectedPackAction: (pack: CardPacksType, type: ActionPackCardType) => void
}

export const PackItem = ({
                             // deletePackList,
                             // editPackList,
                             // learnPack,
                             selectedPackAction,
                             pack}: TableItemPropsType) => {
    const navigate = useNavigate()
    const user_id = useAppSelector(state => state.auth.meStatus?._id)
    const onPressHandler = useCallback((type: ActionPackCardType) => {
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
                 // style={{cursor: "pointer"}}
                 onClick={() => onPressHandler("view")}
                 // onClick={() => navigate(`${PATH.PACKS}/${pack._id}`)}
            >
                <div className={packsStyle.itemsLongName}>
                    {pack.name}
                </div>
            </div>

            <div className={packsStyle.item}>{pack.cardsCount}</div>
            <div className={packsStyle.item}>{changeDateView(pack.created)}</div>
            <div className={packsStyle.item}>{pack.user_name}</div>
            <div className={pack.user_id === user_id ? packsStyle.itemAction : packsStyle.itemShortAction}>
                <SuperButton onClick={() => onPressHandler("learn")}
                             icon="learn"
                             style={{borderWidth: 0}}
                >Learn
                </SuperButton>
                {pack.user_id === user_id &&
                    (<SuperButton
                        onClick={() => onPressHandler("edit")}
                        icon="edit"
                        style={{borderWidth: 0}}
                     >Edit
                    </SuperButton>)
                }
                {pack.user_id === user_id &&
                    (<SuperButton icon="delete"
                             style={{borderWidth: 0}}
                             onClick={() => onPressHandler("delete")}
                    >Delete
                    </SuperButton>)
                }
            </div>

        </div>
    )
}
