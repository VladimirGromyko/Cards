import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { LearnCard } from "./LearnCard"
import s from "./LearnPage.module.css"
// import { PATH } from "../../routes/Paths"
import { useDispatch, useSelector } from "react-redux";
// import { CardType, getCardsTC, gradeCardTC } from "../../../m2-bll/cardsReducer1"
// import { AppStoreType } from "../../../m2-bll/store";
import l from "../../common/c7-Loading/loader07.module.css";
// import { cardsType } from "../../../m2-bll/cardsReducer"


export const LearnPage = () => {

    // const isLoading = useSelector<AppStoreType>(state => state.loading.isLoading);
    // const cards = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    //
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const params = useParams()
    // const packId = params.id
    // const [first, setFirst] = useState(true);
    //
    // const [currentCard, setCurrentCard] = useState<cardsType>({
    //
    // }) //
    //
    // const navigateBackPage = () => navigate(PATH.PACKS)
    //
    // const nextCardHandler = (grade: number) => {
    //     if (cards && currentCard._id) {
    //         setCurrentCard(getCard(cards))
    //         dispatch(gradeCardTC((+grade), currentCard._id));
    //     }
    // }
    //
    // useEffect(() => {
    //     if (first) {
    //
    //         packId && dispatch(getCardsTC({ packId }));
    //         setCurrentCard(getCard(cards))
    //         setFirst(false);
    //
    //     }
    //
    //     if (cards.length > 0) {
    //         setCurrentCard(getCard(cards));
    //         setFirst(false);
    //     }
    //
    // }, [cards, dispatch, ]);
    //
    //
    // return (<div className={s.superWrapper}>
    //     {isLoading === "loading" && <div className={l.loader07}></div>}
    //
    //         <div className={s.wrapper}>
    //             {currentCard && <LearnCard
    //                 currentCard={currentCard}
    //                 nextCardHandler={nextCardHandler}
    //                 navigateBackPage={navigateBackPage}
    //             />}
    //         </div>
    //     </div>
    // )
}







//utility


// const getCard = (cards: CardType[]) => {
//     const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
//     const rand = Math.random() * sum;
//     const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
//         const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
//         return { sum: newSum, id: newSum < rand ? i : acc.id }
//     }
//         , { sum: 0, id: -1 });
//     console.log('test: ', sum, rand, res)
//
//     return cards[res.id + 1];
// }
