import s from './HeaderPacks.module.css'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector } from '../../../../bll/hooks'
import { SortPackNameType } from '../../../../dal/packs-api'
import {setPacksDataTC} from '../../../../bll/packsReducer'
import SuperSorting from "../../../common/sorting/SuperSorting";
// import s from './'
// import { packsAPI, SortPackNameType, SortPackNumberType } from '../../../../m3-dal/packs-api'
// import { useDispatch, useSelector } from 'react-redux'
// import { setPacksDataAC, setPacksDataTC } from '../../../../m2-bll/packsReducer'
// import { AppStoreType } from '../../../../m2-bll/store'
// import SuperSorting from '../../../common/c10-SuperSorting/SuperSorting'

export const HeaderPacks = () => {
    debugger
    const sort = useAppSelector(state => state.packs.sort)
    //
    //
    const dispatch = useAppDispatch()
    const [isSorting, setIsSorting] = useState(false)
    const [showSortDated, setShowSortDated] = useState(false)
    const [showSortName, setShowSortName] = useState(false)
    let
        // showSortName = false,
        showSortCards = false,
        // showSortDated = false,
        showSortCreated = false
    //
    const sortingPack = (sortPackName: SortPackNameType) => {
        debugger
        let sortPacks
        if (!isSorting) {
            sortPacks = `0${sortPackName}`
        }
        if (isSorting) {
            sortPacks = `1${sortPackName}`
        }
        setIsSorting(!isSorting)
        dispatch(setPacksDataTC({params: {sortPacks}}))
    }
    const sortingOver = (sortPackName: SortPackNameType) => {
        // if (!sort) {
            switch (sortPackName) {
                case 'name':
                    setShowSortName(!showSortName)
                    // showSortName = !showSortName
                    break
                case 'cardsCount':
                    showSortCards = !showSortCards
                    break
                case 'updated':
                    setShowSortDated(!showSortDated)
                        // showSortDated = !showSortDated
                    break
                case 'user_name':
                    showSortCreated = !showSortCreated
                    break
            }
        // } else {
            // setShowSortName(false)
            // setShowSortDated(false)
        // }
    }
    useEffect(() => {
        if (sort) {
            showSortName && setShowSortName(false)
            showSortDated && setShowSortDated(false)
        }
    },[sort])

    return (
            <div className={s.wrapper_header} >
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('name')}
                     onMouseOver={() => sortingOver('name')}
                     onMouseLeave={() => sortingOver('name')}
                >Name
                    <SuperSorting sort={sort} sorting={'name'} show={showSortName}/>
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('cardsCount')}>Cards
                    <SuperSorting sort={sort} sorting={'cardsCount'}/>
                </div>
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('updated')}
                     onMouseOver={() => sortingOver('updated')}
                     onMouseLeave={() => sortingOver('updated')}
                >Last Updated
                    <SuperSorting sort={sort} sorting={'updated'} show={showSortDated}/>
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('user_name')}>Created by
                    <SuperSorting sort={sort} sorting={'user_name'}/>
                </div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
    )
}
