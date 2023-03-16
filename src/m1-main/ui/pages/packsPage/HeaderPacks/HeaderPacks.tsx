import s from './HeaderPacks.module.css'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector } from '../../../../bll/hooks'
import { SortPackNameType } from '../../../../dal/packs-api'
import {setPacksDataTC} from '../../../../bll/packsReducer'
import SuperSorting from "../../../common/sorting/SuperSorting";

export type triangleViewType = 'none' | 'up' | 'down'
export const HeaderPacks = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packs.sort)
    const [isSorting, setIsSorting] = useState(false)
    const [showSortDated, setShowSortDated] = useState<triangleViewType>("none")
    const [showSortName, setShowSortName] = useState<triangleViewType>("none")
    const [showSortCards, setShowSortCards] = useState<triangleViewType>("none")
    const [showSortAuthor, setShowSortAuthor] = useState<triangleViewType>("none")

    const sortingPack = (sortPackName: SortPackNameType) => {
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
    const checkArrow = (sortPackName: SortPackNameType) => {
        let arrow: triangleViewType = 'down'
        if (sort?.includes(sortPackName) && sort.includes('0')) {
            arrow = "up"
        } else if (sort?.includes(sortPackName) && sort.includes('1')) {
            arrow = "down"
        }
        return arrow
    }
    const sortingOver = (e: React.MouseEvent<HTMLDivElement>, sortPackName: SortPackNameType) => {
        let arrow: triangleViewType = 'none'
        if (e.type === 'mouseover') {
            arrow = checkArrow(sortPackName)
        }
        switch (sortPackName) {
            case 'name':
                setShowSortName(arrow)
                break
            case 'cardsCount':
                setShowSortCards(arrow)
                break
            case 'updated':
                setShowSortDated(arrow)
                break
            case 'user_name':
                setShowSortAuthor(arrow)
                break
        }
    }
    useEffect(() => {
        if (sort) {
            showSortName !== 'none' && setShowSortName("none")
            showSortDated !== 'none' && setShowSortDated("none")
            showSortCards !== 'none' && setShowSortCards("none")
            showSortAuthor !== 'none' && setShowSortAuthor("none")
        }
    },[sort])

    return (
            <div className={s.wrapper_header} >
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('name')}
                     onMouseOver={(e) => sortingOver(e, 'name')}
                     onMouseLeave={(e) => sortingOver(e, 'name')}
                >Name
                    <SuperSorting sort={sort} sorting={'name'} show={showSortName}/>
                </div>
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('cardsCount')}
                     onMouseOver={(e) => sortingOver(e, 'cardsCount')}
                     onMouseLeave={(e) => sortingOver(e,'cardsCount')}
                >Cards
                    <SuperSorting sort={sort} sorting={'cardsCount'} show={showSortCards}/>
                </div>
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('updated')}
                     onMouseOver={(e) => sortingOver(e, 'updated')}
                     onMouseLeave={(e) => sortingOver(e,'updated')}
                >Last Updated
                    <SuperSorting sort={sort} sorting={'updated'} show={showSortDated}/>
                </div>
                <div className={s.header_tableItem}
                     onClick={() => sortingPack('user_name')}
                     onMouseOver={(e) => sortingOver(e, 'user_name')}
                     onMouseLeave={(e) => sortingOver(e,'user_name')}
                >Created by
                    <SuperSorting sort={sort} sorting={'user_name'} show={showSortAuthor}/>
                </div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
    )
}
