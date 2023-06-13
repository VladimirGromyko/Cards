import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import {LearnCard, QuestionRateType} from "./LearnCard"
import s from "./Learn.module.css"
import {ReactComponent as Svg} from "./../utils/direction-arrow-left.svg";
import {useAppDispatch, useAppSelector} from "m1-main/bll/hooks";
import {cardsActions, gradeCardTC, initCardsState, setCardsTC} from "m1-main/bll/cardsReducer";
import {CardsType} from "m1-main/dal/cards-api";
import Waiting from "m1-main/ui/pages/error-page/Waiting";
import {getCard} from "m1-main/ui/pages/utils/get-card";
import {authActions} from "m1-main/bll/authReducer";
import {PATH} from "m1-main/navigation/Paths";


export const LearnPage = () => {
    const cards = useAppSelector(state => state.cards.cardsSet)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
    const packId = params.id
debugger
    const [currentCard, setCurrentCard] = useState<CardsType>(cards.cards[0])
    const learn = async () => {
        try{
            await dispatch(setCardsTC({
                // cardAnswer: "",
                // cardQuestion: "",
                cardsPack_id: packId,
                // min: 3,
                // max: 5,
                sortCards: "0grade",
                // page: 1,
                pageCount: 1000,
            }))
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        debugger
        learn()
    }, [packId, dispatch, ]);
    useEffect(() => {
        debugger
        setCurrentCard(getCard(cards.cards))
    }, [cards.packName, dispatch, ]);
    const changeCard = async (questionRate: QuestionRateType) => {
        debugger
        await dispatch(gradeCardTC({cardsPack_id: packId,card_id: questionRate.card_id, grade: questionRate.grade}))
        setCurrentCard(getCard(cards.cards))
    }
    const returnBack = () => {
        dispatch(authActions.changeMeStatusResponse('done'))
        dispatch(cardsActions.setCards(initCardsState))
        navigate(PATH.PACKS)
    }

    return (
        <>
            <div className={s.returnBack} onClick={returnBack} >
                <Svg width="30px" height="25px"/>
                Back to Packs List
            </div>
            <div className={s.superWrapper}>
                <Waiting />
                {cards.packUserId && <LearnCard currentCard={currentCard} changeCard={changeCard}/>}
            </div>
        </>

    )
}

