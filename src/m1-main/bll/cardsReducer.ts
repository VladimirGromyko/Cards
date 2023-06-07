import {createSlice} from "@reduxjs/toolkit";
import {
    cardsAPI,
    CardsGetRequestType,
    CardsGetResponseType,
    CardsType,
    PostRequestCardType,
    PutRequestUpdateCardType
} from "../dal/cards-api";
import {createAppAsyncThunk} from "./utils/create-app-asynk-thunk";
import {handleServerNetworkError} from "./utils/error-utils";
import {packsAPI, PacksGetResponseDataType} from "../dal/packs-api";
import {loadingAC} from "./loadingReducer";
import {packsActions, setPacksDataTC} from "./packsReducer";
import {getAuthUserTC} from "./authReducer";


export const initCardsState: CardsGetResponseType = {
    cardsSet: {
        cards: [{
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: null,
            rating: null,
            shots: null,
            type: 'card',
            user_id: '',
            created: '',
            updated: '',
            __v: null,
            _id: '',
        }] as CardsType[],
        cardsTotalCount: 1,
        maxGrade: null,
        minGrade: null,
        page: null,
        pageCount: null,
        packUserId: '',
        packCreated: '',
        packName: '',
        packPrivate: false,
        packUpdated: '',
        token: '',
        tokenDeathTime: null,
    },
    sortCards: '',
}

const cardsReducer = createSlice({
    name: 'cards',
    initialState: initCardsState,
    reducers: {
        // setCards:(state, action: PayloadAction<CardsGetResponseType>) => {
        //     // state.cards = action.payload.cards
        //     // state.cardsTotalCount = action.payload.cardsTotalCount
        //     // state.tokenDeathTime = action.payload.tokenDeathTime
        //     // state.packName = action.payload.packName
        //     // state.page = action.payload.page
        //     // state.pageCount = action.payload.pageCount
        //     // state.maxGrade = action.payload.maxGrade
        //     // state.minGrade = action.payload.minGrade
        //     // state.packCreated = action.payload.packCreated
        //     // state.packPrivate = action.payload.packPrivate
        //     // state.packUpdated = action.payload.packUpdated
        //     // state.packUserId = action.payload.packUserId
        //     // state.token = action.payload.token
        //     return {...state, ...action.payload}
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(setCardsTC.fulfilled, (state, action) => {
            debugger
            // state.meStatus = action.payload.profile;
            state.cardsSet = action.payload.data
            state.sortCards = state.sortCards && action.payload.sortCards ? action.payload.sortCards : ''
        });
    }
});
export const cardsActions = cardsReducer.actions
export default cardsReducer.reducer


// export const cardsReducer = (state: stateCardsType = initState,
//                              action: cardsReducerType): stateCardsType => {
//     switch (action.type) {
//         case "SET-CARDS": {
//             return {
//                 ...state,
//                 ...action.data
//             }
//         }
//         case "CHANGE-CARD": {
//             return {...state};
//         }
//         case "FIND-CARD": {
//             return {...state};
//         }
//         default:
//             return state;
//     }
// };

// export const setCardsAC = (data: statePacksType) => {
//     return { type: "SET-CARDS", data } as const
// }
//
// export const changeCardAC = (card: string) => ({
//     type: 'CHANGE-CARD', card
// } as const)
//
// export const findCardAC = (card: string) => ({
//     type: 'FIND-CARD', card
// } as const)

// export type cardsReducerType = changeCardACType
//     | findCardACType
//     | setCardACType
//
//
// type setCardACType = ReturnType<typeof setCardsAC>
// type changeCardACType = ReturnType<typeof changeCardAC>
// type findCardACType = ReturnType<typeof findCardAC>


export const setCardsTC = createAppAsyncThunk(
    'setCards/fetchCardsData',
    async (cardsRequest: CardsGetRequestType, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI
        // const state = getState()
        try {
            dispatch(loadingAC('loading'))
            const res = await cardsAPI.getCards({params: cardsRequest})
            return {data: res.data, sortCards: cardsRequest.sortCards,}
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(loadingAC('succeeded'))
        }
    }
)
export const addCardTC = createAppAsyncThunk('addCard/newCard', async ( card:PostRequestCardType, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    debugger
    try {
        dispatch(loadingAC('loading'))
        await cardsAPI.addCard({card})
        await dispatch(setCardsTC({cardsPack_id: card.cardsPack_id, pageCount: 1000}))
    } catch (err) {
        debugger
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(loadingAC('succeeded'))
    }
})
export const deleteCardTC = createAppAsyncThunk('deleteCard/removeCard',
    async ( card: {cardId: string | undefined, packId: string | undefined}, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    debugger
    try {
        dispatch(loadingAC('loading'))
        await cardsAPI.deleteCard({id: card.cardId})
        await dispatch(setCardsTC({cardsPack_id: card.packId, pageCount: 1000}))
    } catch (err) {
        debugger
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(loadingAC('succeeded'))
    }
})
export const updateCardTC = createAppAsyncThunk('deleteCard/removeCard',
    async ( card: PutRequestUpdateCardType, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI
        debugger
        try {
            dispatch(loadingAC('loading'))
            await cardsAPI.updateCard(card)
            await dispatch(setCardsTC({cardsPack_id: card.cardsPack_id, pageCount: 1000}))
        } catch (err) {
            debugger
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(loadingAC('succeeded'))
        }
    })


