import {
  CardPacksType,
  packsAPI,
  PacksDeleteRequestType,
  PacksGetRequestType,
  PacksGetResponseDataType,
  PacksPostRequestType,
  PacksPutRequestType,
} from "../dal/packs-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadingAC } from "./loadingReducer";
import { createAppAsyncThunk } from "./utils/create-app-asynk-thunk";
import { handleServerNetworkError } from "./utils/error-utils";
import { getAuthUserTC, login } from "./authReducer";
import { authAPI } from "m1-main/dal/auth-api";
import { ActionPackCardType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

export type statePacksModalType = {
  modalAction: ActionPackCardType;
  showModal: boolean;
  currentPack: CardPacksType | null;
};

export const initPacksModalState: statePacksModalType = {
  modalAction: "none",
  showModal: false,
  currentPack: null,
};

const packsModalReducer = createSlice({
  name: "packsModal",
  initialState: initPacksModalState,
  reducers: {
    setPacksModal: (state, action: PayloadAction<any>) => {
      state.modalAction = action.payload;
    },
    // searchPacksData: (state, action: PayloadAction<PacksGetRequestType>) => {
    //   state.packName = action.payload.params.packName;
    // },
    // setCurrentPage: (state, action: PayloadAction<PacksGetRequestType>) => {
    //   state.currentPage = action.payload.params.page ?? state.currentPage;
    // },
    // getMinMaxPacks: (state, action: PayloadAction<PacksGetRequestType>) => {
    //   state.min = action.payload.params.min;
    //   state.max = action.payload.params.max;
    // },
    // filterPacks: (state, action: PayloadAction<PacksGetRequestType>) => {
    //   const isEmpty = (obj: Object) => {
    //     for (let key in obj) {
    //       return false;
    //     }
    //     return true;
    //   };
    //   if (!isEmpty(action.payload.params)) {
    //     const includes = (name: string) =>
    //       Object.keys(action.payload.params).includes(name);
    //     if (includes("sortPacks")) {
    //       state.sortPacks = action.payload.params.sortPacks;
    //     } else if (includes("packName")) {
    //       state.packName = action.payload.params.packName;
    //     }
    //   } else {
    //     return initialPacksState;
    //   }
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setPacksDataTC.fulfilled, (state, action) => {
  //     state.packsData = action.payload;
  //   });
  // },
});
export const packsModalActions = packsModalReducer.actions;
export default packsModalReducer.reducer;
//
// export const setPacksDataTC = createAppAsyncThunk(
//   "setPacks/fetchPacksData",
//   async (packsRequest: PacksGetRequestType, thunkAPI) => {
//     const { dispatch, rejectWithValue, getState } = thunkAPI;
//     const state = getState();
//     const statePacks = state.packs;
//     const packs = packsRequest.params;
//     debugger;
//     try {
//       const includes = (name: string) => Object.keys(packs).includes(name);
//       dispatch(loadingAC("loading"));
//       const params = {
//         pageCount: packs.pageCount ?? statePacks.packsData.pageCount,
//         packName: includes("packName") ? packs.packName : statePacks.packName,
//         page: includes("page") ? packs.page : statePacks.currentPage,
//         sortPacks: includes("sortPacks")
//           ? packs.sortPacks
//           : statePacks.sortPacks,
//         max: includes("max") ? packs.max : statePacks.max,
//         min: includes("min") ? packs.min : statePacks.min,
//         user_id: includes("user_id")
//           ? packs.user_id
//           : statePacks.packsData.authorId,
//       };
//       const res = await packsAPI.setPacks({ params });
//       const resPacks = res.data;
//
//       includes("min") &&
//         includes("max") &&
//         dispatch(
//           packsActions.getMinMaxPacks({
//             params: { min: packs.min, max: packs.max },
//           })
//         );
//       includes("page") &&
//         dispatch(packsActions.setCurrentPage({ params: { page: packs.page } }));
//
//       includes("sortPacks") &&
//         dispatch(
//           packsActions.filterPacks({ params: { sortPacks: packs.sortPacks } })
//         );
//       includes("packName") &&
//         dispatch(
//           packsActions.filterPacks({ params: { packName: packs.packName } })
//         );
//       return {
//         ...resPacks,
//         authorId: includes("user_id")
//           ? packs.user_id
//           : statePacks.packsData.authorId,
//       };
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     } finally {
//       dispatch(loadingAC("succeeded"));
//     }
//   }
// );
// export const addPacksTC = createAppAsyncThunk(
//   "addPack/postNewPack",
//   async (pack: PacksPostRequestType, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       dispatch(loadingAC("loading"));
//       await packsAPI.postPacks(pack);
//       dispatch(setPacksDataTC({ params: {} }));
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     } finally {
//       dispatch(loadingAC("succeeded"));
//     }
//   }
// );
// export const editPackTC = createAppAsyncThunk(
//   "editPack/putPackUpdates",
//   async (param: PacksPutRequestType, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       dispatch(loadingAC("loading"));
//       await packsAPI.putPacks(param);
//       await dispatch(setPacksDataTC({ params: {} }));
//       dispatch(loadingAC("succeeded"));
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     }
//   }
// );
// export const deletePackTC = createAppAsyncThunk(
//   "deletePack/removePackById",
//   async (param: PacksDeleteRequestType, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       dispatch(loadingAC("loading"));
//       await packsAPI.deletePacks(param);
//       await dispatch(setPacksDataTC({ params: {} }));
//       dispatch(loadingAC("succeeded"));
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     }
//   }
// );
