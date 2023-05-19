import React from 'react'
import s from './SuperSortingStyles.module.css'
import {triangleViewType} from "../../pages/packsPage/header-packs/HeaderPacks";
import {SortPackNameType} from "../../../dal/packs-api";

type SuperSortingPropsType = {
    sorting: SortPackNameType
    sort: string | undefined
    show?: triangleViewType
    handleClick: (sortPackName: SortPackNameType) => void
}
const SuperSorting: React.FC<SuperSortingPropsType> = ({sort, sorting, show, handleClick}) => {
    return (
        <>
            {sort === `1${sorting}`
                && <button className={s.button}>
                        <div className={s.triangle_up}></div>
                    </button>}
            {sort === `0${sorting}`
                && <button className={s.button}>
                        <div className={s.triangle_down}></div>
                    </button>}
            {show !== 'none'
                && <button className={s.buttonGrey} onClick={() => handleClick(sorting)}>
                    {show === 'down'
                        ? <div className={s.triangle_down}></div>
                        : <div className={s.triangle_up}></div>
                    }
                </button>
            }
        </>
    )
}
export default SuperSorting
