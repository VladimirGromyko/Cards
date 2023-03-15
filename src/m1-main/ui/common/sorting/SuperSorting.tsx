import React from 'react'
import s from './SuperSortingStyles.module.css'


type SuperSortingPropsType = {
    sorting: string
    sort: string | undefined
    show?: boolean
}

const SuperSorting: React.FC<SuperSortingPropsType> = ({sort, sorting, show}) => {
debugger
    console.log(show)

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
            {show
                && <button className={s.buttonGrey}>
                    <div className={s.triangle_down}></div>
                </button>}

        </>
    )
}

export default SuperSorting
