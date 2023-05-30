import React from 'react'
import s from './SuperSortingStyles.module.css'
import {triangleViewType} from "../../pages/utils/header-table/HeaderTable";

type SuperSortingPropsType = {
    sorting: string
    sort: string | undefined
    show?: triangleViewType
    handleClick: (sortPackName: string) => void
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
