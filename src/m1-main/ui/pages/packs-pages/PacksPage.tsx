
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import cps from "./PacksPage.module.css"
import Waiting from "../error-page/Waiting";
import {addPacksTC, deletePackTC, editPackTC, setPacksDataTC} from "../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../bll/hooks";
import { PacksTable } from "./paks-table/PacksTable";
import SearchBlock from "./search-block/SearchBlock";
import Paginator from "../../common/pagination/Paginator";
import {PackListSize} from "../../common/pack-list-size/PackListSize";
import ModalContainer from "../../common/modal/ModalContainer";
import {AddPackModal} from "./packs-modals/AddPackModal";
import {PATH} from "../../../navigation/Paths";
import {setCardsTC} from "../../../bll/cardsReducer";
import {HeaderTable, triangleViewType} from "../utils/header-table/HeaderTable";
import {SortPackNameType} from "../../../dal/packs-api";

// import {
//     addPacksTC, deletePackTC,
//     editPackTC, getSearchPackByNameTC,
//     pickDeletePackAC,
//     pickEditPackAC, setCurrentPageTC, setPacksDataAC,
//     setPacksDataTC,
//     showAddPackAC, showDeletePackAC,
//     showEditPackAC,
// } from "../../../../m2-bll/packsReducer";
// import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
// import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
// import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
// import useDebounce from "../../../../../n2-features/f1-hooks/useDebounce";
// import {PATH} from "../../../routes/Paths";
// import {initializeMainTC} from "../../../../m2-bll/loginReducer";
// import {LearnPage} from "../../learn/LearnPage";
// import ModalAddContainer from "../../../../../n2-features/f3-utils/Modal/ModalAddContainer";
// import SuperButton from "../../../common/c1-SuperButton/SuperButton";

type HeadingsElementType = {
    headings: string,
    sortField: SortPackNameType
    arrow: triangleViewType
}
type ColumnHeadingsType = HeadingsElementType[]

export const PacksPage = () => {
    // const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    // const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const packs = useAppSelector(state => state.packs.packsData)
    const sorted = useAppSelector(state => state.packs.sortPacks)
    // const searchRX = useSelector<AppStoreType, string | undefined>(state => state.packs.packName)
    // const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    // // const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    // const user = useSelector<AppStoreType>(state => state.login.user)
    // // const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)
    const [selectedAll, setSelectedAll] = useState<boolean>(false)
    //
    // const isShownAddPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
    //     state.packs.isShownAddPack)
    //
    // const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
    //     state.packs.isShownEditPack)
    //
    // const isShownDeletePack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
    //     state.packs.isShownDeletePack)
    //
    // const pickedEditPack = useSelector<AppStoreType, { packName: string, packId: string }>
    // ((state: AppStoreType) => state.packs.pickedEditPack)
    //
    // const pickedDeletePack = useSelector<AppStoreType, { packName: string, packId: string }>
    // ((state: AppStoreType) => state.packs.pickedDeletePack)


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.auth.meStatusResponse);
    const authorId = useAppSelector(state => state.packs.packsData.authorId)
    // const [search, setSearch] = useState('')
    // const [isSearching, setIsSearching] = useState(false);

    const initialColumnHeadings: ColumnHeadingsType = [
        {headings: "Name", sortField: "name", arrow: "none"},
        {headings: "Cards", sortField: "cardsCount", arrow: "none"},
        {headings: "Last Updated", sortField: "updated", arrow: "none"},
        {headings: "Created by", sortField: "user_name", arrow: "none"},
        {headings: "Actions", sortField: "none", arrow: "none"}]

    const portionSize = 10

    let step = true
    // const debouncedValue = useDebounce(search, 1500);
    //
    // useEffect(() => {
    //       if (debouncedValue !== searchRX) {
    //         setIsSearching(true);
    //             dispatch(getSearchPackByNameTC(search))
    //       }
    //     },
    //     [debouncedValue]
    // );
    useEffect(() => {
        if (isLoggedIn === 'done' && step) {
            step = false
            debugger
            const params = {}
            // const params = JSON.parse(JSON.stringify(initialPacksState))
            // if (params && params.packsData && authorId) params.packsData.authorId = authorId
            dispatch(setPacksDataTC({params}))
        } else if (isLoggedIn === 'error' || isLoggedIn === 'logout') {
            step = true
            alert('Waiting for the job was too long! Reauthorization required.')
            navigate(PATH.LOGIN)
        }
    }, [dispatch, isLoggedIn] )

// Block for sorting
    const setSorting = async (sortField: string) => {
        debugger
        await dispatch(setPacksDataTC({params: {sortPacks: sortField}}))
    }

// Block for Add pack
    const [showAddPacksModal, setShowAddPacksModal] = useState<boolean>(false);
    const addPack = useCallback((pack: {name: string, privateStatus: boolean}) => {
        dispatch(addPacksTC({cardsPack: {name: pack.name, private: pack.privateStatus}}))
    }, [dispatch,])
//-------------

// Block for Delete pack
    const deletePackList = useCallback((packId: string) => {
        dispatch(deletePackTC( {params: {id: packId}}))
    }, [dispatch])
//-------------

// Block for view pack
    const viewPackList = useCallback(async (packId: string) => {
        debugger
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
        navigate(`${PATH.PACKS}/${packId}`)
        // dispatch(editPackTC({cardsPack: {_id: packId, name: packName, private: privateStatus}}))
    }, [dispatch])
//-------------

    const learnPack = useCallback((packId: string) => {
    debugger
    //     // navigate('/packs/' + packId)
    //     navigate('/main/packs-learn/'+ packId)
    }, [])

// Block for Edit pack
    const editPackList = useCallback((packName: string, privateStatus:boolean, packId: string) => {
        dispatch(editPackTC({cardsPack: {_id: packId, name: packName, private: privateStatus}}))
    }, [dispatch])
//-------------

    const onPageChanged = useCallback((page: number) => {
        debugger
        dispatch(setPacksDataTC({params: {page}}))
    },[])
    const changePackListSize =  useCallback((pageCount: number,) => {
        debugger
        dispatch(setPacksDataTC({params: {pageCount}}))
    }, [])
    const allMyClickStyle = (style: string) => {
        return cps.allMyClick + ' ' +style
    }
    const allMyStyle = (style: string) => {
        return cps.allMy + ' ' +style
    }
    // if (!isLoggedIn) {
    //     navigate(PATH.LOGIN)
    // }
    return (
        <div className={cps.wrapper}>


            <div className={cps.TableWrapper}>
                <Waiting />
                <span className={cps.content}>
                    <span className={cps.headerBlock}>
                         <h3>Packs list</h3>
                         <ModalContainer
                             title={"Add new pack"}
                             buttonStyle={{
                                 color: "white",
                                 width: "20ch",
                                 fontWeight: "200",
                                 border: "none",
                             }}
                             show={showAddPacksModal}
                             setShow={setShowAddPacksModal}
                             modalStyle={{
                                 backgroundColor: '#FFFFFF',
                                 width: '395px',
                                 height: 'auto',
                                 borderRadius: '2px'
                             }}
                         >
                            <AddPackModal
                                setShow={setShowAddPacksModal}
                                addPack={addPack}
                            />
                         </ModalContainer>
                    </span>
                    <SearchBlock />

                    <div className={cps.tableBlock}>
                        <div className={cps.wrapper_header}>
                            <HeaderTable sorted={sorted} columArr={initialColumnHeadings} setSorting={setSorting}/>
                        </div>
                        {packs?.cardPacks?.length
                            ? <PacksTable
                            deletePackList={deletePackList}
                            editPackList={editPackList}
                            learnPack={learnPack}
                            viewPack={viewPackList}
                            packs={packs}
                            // currentPage={currentPage}
                            // onPageChanged={onPageChanged}
                            // changePackListSize={changePackListSize}
                            />
                            : <div style={{height: "20px", backgroundColor: "#ffffff"}}></div>
                        }
                        <div className={cps.paginationWrapper}>

                            <Paginator cardPacksTotalCount={packs.cardPacksTotalCount}
                                       pageCount={packs.pageCount}
                                       currentPage={packs.page}
                                       onPageChanged={onPageChanged}
                                       portionSize={portionSize}
                            />
                            <PackListSize changePackListSize={changePackListSize}
                                          pageCount={packs.pageCount}
                                          currentPage={packs.page}
                                          onPageChanged={onPageChanged}
                            />
                        </div>
                    </div>

                </span>
            </div>
        </div>

    )
}
