import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const packsAPI = {

    setPacks(param: PacksGetRequestType) {
        return instance.get <PacksGetRequestType, AxiosResponse<PacksGetResponseDataType>>(`cards/pack`,
            param);
    },
    // setSortPacks( sortPackNumber: SortPackNumberType, sortPackName: SortPackNameType) {
    //     return instance.get(`cards/pack?sortPacks=${sortPackNumber}${sortPackName}&pageCount=20`);
    // },
    // postPacks(pack: PacksPostRequestType) {
    //     return instance.post <PacksPostRequestType, AxiosResponse<PacksPostResponseType>>('cards/pack',
    //         pack);
    // },
    // deletePacks(param: PacksDeleteRequestType) {
    //     return instance.delete <PacksDeleteRequestType, AxiosResponse<PacksDeleteResponseType>>('cards/pack',
    //         param);
    // },
    // putPacks(param: PacksPutRequestType) {
    //     return instance.put <PacksPutRequestType, AxiosResponse<PacksPutResponseType>>('cards/pack',
    //         param);
    // },
}
export type PacksGetRequestType = {
    params: PacksGetRequestDataType
}
export type PacksGetRequestDataType = {
    packName?: string, // не обязательно
    min?: number, // не обязательно
    max?: number,  // не обязательно
    sortPacks?: string, // не обязательно
    page?: number, // не обязательно  -  выбранная страница
    pageCount?: number, // не обязательно  -  количество элементов на странице
    user_id?: string,  // не обязательно
    block?: boolean,    // не обязательно. Если вас кто то забанил. То с помощью
                        // данного параметра можно увидеть свои колоды
                        // и поправить их или удалить или обжаловать
}
export type SortPackNumberType = 0 | 1
export type SortPackNameType = 'name' | 'cardsCount' | 'updated' | 'user_name'

export type PacksGetResponseDataType = {
    cardPacks:
        CardPacksType[]
        // [{
        //     _id: string
        //     user_id: string
        //     user_name?:string
        //     name: string
        //     cardsCount: number
        //     created: string
        //     updated: string
        // },]

    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number     // количество элементов на странице
    token?: string,
    tokenDeathTime?: number,
}
export type CardPacksType = {
    _id: string
    user_id: string
    user_name:string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type PacksPostRequestType = {
    cardsPack: {
        name?: string
        deckCover?: string
        private?: boolean
    }
}
export type PacksPostResponseType = {
    newCardsPack: {}
}
export type PacksDeleteRequestType = {
    params: { id: string }
}
export type PacksDeleteResponseType = {
    deletedCardsPack: {}
}
export type PacksPutRequestType = {
    cardsPack: {
        _id: string
        name?: string
    }
}
export type PacksPutResponseType = {
    updatedCardsPack: {}
}



// import { instance } from "./instance";
//
//
//
// export const packsApi = {
//     getPacks: (payload: FetchPacksType) => {
//         return instance.get("/cards/pack", {
//             params: {
//                 ...payload,
//             },
//         });
//     },
// }
//
// export type FetchPacksType = {
//     packName: string;
//     min: number;
//     max: number;
//     sortPacks: string;
//     page: number;
//     pageCount: number;
//     user_id?: string;
// };
