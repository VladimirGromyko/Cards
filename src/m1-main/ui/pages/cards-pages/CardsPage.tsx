import React, {ChangeEvent, useEffect, useState} from 'react'

import CardsTable from './cards-table/CardsTable';

import {useNavigate, useParams} from "react-router-dom";
import cs from "./CardsPage.module.css";
import useDebounce from "../../features/hooks/useDebounce";
import {authActions} from "../../../bll/authReducer";
import {PATH} from "../../../navigation/Paths";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";

import {ReactComponent as Svg} from "./../utils/direction-arrow-left.svg";
import SuperButton from "../../common/button/SuperButton";
import {setCardsTC} from "../../../bll/cardsReducer";
import {SortCardsHeaderType} from "../../../dal/cards-api";
import {HeaderTable, triangleViewType} from "../utils/header-table/HeaderTable";
import SuperInputText from "../../common/input/SuperInputText";

const CardsPage = () => {

    const user_id = useAppSelector(state => state.auth.meStatus?._id)
    const meStatus = useAppSelector(state => state.auth.meStatusResponse)
    const sort = useAppSelector(state => state.cards.sortCards)
    const cardsSet = useAppSelector(state => state.cards.cardsSet)
    debugger
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const packId = params.id
    debugger


    type HeadingsElementType = {
        headings: string,
        sortField: SortCardsHeaderType
        arrow: triangleViewType
    }
    type ColumnHeadingsType = HeadingsElementType[]
    const initialColumnHeadings: ColumnHeadingsType = [
        {headings: "Question", sortField: "question", arrow: "none"},
        {headings: "Answer", sortField: "none", arrow: "none"},
        {headings: "Last Updated", sortField: "updated", arrow: "none"},
        {headings: "Grade", sortField: "grade", arrow: "none"},
        {headings: "", sortField: "none", arrow: "none"}]

    // if(meStatus === "work") {
    //     const getCards = async () => {
    //         await dispatch(setCardsTC({
    //             // cardAnswer: "",
    //             // cardQuestion: "",
    //             cardsPack_id: packId,
    //             // min: 3,
    //             // max: 5,
    //             // sortCards: "",
    //             // page: 1,
    //             pageCount: 1000,
    //         }))
    //
    //     }
    //     getCards()
    //         .then(() => {
    //             console.log(selectedCards)
    //         })
    // }

    useEffect(() => {
        // if (selectedCards.cards[0].cardsPack_id !== packId) {
        console.log("packId :", packId)
            // dispatch(setCardsTC({
            //     // cardAnswer: "",
            //     // cardQuestion: "",
            //     cardsPack_id: packId,
            //     // min: 3,
            //     // max: 5,
            //     // sortCards: "",
            //     // page: 1,
            //     pageCount: 1000,
            // }))
        // }
    }, [packId])
    // }, [packId, selectedCards.cards[0].cardsPack_id])




    const [searchValue, setSearchValue] = useState('')
    const [isSearching, setIsSearching] = useState(false);
    const debouncedValue = useDebounce(searchValue, 1500);
    const buttonStyle = {
        color: "white",
        width: "20ch",
        fontWeight: "200",
        border: "none",
    }

    useEffect(() => {
            // Убедиться что у нас есть значение (пользователь ввел что-то)
            if (debouncedValue) {
                // Выставить состояние isSearching
                setIsSearching(true);
                if (packId) {
                    // dispatch(getCardsBySearchTC({packId, search: searchValue}))
                }
            } else {
                if (packId) {
                    // dispatch(getCardsBySearchTC({packId, search: searchValue}))
                }
            }
        },
        // Это массив зависимостей useEffect
        // Хук useEffect сработает только если отложенное значение изменится ...
        // ... и спасибо нашему хуку, что оно изменится только тогда ...
        // когда значение searchTerm не менялось на протяжении 500ms.
        [debouncedValue]
    );

    // const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType, search?: string) => {
        // dispatch(getCardsTC({packId, sortNumber, sortName}))
    // }
    const returnBack = () => {
        dispatch(authActions.changeMeStatusResponse('done'))
        navigate(PATH.PACKS)
    }

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const learnCards = () => {
        debugger
    }
    const setSorting = async (sortField: string) => {
        debugger
        await dispatch(setCardsTC({cardsPack_id: packId, sortCards: sortField, min: 1, max: 100, page: 1}))
    }

    // const onSearchClick = () => {
    //     if (packId) {
    //         dispatch(getCardsBySearchTC({ packId, search: searchValue }))
    //     }

    // }


    return (
        <div className={cs.wrapper}>
            <div className={cs.TableWrapper}>
                <div className={cs.returnBack} onClick={returnBack} >
                    <Svg width="30px" height="25px"/>
                    Back to Packs List
                </div>
                {/*<div className={cs.TableWrapper}>*/}
                {/*<div style={{width: '100%'}}>*/}
                {/*    {isLoading === "loading" && <div className={l.loader07}></div>}*/}
                {/*</div>*/}
                {/*<div style={{width: '1008px'}}>*/}
                <span className={cs.headerBlock}>
                    <h3>{cardsSet.packName}</h3>
                    <SuperButton
                        onClick={learnCards}
                        // onClick={() => setShow(true)}
                        style={buttonStyle}
                    >Learn to pack
                    </SuperButton>
                </span>
                <div className={cs.search}>
                    <span className={cs.searchCardsHeader}>Search</span>
                    <SuperInputText
                        placeholder='Provide your text'
                        onChange={onSearchHandler}
                        value={searchValue}
                    />
                </div>

                {/*<div className={packsStyle.search}>*/}
                {/*    <SuperInputText onChange={onSearchInputChange}*/}
                {/*                    placeholder='Enter cards name for searching'/>*/}
                {/*</div>*/}
                <div className={cs.tableBlock}>
                    <div className={cs.wrapper_header}>
                        <HeaderTable columArr={initialColumnHeadings} sorted={sort} setSorting={setSorting}/>
                    </div>

                    {/*<HeaderCards getCards={getCards} packId={packId}/>*/}
                    {cardsSet.cards.length && <CardsTable cards={cardsSet.cards} packId={packId}/>}

                    {/*</div>*/}
                    {/*</div>*/}
                </div>

            </div>
        </div>
    );
};

export default CardsPage;
