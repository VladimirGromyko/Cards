import { RootState } from "m1-main/bll/store";

const userName = (state: RootState) => state.auth.meStatus?.name;
const userEmail = (state: RootState) => state.auth.meStatus?.email;
const userAvatar = (state: RootState) => state.auth.meStatus?.avatar;
// const isLoggedIn = (state: RootState) => state.auth.meStatusResponse;

export const authSelector = {
  userName,
  userEmail,
  userAvatar,
  // isLoggedIn,
};
