import {PacksGetRequestType, PacksGetResponseDataType} from "../dal/packs-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type utilStateType = {
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

export const initialUtilState : utilStateType = {
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

const utilsReducer = createSlice({
    name: 'packs',
    initialState: initialUtilState,
    reducers: {

        searchPacksData: (state, action: PayloadAction<any>) => {
            state.packName = action.payload.params.packName
        },
    }
});
// export const {
//     setPacksData,
//     filterPacks,
//     searchPacksData
// } = packsReducer.actions
export const utilsActions = utilsReducer.actions
export default utilsReducer.reducer;
