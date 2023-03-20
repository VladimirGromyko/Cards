import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import cps from "../PacksPage.module.css";
import SuperInputText from "../../../common/input/SuperInputText";
import SuperButton from "../../../common/button/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks";
import useDebounce from "../../../features/hooks/useDebounce";
import {setPacksDataTC} from "../../../../bll/packsReducer";
const SearchBlock = () => {
    const dispatch = useAppDispatch()
    const searchInMemory = useAppSelector(state => state.packs.packName)
    const user_id = useAppSelector(state => state.auth.meStatus?._id)
    const [search, setSearch] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false);
    const debouncedValue = useDebounce(search, 1500);

    const [selectedAll, setSelectedAll] = useState<boolean>(false)
    const onSearchHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    useEffect(() => {
        if (debouncedValue !== searchInMemory) {
            setIsSearching(true);
            dispatch(setPacksDataTC({params:{packName:search}}))
        }
    }, [debouncedValue]);

    const onSetMyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({params: {user_id: user_id}}))
        setSelectedAll(false)
    }, [])

    const onSetAllPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({params: {user_id: ''}}))
        setSelectedAll(true)
    }, [])
    const allMyClickStyle = (style: string) => {
        return cps.allMyClick + ' ' +style
    }
    const allMyStyle = (style: string) => {
        return cps.allMy + ' ' +style
    }

    return (
        <div className={cps.inputPlusButton}>
            <div className={cps.searchCards}>
                <span className={cps.searchCardsHeader}>Search</span>
                <span className={cps.searchCardsHeader}>Show Packs cards</span>
                <span className={cps.searchCardsHeader}>Number of cards</span>
                <span></span>
                <SuperInputText
                    placeholder='Enter cardPacks name for searching'
                    onChange={onSearchHandler}
                    value={search}
                />
                <div style={{textAlign: 'start'}}
                     className={cps.contentAllMy}>
                    <div className={cps.allMyWrapper}>
                        <SuperButton
                            className={ !selectedAll ? allMyClickStyle(cps.myClick) : allMyStyle(cps.myClick)}
                            onClick={onSetMyPressHandler}
                        >
                            My
                        </SuperButton>
                        <SuperButton className={ selectedAll ? allMyClickStyle(cps.allClick) : allMyStyle(cps.allClick)}
                                     onClick={onSetAllPressHandler}
                        >
                            All
                        </SuperButton>

                    </div>
                    <div style={{color: 'red'}}>
                        {/*{errorResponse(errorRes, 'setPacks')}*/}
                    </div>
                </div>

                {/*<Sidebar/>*/}

                <div>Filter</div>

            </div>




            {/*<div className={commonPacksStyle.ariaA}>*/}

            {/*</div>*/}



        </div>
        )
}
export default SearchBlock
