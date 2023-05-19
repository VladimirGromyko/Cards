import s from './HeaderPacks.module.css'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector } from '../../../../bll/hooks'
import { SortPackNameType } from '../../../../dal/packs-api'
import {setPacksDataTC} from '../../../../bll/packsReducer'
import SuperSorting from "../../../common/sorting/SuperSorting";

export type triangleViewType = 'none' | 'up' | 'down'
type HeadingsElementType = {
    headings: string,
    sortField: SortPackNameType
    arrow: triangleViewType
}
export type FieldType = {
    field: SortPackNameType, arrow: triangleViewType
}
type ColumnHeadingsType = HeadingsElementType[]
export const HeaderPacks = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packs.sortPacks)
    const [isSorting, setIsSorting] = useState(false)
    const initialColumnHeadings: ColumnHeadingsType = [
        {headings: "Name", sortField: "name", arrow: "none"},
        {headings: "Cards", sortField: "cardsCount", arrow: "none"},
        {headings: "Last Updated", sortField: "updated", arrow: "none"},
        {headings: "Created by", sortField: "user_name", arrow: "none"},
        {headings: "Actions", sortField: "actions", arrow: "none"}]

    const [columnHeadings, setColumnHeadings] = useState<ColumnHeadingsType>(initialColumnHeadings)
    const sortingPack = async (sortPackName: SortPackNameType) => {
        if (sortPackName !== "actions" && sortPackName !== "none") {
            const sortPacks = isSorting ? `1${sortPackName}` : `0${sortPackName}`
            setIsSorting(!isSorting)
            await dispatch(setPacksDataTC({params: {sortPacks}}))
            sortingOver("", sortPackName)
        }
    }
    const checkArrow = (sortPackName: SortPackNameType, event: "click" | "mouse") => {
        let arrow: triangleViewType = 'down'
        if (sort?.includes(sortPackName) && sort.includes('0')) {
            arrow = event === "mouse" ? "up" : "down"
        } else if (sort?.includes(sortPackName) && sort.includes('1')) {
            arrow = event === "click" ? "up" : "down"
        }
        return arrow
    }
    const sortingOver = (e: React.MouseEvent<HTMLDivElement> | string, sortPackName: SortPackNameType) => {
        let arrow: triangleViewType = 'none'
        if (typeof e === "string" || e.type === 'mouseover') {
            const event = typeof e === "string" ? "click" : "mouse"
            arrow = checkArrow(sortPackName, event)
        }
        if ((sortPackName !== "actions") && (sortPackName !== "none")) {
            const newColumnHeadings = columnHeadings.map((el) => {
                if (el.sortField === sortPackName ) {
                    el.arrow = arrow
                }
                return el
            })
            setColumnHeadings(newColumnHeadings)
        }
    }
    return (
            <div className={s.wrapper_header} >
                {columnHeadings.map((el) => {
                    return (
                        <div className={s.header_tableItem}
                             onMouseOver={(e) => sortingOver(e, el.sortField)}
                             onMouseLeave={(e) => sortingOver(e, el.sortField)}
                        >{el.headings}
                            <SuperSorting sort={sort} sorting={el.sortField} show={el.arrow} handleClick={() => sortingPack(el.sortField)}/>
                        </div>
                    )
                })}
            </div>
    )
}
