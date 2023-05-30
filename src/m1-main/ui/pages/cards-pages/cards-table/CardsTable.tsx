import React, {ChangeEvent, CSSProperties, useCallback, useEffect, useState} from 'react'
import cardsStyle from './CardsTable.module.css'
// import s from "../../../p3-pass-recovery/PassRecovery.module.css"
import {useDispatch, useSelector} from "react-redux";
import {CardsType, SortNameType, SortNumberType} from "../../../../dal/cards-api";
import SuperButton from "../../../common/button/SuperButton";
import {CardItem} from "./CardItem";
// import {cardsAPI, SortNameType, SortNumberType} from "../../../../../m3-dal/cards-api";
// import {AppStoreType} from "../../../../../m2-bll/store";
// import {addCardTC, CardType, deleteCardTC} from "../../../../../m2-bll/cardsReducer1";
// import {CardItem} from "../CardItem";
// import SuperInputText from "../../../../common/c2-SuperInput/SuperInputText";
// import SuperButton from "../../../../common/c1-SuperButton/SuperButton";
// import {AddCardModal} from "../../../../../../n2-features/f2-modals/AddCardModal";

export type CardsTablePropsType = {
    cards: CardsType[];
    // getCards: (packId:string, sortNumber?:SortNumberType, sortName?: SortNameType)=> void
    packId: string | undefined
}

const CardsTable = ({cards, packId, ...props}: CardsTablePropsType) => {

    // const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()


    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false)
    const [editShow, setEditShow] = useState(false)

    // const getCards = useCallback((sortNumber?:SortNumberType, sortName?: SortNameType) => {
    //     if (packId) {
    //         props.getCards(packId, sortNumber, sortName)
    //     }
    // }, [packId, props])

    // const onClickGetCards = () => {
    //     getCards()
    // }






    return (
        <div className={cardsStyle.container}>
            {cards.map(card => {
                return <CardItem
                        card={card}
                        // show={deleteShow}
                        // setShow={setDeleteShow}
                        // editShow={editShow}
                        // setEditShow={setEditShow}
                />
                })
            }

            {/*<SuperButton onClick={onClickGetCards}>get card</SuperButton>*/}
            {/*<AddCardModal show={show} setShow={setShow} packId={packId}/>*/}
        </div>
    );
};

export default CardsTable;





