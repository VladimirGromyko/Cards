import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionPackCardType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

export type statePacksModalType = {
  modalAction: ActionPackCardType;
  showModal?: boolean;
  currentPack: {
    _id?: string;
    name?: string;
    status?: boolean;
  };
};

export const initPacksModalState: statePacksModalType = {
  modalAction: "none",
  showModal: false,
  currentPack: {
    _id: "",
    name: "",
    status: false,
  },
};

const packsModalReducer = createSlice({
  name: "packsModal",
  initialState: initPacksModalState,
  reducers: {
    setPacksModal: (state, action: PayloadAction<statePacksModalType>) => {
      if (action.payload.modalAction) {
        state.modalAction = action.payload.modalAction;
      }
      if (action.payload.currentPack) {
        state.currentPack._id = action.payload.currentPack._id;
        state.currentPack.name = action.payload.currentPack.name;
        state.currentPack.status = action.payload.currentPack.status;
      }
      if (action.payload.showModal !== undefined) {
        state.showModal = action.payload.showModal;
      }
    },
  },
});
export const { setPacksModal } = packsModalReducer.actions;
export default packsModalReducer.reducer;
