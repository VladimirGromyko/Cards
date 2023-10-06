import { RootState } from "m1-main/bll/store";
import { useAppSelector } from "m1-main/bll/hooks";

const packs = (state: RootState) => state.packs.packsData;
const sorted = (state: RootState) => state.packs.sortPacks;
const authorId = (state: RootState) => state.packs.packsData.authorId;
// const selectUserAvatar = (state: RootState) => state.auth.meStatus?.avatar
// const selectIsLoggedIn = (state: RootState) => state.auth.meStatusResponse

export const packsSelector = {
  packs,
  sorted,
  authorId,
};
