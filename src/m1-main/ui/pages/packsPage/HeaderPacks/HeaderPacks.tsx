import s from './HeaderPacks.module.css'
import React, {useState} from 'react'
import {useAppDispatch, useAppSelector } from '../../../../bll/hooks'
import { SortPackNameType } from '../../../../dal/packs-api'
import { setPacksDataTC } from '../../../../bll/packsReducer'
// import s from './'
// import { packsAPI, SortPackNameType, SortPackNumberType } from '../../../../m3-dal/packs-api'
// import { useDispatch, useSelector } from 'react-redux'
// import { setPacksDataAC, setPacksDataTC } from '../../../../m2-bll/packsReducer'
// import { AppStoreType } from '../../../../m2-bll/store'
// import SuperSorting from '../../../common/c10-SuperSorting/SuperSorting'

export const HeaderPacks = () => {

    const sort = useAppSelector(state => state.packs.sort)
    //
    //
    const dispatch = useAppDispatch()
    const [isSorting, setIsSorting] = useState(false)
    //
    const sortingPack = (sortPackName: SortPackNameType) => {
        if (!isSorting) {
            dispatch(setPacksDataTC(
                {
                    params: {
                        // pageCount: 20,
                        sortPacks: `0${sortPackName}`,
                    }
                }
            ))
            setIsSorting(!isSorting)
        }
        if (isSorting) {
            dispatch(setPacksDataTC(
                {
                    params: {
                        // pageCount: 20,
                        sortPacks: `1${sortPackName}`,
                    }
                }
            ))
            setIsSorting(!isSorting)
        }
    }


    return (
            <div className={s.wrapper_header} >
                <div className={s.header_tableItem} onClick={() => sortingPack('name')}>Name
                    {/*<SuperSorting sort={sort} sorting={'name'}/>*/}
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('cardsCount')}>Cards
                {/*<SuperSorting sort={sort} sorting={'cardsCount'}/>*/}
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('updated')}>Last Updated
                {/*<SuperSorting sort={sort} sorting={'updated'}/>*/}
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('user_name')}>Created by
                {/*<SuperSorting sort={sort} sorting={'user_name'}/>*/}
                </div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
    )
}
