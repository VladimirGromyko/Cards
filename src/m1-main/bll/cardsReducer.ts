import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  cardsAPI,
  CardsGetRequestType,
  CardsGetResponseType,
  CardsType,
  GradeCardPayload,
  PostRequestCardType,
  PutRequestUpdateCardType,
} from "../dal/cards-api";
import { createAppAsyncThunk } from "./utils/create-app-asynk-thunk";
import { handleServerNetworkError } from "./utils/error-utils";
import { loadingAC } from "./loadingReducer";

export const initCardsState: CardsGetResponseType = {
  cardsSet: {
    cards: [
      {
        answer: "",
        question: "",
        cardsPack_id: "",
        grade: null,
        rating: null,
        shots: null,
        type: "card",
        user_id: "",
        created: "",
        updated: "",
        __v: null,
        _id: "",
      },
    ] as CardsType[],
    cardsTotalCount: 1,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
    packUserId: "",
    packCreated: "",
    packName: "",
    packPrivate: false,
    packUpdated: "",
    token: "",
    tokenDeathTime: null,
  },
  sortCards: "",
};

const cardsReducer = createSlice({
  name: "cards",
  initialState: initCardsState,
  reducers: {
    setCards: (state, action: PayloadAction<CardsGetResponseType>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCardsTC.fulfilled, (state, action) => {
      // state.meStatus = action.payload.profile;
      state.cardsSet = action.payload.data;
      state.sortCards =
        state.sortCards && action.payload.sortCards
          ? action.payload.sortCards
          : "";
    });
  },
});
export const cardsActions = cardsReducer.actions;
export default cardsReducer.reducer;

export const setCardsTC = createAppAsyncThunk(
  "setCards/fetchCardsData",
  async (cardsRequest: CardsGetRequestType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(loadingAC("loading"));
    try {
      const res = await cardsAPI.getCards({ params: cardsRequest });
      return { data: res.data, sortCards: cardsRequest.sortCards };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const addCardTC = createAppAsyncThunk(
  "addCard/newCard",
  async (card: PostRequestCardType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(loadingAC("loading"));
      await cardsAPI.addCard({ card });
      await dispatch(
        setCardsTC({ cardsPack_id: card.cardsPack_id, pageCount: 1000 })
      );
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const deleteCardTC = createAppAsyncThunk(
  "deleteCard/removeCard",
  async (
    card: { cardId: string | undefined; packId: string | undefined },
    thunkAPI
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(loadingAC("loading"));
      await cardsAPI.deleteCard({ id: card.cardId });
      await dispatch(
        setCardsTC({ cardsPack_id: card.packId, pageCount: 1000 })
      );
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const updateCardTC = createAppAsyncThunk(
  "deleteCard/removeCard",
  async (card: PutRequestUpdateCardType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(loadingAC("loading"));
      await cardsAPI.updateCard(card);
      await dispatch(
        setCardsTC({ cardsPack_id: card.cardsPack_id, pageCount: 1000 })
      );
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
export const gradeCardTC = createAppAsyncThunk(
  "gradeCard/cardStatus",
  async (card: GradeCardPayload, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(loadingAC("loading"));
      await cardsAPI.gradeCard({ grade: card.grade, card_id: card.card_id });
      await dispatch(
        setCardsTC({ cardsPack_id: card.cardsPack_id, pageCount: 1000 })
      );
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(loadingAC("succeeded"));
    }
  }
);
