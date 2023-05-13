import {
    packsAPI, PacksDeleteRequestType,
    PacksGetRequestDataType,
    PacksGetRequestType,
    PacksGetResponseDataType,
    PacksPostRequestType
} from "../dal/packs-api"
import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppActionType, RootState} from "./store";
import { loadingAC } from "./loadingReducer";
import {createAppAsyncThunk} from "./utils/create-app-asynk-thunk";
import {handleServerNetworkError} from "./utils/error-utils";

export type statePacksType = {
    packsData: PacksGetResponseDataType //| null
    // updatedCardsPack: {} | null
    // isShownMainPage: boolean
    // isShownEditPack: boolean
    // isShownAddPack: boolean
    // isShownDeletePack: boolean
    pickedEditPack: { packName: string, packId: string }
    pickedDeletePack: { packName: string, packId: string }
    currentPage: number
    sortPacks?: string,
    max?: number,
    min?: number,
    packName?: string,
}

export const initialPacksState : statePacksType = {
    packsData: {
        pageCount: 20,
        authorId: '',
    } as PacksGetResponseDataType,
    // updatedCardsPack: null,
    // isShownMainPage: true,
    // isShownEditPack: false,
    // isShownAddPack: false,
    // isShownDeletePack: false,
    pickedEditPack: {packName: '', packId: ''},
    pickedDeletePack: {packName: '', packId: ''},
    currentPage: 1,
    max: 100,
    min: 0,
    packName: '',
    sortPacks: '',
}
// } as statePacksType

const packsReducer = createSlice({
    name: 'packs',
    initialState: initialPacksState,
    reducers: {
        setPacksData:(state, action: PayloadAction<PacksGetResponseDataType>) => {
            state.packsData = action.payload
            // if (state.packsData === null) {
            //     state.packsData.cardPacks = action.payload.cardPacks
            //     state.packsData.page = action.payload.page
            //     state.packsData.pageCount = action.payload.pageCount
            //     state.packsData.cardPacksTotalCount = action.payload.cardPacksTotalCount
            //     state.packsData.minCardsCount = action.payload.minCardsCount
            //     state.packsData.maxCardsCount = action.payload.maxCardsCount

            // }
            console.log(state.packsData)
        },
        searchPacksData: (state, action: PayloadAction<PacksGetRequestType>) => {
            state.packName = action.payload.params.packName
        },
        setCurrentPage: (state, action: PayloadAction<PacksGetRequestType>) => {
            state.currentPage = action.payload.params.page ?? state.currentPage
        },
        getMinMaxPacks: (state, action: PayloadAction<PacksGetRequestType>) => {
            state.min = action.payload.params.min
            state.max = action.payload.params.max
        },
        filterPacks: (state, action: PayloadAction<PacksGetRequestType>) => {
            const isEmpty = (obj: Object) => {
                for(let key in obj)
                {
                    return false;
                }
                return true;
            }
            if (!isEmpty(action.payload.params)) {
                const includes = (name: string) => Object.keys(action.payload.params).includes(name)
                if (includes("sortPacks")) {
                    state.sortPacks = action.payload.params.sortPacks
                } else if (includes("packName")) {
                    state.packName = action.payload.params.packName
                }
            } else {
                state = initialPacksState
            }
        }
    }
});
// export const {
//     setPacksData,
//     filterPacks,
//     searchPacksData
// } = packsReducer.actions
export const packsActions = packsReducer.actions
export default packsReducer.reducer

// export const packsReducer = (state: statePacksType = initState,
//                              action: PacksReducerType): statePacksType => {
//     switch (action.type) {
//         case "SET_PACKS_DATA": {
//             return {...state, packsData: action.packsData}
//         }
//         case "SORT-PACKS" : {
//             return {...state, sort: action.sort}
//         }
//         case "MIN-MAX-PACKS":{
//             return {...state, max: action.max, min:action.min}
//         }
//         case "SEARCH-PACK":{
//             return {...state, packName: action.packName}
//         }
//         case "SHOW_MAIN_PAGE": {
//             return {...state, isShownMainPage: action.isShownMainPage}
//         }
//         case "EDIT_PACK": {
//             return {...state, updatedCardsPack: action.updatedCardsPack}
//         }
//         case "SHOW_EDIT_PACK": {
//             return {...state, isShownEditPack: action.isShownEditPack}
//         }
//         case "PICK_EDIT_PACK": {
//             return {...state, pickedEditPack: {packName: action.packName, packId: action.packId}}
//         }
//         case "PICK_DELETE_PACK": {
//             return {...state, pickedDeletePack: {packName: action.packName, packId: action.packId}}
//         }
//         case "SHOW_ADD_PACK": {
//             return {...state, isShownAddPack: action.isShownAddPack}
//         }
//         case "SHOW_DELETE_PACK": {
//             return {...state, isShownDeletePack: action.isShownDeletePack}
//         }
//         case "SET_CURRENT_PAGE": {
//             return {...state, currentPage: action.currentPage}
//         }
//         default:
//             return state;
//     }
// };

// export const setPacksDataAC = (packsData: PacksGetResponseDataType) => (
//     {type: 'SET_PACKS_DATA', packsData}) as const
//
// export const sortPacksAC = (sort?: string) => (
//     {type: 'SORT-PACKS', sort}) as const
//
// export const getMinMaxPacksAC = (min?: number, max?: number) => (
//     {type: 'MIN-MAX-PACKS', min, max}) as const
//
// export const searchPackAC = (packName:string) => (
//     {type: 'SEARCH-PACK', packName}) as const
//
// export const editPackAC = (updatedCardsPack: {}) => (
//     {type: 'EDIT_PACK', updatedCardsPack}) as const
//
// export const pickEditPackAC = (packName: string, packId: string) => (
//     {type: 'PICK_EDIT_PACK', packName, packId}) as const
//
// export const pickDeletePackAC = (packName: string, packId: string) => (
//     {type: 'PICK_DELETE_PACK', packName, packId}) as const
//
// export const showMainPageAC = (isShownMainPage: boolean) => (
//     {type: 'SHOW_MAIN_PAGE', isShownMainPage}) as const
//
// export const showEditPackAC = (isShownEditPack: boolean) => (
//     {type: 'SHOW_EDIT_PACK', isShownEditPack}) as const
//
// export const showAddPackAC = (isShownAddPack: boolean) => (
//     {type: 'SHOW_ADD_PACK', isShownAddPack}) as const
//
// export const showDeletePackAC = (isShownDeletePack: boolean) => (
//     {type: 'SHOW_DELETE_PACK', isShownDeletePack}) as const
//
// export const setCurrentPageAC = (currentPage: number) => (
//     {type: 'SET_CURRENT_PAGE', currentPage}) as const



export const setPacksDataTC = createAppAsyncThunk(
    'setPacks/fetchPacksData',
    async (packsRequest: PacksGetRequestType, thunkAPI ) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI
        const state = getState()
        const statePacks = state.packs
        const packs = packsRequest.params
        try {
            const includes = (name: string) => Object.keys(packs).includes(name)
            dispatch(loadingAC('loading'))
            debugger
            const params = {
                pageCount: packs.pageCount ?? statePacks.packsData.pageCount,
                packName: includes('packName') ? packs.packName : statePacks.packName,
                page:  includes('page') ? packs.page : statePacks.currentPage,
                sortPacks: includes('sortPacks') ? packs.sortPacks : statePacks.sortPacks,
                max: includes('max') ? packs.max : statePacks.max,
                min: includes('min') ? packs.min : statePacks.min,
                user_id: includes('user_id') ? packs.user_id : statePacks.packsData.authorId,
            }
            const res = await packsAPI.setPacks({params})
            const resPacks = res.data
            dispatch(packsActions.setPacksData({...resPacks, authorId: includes('user_id') ? packs.user_id : statePacks.packsData.authorId}))

            includes('min') && includes('max') && dispatch(packsActions.getMinMaxPacks({params: {min: packs.min, max: packs.max}}))
            includes('page') && dispatch(packsActions.setCurrentPage({params: {page: packs.page}}))

            includes('sortPacks') && dispatch(packsActions.filterPacks({params: {sortPacks: packs.sortPacks}}))
            includes('packName') && dispatch(packsActions.filterPacks({params: {packName: packs.packName}}))

            dispatch(loadingAC('succeeded'))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }

})

// export const setPacksDataTC = (packsRequest: PacksGetRequestType) =>
//     (dispatch: Dispatch<PayloadAction<AppActionType>>, getState: ()=> RootState) => {
//         dispatch(loadingAC('loading'))
//         const packs = packsRequest.params
//         const statePacks = getState().packs
//         const includes = (name: string) => Object.keys(packs).includes(name)
//
//         return packsAPI.setPacks({
//             params:{
//                 pageCount: packs.pageCount ?? statePacks.packsData.pageCount,
//                 packName: includes('packName') ? packs.packName : statePacks.packName,
//                 page: statePacks.currentPage,
//                 sortPacks: includes('sortPacks') ? packs.sortPacks : statePacks.sortPacks,
//                 max: packs.max ?? statePacks.max,
//                 min: packs.min ?? statePacks.min,
//                 user_id: includes('user_id') ? packs.user_id : statePacks.packsData.authorId,
//             }
//         })
//             .then((res) => {
//                 dispatch(packsActions.setPacksData({...res.data, authorId: includes('user_id') ? packs.user_id : statePacks.packsData.authorId}))
//                 includes('sortPacks') && dispatch(packsActions.filterPacks({params: {sortPacks: packs.sortPacks}}))
//                 includes('packName') && dispatch(packsActions.filterPacks({params: {packName: packs.packName}}))
//
//             })
//             .catch((err) => {
//                 console.log(err.response.data.error)
//                 // dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
//                 // setTimeout(() => {
//                 //     dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
//                 // }, 1000)
//             })
//             .finally(() => {
//                 dispatch(loadingAC('succeeded'))
//                 // dispatch(showMainPageAC(false))
//             })
//
// }
//



// export const getPacksByMinMaxTC = createAppAsyncThunk(
//     'packPage/setCurrentPage',
//     async (payload: {min: number, max: number}, thunkAPI) => {
//         const {dispatch, rejectWithValue, getState} = thunkAPI
//         try {
//             dispatch(loadingAC('loading'))
//             const state = getState()
//             await packsAPI.setPacks({
//                 params:{
//                     pageCount: state.packs.packsData.pageCount,
//                     sortPacks: state.packs.sortPacks,
//                     packName: state.packs.packName,
//                     page: state.packs.currentPage,
//                     max: payload.max,
//                     min: payload.min,
//                     user_id: state.packs.packsData.authorId,
//                 }
//             }).then(res => {
//                 dispatch(packsActions.getMinMaxPacks({params: {min: payload.min, max: payload.max}}))
//                 dispatch(packsActions.setPacksData({...res.data, authorId: state.packs.packsData.authorId}))
//             }
//             )
//         } catch (error) {
//             handleServerNetworkError(error, dispatch)
//             return rejectWithValue(null)
//         } finally {
//             dispatch(loadingAC('succeeded'))
//         }
//     }
// )


// export const getPacksByMinMaxTC = (min:number, max:number):ThunkType =>
//     (dispatch, getState) => {
//     dispatch(loadingAC('loading'))
//         packsAPI.setPacks({
//             params:{
//                 pageCount:getState().packs.packsData.pageCount,
//                 sortPacks: getState().packs.sort,
//                 packName: getState().packs.packName,
//                 page:getState().packs.currentPage,
//                 max: max,
//                 min: min,
//             }
//         }).then(res => {
//             dispatch(getMinMaxPacksAC(min,max))
//             dispatch(setPacksDataAC(res.data))
//     }).catch((err) => {
//         dispatch(loadingAC('succeeded'))
//     })
//         .finally(() => {
//             dispatch(loadingAC('succeeded'))
//
//         })
// }
//
// export const getSearchPackByNameTC = (packName:string):ThunkType =>
//     (dispatch, getState) => {
//         dispatch(loadingAC('loading'))
//         packsAPI.setPacks({
//             params:{
//                 pageCount:getState().packs.packsData.pageCount,
//                 sortPacks: getState().packs.sort,
//                 max: getState().packs.max,
//                 min: getState().packs.min,
//                 page:getState().packs.currentPage,
//                 packName: packName,
//             }
//         }).then(res => {
//             dispatch(searchPackAC(packName))
//             dispatch(setPacksDataAC(res.data))
//         }).catch((err) => {
//             dispatch(loadingAC('succeeded'))
//         })
//             .finally(() => {
//                 dispatch(loadingAC('succeeded'))
//
//             })
//     }
//

// Делаю thunk на redux toolkit
// export const setCurrentPageTC = createAppAsyncThunk(
//     'packPage/setCurrentPage',
//     async (payload: {page: number, pageCount: number}, thunkAPI ) => {
//         debugger
//         const {dispatch, rejectWithValue, getState} = thunkAPI
//         try {
//             const state = getState()
//             dispatch(packsActions.setCurrentPage({params: {page: payload.page}}))
//             dispatch(setPacksDataTC({
//                 params: {
//                     page: payload.page,
//                     pageCount: payload.pageCount ? payload.pageCount : getState().packs.packsData.pageCount,
//                     sortPacks: state.packs.sortPacks,
//                     // sortPacks: state.packs.sort,
//                     max: state.packs.max,
//                     min: state.packs.min,
//                     packName: state.packs.packName,
//                 }
//             }))
//         } catch (error: any) {
//             return rejectWithValue(error)
//         }
//
//     }
// )
// export const setCurrentPageThunk = {setCurrentPageTC}
//
// (payload: {page: number, pageCount: number}):ThunkType =>
//     (dispatch: Dispatch<PayloadAction<AppActionType>>, getState: ()=> RootState) => {
//     // dispatch(setCurrentPageAC(payload.page))
//     dispatch(setPacksDataTC({
//         params: {
//             page: payload.page,
//             pageCount: payload.pageCount ? payload.pageCount : getState().packs.packsData.pageCount,
//             sortPacks: getState().packs.sort,
//             max: getState().packs.max,
//             min: getState().packs.min,
//             packName: getState().packs.packName,
//         }
//     }))
// }
//-------------------

// export const setCurrentPageTC = (payload: {page: number, pageCount: number}):ThunkType =>
//     (dispatch: Dispatch<PayloadAction<AppActionType>>, getState: ()=> RootState) => {
//     // dispatch(setCurrentPageAC(payload.page))
//     dispatch(setPacksDataTC({
//         params: {
//             page: payload.page,
//             pageCount: payload.pageCount ? payload.pageCount : getState().packs.packsData.pageCount,
//             sortPacks: getState().packs.sort,
//             max: getState().packs.max,
//             min: getState().packs.min,
//             packName: getState().packs.packName,
//         }
//     }))
// }
//
export const addPacksTC = createAppAsyncThunk(
    'addPack/postNewPack',
    async (pack: PacksPostRequestType, thunkAPI ) => {
        const {dispatch, rejectWithValue} = thunkAPI
        debugger
        try {
            dispatch(loadingAC('loading'))
            await packsAPI.postPacks(pack)
            dispatch(setPacksDataTC({params: {}}))
            dispatch(loadingAC('succeeded'))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
// export const addPacksTC = (pack: PacksPostRequestType): ThunkType =>
//     (dispatch, getState) => {
//         dispatch(loadingAC('loading'))
//         packsAPI.postPacks(pack)
//             .then((res) => {
//                 dispatch(responseConfirmAC(true,
//                     'addPack', 'Pack has been successfully added!'))
//                 dispatch(setPacksDataTC({
//                     params: {
//                         page: getState().packs.packsData.page,
//                         pageCount: getState().packs.packsData.pageCount,
//                         user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
//                     }
//                 }))
//             })
//             .catch((err) => {
//                 dispatch(responseErrorAC(true, 'addPack', err.response?.data.error))
//             })
//             .finally(() => {
//                 dispatch(loadingAC('succeeded'))
//                 setTimeout(() => {
//                     // dispatch(showAddPackAC(false))
//                     dispatch(showAddPackAC(false))
//                     dispatch(responseConfirmAC(false,
//                         'addPack', ''))
//                     dispatch(responseErrorAC(false, 'addPack', ''))
//                 }, 1000)
//             })
//     }
//
// export const editPackTC = (param: PacksPutRequestType):ThunkType =>
//     (dispatch, getState) => {
//     dispatch(loadingAC('loading'))
//     packsAPI.putPacks(param)
//         .then((res) => {
//             // dispatch(showEditPackAC(true))
//             // dispatch(editPackAC(res.data.updatedCardsPack))
//             dispatch(setPacksDataTC({
//                 params: {
//                     page: getState().packs.packsData.page,
//                     pageCount: getState().packs.packsData.pageCount,
//                     user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
//                 }
//             }))
//             dispatch(responseConfirmAC(true,
//                 'editPack', 'Pack name has been successfully changed!'))
//         })
//         .catch((err) => {
//             // dispatch(showEditPackAC(true))
//             dispatch(responseErrorAC(true, 'editPack', err.response?.data.error))
//             setTimeout(() => {
//             }, 1000)
//         })
//         .finally(() => {
//             dispatch(loadingAC('succeeded'))
//             setTimeout(() => {
//                 dispatch(responseConfirmAC(false, 'editPack', ''))
//                 dispatch(showEditPackAC(false))
//                 dispatch(responseErrorAC(false, 'editPack', ''))
//             }, 1000)
//         })
// }

export const deletePackTC = createAppAsyncThunk(
    'deletePack/removePackById',
    async (param: PacksDeleteRequestType, thunkAPI ) => {
        const {dispatch, rejectWithValue} = thunkAPI
        debugger
        try {
            dispatch(loadingAC('loading'))
            debugger
            const res = await packsAPI.deletePacks(param)
            dispatch(setPacksDataTC({params: {}}))
            dispatch(loadingAC('succeeded'))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })

// export const deletePackTC = (param: PacksDeleteRequestType): ThunkType =>
//     (dispatch, getState) => {
//
//         dispatch(loadingAC('loading'))
//         packsAPI.deletePacks(param)
//             .then((res) => {
//                 dispatch(responseConfirmAC(true,
//                     'deletePack', 'Pack has been successfully removed!'))
//                 dispatch(setPacksDataTC({
//                     params: {
//                         page: getState().packs.packsData.page,
//                         pageCount: getState().packs.packsData.pageCount,
//                         user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
//                     }
//                 }))
//             })
//             .catch((err) => {
//                 dispatch(responseErrorAC(true, 'deletePack', err.response?.data.error))
//             })
//             .finally(() => {
//                 dispatch(loadingAC('succeeded'))
//                 setTimeout(() => {
//                     dispatch(showDeletePackAC(false))
//                     dispatch(responseConfirmAC(false, 'deletePack', ''))
//                     dispatch(responseErrorAC(false, 'deletePack', ''))
//                 }, 1000)
//             })
//
//     }
//
// type SetPacksDataACType = ReturnType<typeof setPacksDataAC>
// type editPackACType = ReturnType<typeof editPackAC>
// type showMainPageACType = ReturnType<typeof showMainPageAC>
// type showEditPackACType = ReturnType<typeof showEditPackAC>
// type showAddPackACType = ReturnType<typeof showAddPackAC>
// type showDeletePackACType = ReturnType<typeof showDeletePackAC>
// type pickEditPackACType = ReturnType<typeof pickEditPackAC>
// type pickDeletePackACType = ReturnType<typeof pickDeletePackAC>
// type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
// type setSortPacksACType = ReturnType<typeof sortPacksAC>
// type getMinMaxPacksACType = ReturnType<typeof getMinMaxPacksAC>
// type searchPackACType = ReturnType<typeof searchPackAC>
//
// export type PacksReducerType = SetPacksDataACType
//     | LoadingACType
//     | showMainPageACType
//     | editPackACType
//     | showEditPackACType
//     | ResponseErrorACType
//     | ResponseConfirmACType
//     | pickEditPackACType
//     | showAddPackACType
//     | showDeletePackACType
//     | pickDeletePackACType
//     | setCurrentPageACType
//     | setSortPacksACType
//     | getMinMaxPacksACType
//     | searchPackACType
