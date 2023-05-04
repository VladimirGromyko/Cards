
import React, {useCallback, useEffect, useState} from "react";
import cps from "./PacksPage.module.css"
import Waiting from "../error-page/Waiting";
import {initialPacksState, setCurrentPageTC, setPacksDataTC} from "../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../bll/hooks";
import { PacksTable } from "./paks-table/PacksTable";
import { HeaderPacks } from "./header-packs/HeaderPacks";
import SearchBlock from "./search-block/SearchBlock";
import Paginator from "../../common/pagination/Paginator";
import {PackListSize} from "../../common/pack-list-size/PackListSize";
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


export const PacksPage = () => {
    // const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    // const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const packs = useAppSelector(state => state.packs.packsData)
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
    // const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.auth.meStatusResponse);
    const authorId = useAppSelector(state => state.packs.packsData.authorId)
    // const [search, setSearch] = useState('')
    // const [isSearching, setIsSearching] = useState(false);
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
        debugger
        if (isLoggedIn === 'done' && step) {
            step = false
            const params = JSON.parse(JSON.stringify(initialPacksState))
            if (params && params.packsData && authorId) params.packsData.authorId = authorId
            dispatch(setPacksDataTC({params}))
        }
    }, [dispatch, isLoggedIn] )


// Block for Add pack
//     const addPack = useCallback((pack: string) => {
//         dispatch(addPacksTC({cardsPack: {name: pack}}))
//     }, [dispatch,])
//
//     const showAddPack = (value: boolean) => {
//         dispatch(showAddPackAC(value))
//     }
//-------------

// Block for Delete pack
//     const deletePackList = useCallback((packName: string, packId: string) => {
//         dispatch(pickDeletePackAC(packName, packId))
//         dispatch(showDeletePackAC(true))
//     }, [dispatch])
//
//     const deletePack = useCallback((packName: string, packId: string) => {
//         dispatch(deletePackTC({params: {id: packId}}))
//     }, [dispatch])
//
//     const showDeletePack = useCallback((value: boolean) => {
//         dispatch(showDeletePackAC(value))
//     },[dispatch])
//-------------

// Block for Edit pack
//     const editPackList = useCallback((packName: string, packId: string) => {
//         dispatch(pickEditPackAC(packName, packId))
//         dispatch(showEditPackAC(true))
//     }, [dispatch])
//
//     const editPack = useCallback((packId: string, namePack: string) => {
//         dispatch(editPackTC({cardsPack: {_id: packId, name: namePack}}))
//     }, [dispatch])
//
//     const showEditPack = useCallback((value: boolean) => {
//         dispatch(showEditPackAC(value))
//     }, [dispatch])
//-------------

    // const learnPack = useCallback((packId: string) => {
    //     // navigate('/packs/' + packId)
    //     navigate('/main/packs-learn/'+ packId)
    // }, [navigate])

    const onPageChanged = (page: number) => {
        debugger
        // dispatch(setPacksDataAC({page: {currentPage: }}))
        dispatch(setCurrentPageTC({page, pageCount: 0}))
    }
    const changePackListSize =  useCallback((pageCount: number, page: number) => {
        dispatch(setCurrentPageTC({
            // briefly hardcoded 1 Cards request
            // params: {
                page,
                // packName: '',
                pageCount
            // }
        }))

        // dispatch(setCurrentPageTC(value))
    }, [dispatch])
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

                {/*ПРАВАЯ СТОРОНА*/}

                <span className={cps.content}>

                    <span className={cps.headerBlock}>
                         <div ><h3>Packs list</h3></div>
                         {/*<ModalAddContainer*/}
                         {/*    addPack={addPack}*/}
                         {/*    showPack={showAddPack}*/}
                         {/*    isLoading={isLoading}*/}
                         {/*    isShownPack={isShownAddPack}*/}
                         {/*/>*/}
                    </span>
                    <SearchBlock />



                    <div className={cps.tableBlock}>
                        <HeaderPacks />
                        {packs && <PacksTable
                            // deletePack={deletePack}
                            // deletePackList={deletePackList}
                            // showDeletePack={showDeletePack}
                            // deletePackId={pickedDeletePack.packId}
                            // deletePackName={pickedDeletePack.packName}
                            // editPack={editPack}
                            // editPackList={editPackList}
                            // showEditPack={showEditPack}
                            // editPackId={pickedEditPack.packId}
                            // editPackName={pickedEditPack.packName}
                            // learnPack={learnPack}
                            packs={packs}
                            // isLoading={isLoading}
                            // isShownEditPack={isShownEditPack}
                            // isShownDeletePack={isShownDeletePack}
                            // currentPage={currentPage}
                            // onPageChanged={onPageChanged}
                            // changePackListSize={changePackListSize}
                        />}
                        <div className={cps.paginationWrapper}>

                            <Paginator cardPacksTotalCount={packs.cardPacksTotalCount}
                                       pageCount={packs.pageCount}
                                       currentPage={packs.page}
                                       onPageChanged={onPageChanged}
                                       portionSize={undefined}
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
