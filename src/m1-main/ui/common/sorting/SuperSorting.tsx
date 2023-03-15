import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperSortingStyles.module.css'


type SuperSortingPropsType = {
    sorting: string
    sort: string | undefined
}

const SuperSorting: React.FC<SuperSortingPropsType> = ({sort, sorting}) => {

   

    return (
        <>
            {sort === `1${sorting}` && <button className={s.button}>
                        <div className={s.triangle_up}></div>
                    </button>}
                    {sort === `0${sorting}` && <button className={s.button}>
                        <div className={s.triangle_down}></div>
                    </button>}

        </>
    )
}

export default SuperSorting
