import React from 'react'
import s from './CardsTable.module.css'
import {changeDateView} from "../../utils/changeDateView";
import {CardsType} from "../../../../dal/cards-api";
import fullStar from './../../utils/Star-3_full.svg'
import halfStar from './../../utils/Star-4_half_full.svg'
import emptyStar from './../../utils/Star-5_empty.svg'
type CardItemPropsType = {
    card: CardsType
    // show: boolean
    // setShow: (value: boolean) => void
    // editShow:boolean
    // setEditShow: (value: boolean) => void
}
type starsType = 'fullStar' | 'halfStar' | 'emptyStar'

const StarReturn = (starsModel: starsType) => {
    let icon = fullStar
    if (starsModel === 'halfStar') icon = halfStar
    if (starsModel === 'emptyStar') icon = emptyStar
    return (<img src={icon} alt="картинка" className={s.icon}/>)
}

export const CardItem = ({
                             // show,
                             // setShow,
                             card ,
                             // editShow,
                             // setEditShow
                        }: CardItemPropsType) => {
    // const user = useSelector<AppStoreType, UserDataType | null>(state => state.login.user)
    const starsFullNumber = card.grade? Math.round(card.grade) : 0
    const starsHalf = card.grade && (card.grade - starsFullNumber) > 0.5 ? 1 : 0
    const emptyStarsNumber = 5 - starsFullNumber

    const makeStarsBlock = (fullStars: number, halfStars: number, emptyStars: number) => {
        debugger
        let stars = []
        for (let i = 0; i < fullStars; i++) {
            stars.push(StarReturn('fullStar'))
        }
        if (halfStars) stars.push(StarReturn('halfStar'))
        for (let i = 0; i < emptyStars; i++) {
            stars.push(StarReturn('emptyStar'))
        }
        const starsBlock = stars.map( (el, ind) => {
            return <span key={`${ind}-star`}>{el}</span>
        })
        return <>{starsBlock}</>
    }

    return (
        <div className={s.items}>
            <div className={s.item}>{card.question}</div>
            <div className={s.item}>{card.answer}</div>
            <div className={s.item}>{changeDateView( card.updated ? card.updated : '')}</div>

            {/*<div className={s.item}>{card.grade}</div>*/}
            <div className={s.item}>{makeStarsBlock(starsFullNumber, starsHalf, emptyStarsNumber)}</div>

            <div>
                {/*{card.user_id === user?._id && <DeleteCardModal show={show} setShow={setShow} cardId={card._id}/>}*/}
                {/*{card.user_id === user?._id && <EditCardModal show={editShow} setShow={setEditShow} cardId={card._id} />}*/}
            </div>
        </div>
    )
}
