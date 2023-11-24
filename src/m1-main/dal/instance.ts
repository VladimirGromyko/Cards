import axios from "axios";

export const instance = axios.create({
  baseURL:
    // process.env.NODE_ENV === "development"
    //   ?
    //   "http://localhost:7542/2.0/"
    //   :
    //   process.env.REACT_APP_BACK_URL ||
    // "https://cards-back-beta.vercel.app/2.0",
    "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});
