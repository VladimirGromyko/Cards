import {instance} from "./instance";
import {AxiosResponse} from "axios";

// export const authsAPI = {

    // updateUser(name: string) {
    //     return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    // }
// }
export type SortCardsHeaderType = 'question' | 'answer' | 'updated' | 'grade' | 'none'
export const cardsAPI = {

    getAllCards(params:{cardsPackId: string, pageCount?:string, sortNumber?:SortNumberType, sortName?: SortNameType , search?:string}) {
        return instance.get(`/cards/card?cardsPack_id=${params.cardsPackId}&pageCount=${params.pageCount}&sortCards=${params.sortNumber}${params.sortName}&cardQuestion=${params.search}`);
    },
    getCards(param: {params: CardsGetRequestType}) {
        debugger
        return instance.get<CardsGetRequestType, AxiosResponse<CardsSetType>>('cards/card', param);
    },
    addCard(params:{cardsPack_id: string, question: string, answer:string}){
        return  instance.post(`/cards/card`, {card: {cardsPack_id:params.cardsPack_id, question:params.question, answer:params.answer}})
    },
    deleteCard(params:{cardId: string}){
        return instance.delete(`/cards/card?id=${params.cardId}`)
    },
    updateCard(params:{cardId: string, newQuestion?: string}){
        return instance.put(`/cards/card`, {card: {_id:params.cardId, question:params.newQuestion}})
    },
    gradeCard: (payload: GradeCardPayload) => {
        return instance.put("/cards/grade", { ...payload });
    },
}

export type SortNumberType = 0 | 1

export type SortNameType = 'question' | 'answer' | 'updated' | 'grade'
export type GradeCardPayload = {
    grade: number;
    card_id: string;
};

export type CardsGetRequestType = {
    cardAnswer?: string // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string | undefined
    min?: number // не обязательно
    max?: number // не обязательно
    sortCards?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number | null
    rating?: number | null
    shots?: number | null
    type?: string
    user_id?: string
    created?: string
    updated?: string
    __v?: number | null
    _id?: string
}
export type CardsGetResponseType = {
    cardsSet: CardsSetType,
    sortCards: string,
}
export type CardsSetType = {
    cards: CardsType[]
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number | null
    pageCount: number | null
    packUserId: string
    packCreated: string
    packName: string,
    packPrivate: boolean,
    packUpdated: string,
    token: string,
    tokenDeathTime: number | null,
}
