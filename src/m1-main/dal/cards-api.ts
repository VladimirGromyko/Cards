import {instance} from "./instance";
import {AxiosResponse} from "axios";

export type SortCardsHeaderType = 'question' | 'answer' | 'updated' | 'grade' | 'none'
export const cardsAPI = {

    getAllCards(params:{cardsPackId: string, pageCount?:string, sortNumber?:SortNumberType, sortName?: SortNameType , search?:string}) {
        return instance.get(`/cards/card?cardsPack_id=${params.cardsPackId}&pageCount=${params.pageCount}&sortCards=${params.sortNumber}${params.sortName}&cardQuestion=${params.search}`);
    },
    getCards(param: {params: CardsGetRequestType}) {
        return instance.get<CardsGetRequestType, AxiosResponse<CardsSetType>>('cards/card', param);
    },
    addCard(param:{card: PostRequestCardType}){
        return  instance.post<PostRequestCardType, AxiosResponse>(`/cards/card`, param)
    },
    deleteCard(params:{id: string | undefined}){
        return instance.delete(`/cards/card?id=${params.id}`)
    },
    updateCard(params: PutRequestUpdateCardType){
        return instance.put<PutRequestUpdateCardType, AxiosResponse>(`/cards/card`, {card: params})
    },
    gradeCard: (params: GradeCardPayload) => {
        return instance.put<GradeCardPayload, AxiosResponse<any>>("/cards/grade", params);
    },
}

export type SortNumberType = 0 | 1

export type SortNameType = 'question' | 'answer' | 'updated' | 'grade'
export type GradeCardPayload = {
    grade: number;
    card_id: string;
    cardsPack_id?: string
}

export type CardsGetRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string | undefined
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id?: string
    grade?: number | null
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
export type PostRequestCardType = {
    cardsPack_id: string
    answer: string
    question: string
    grade?: number | null
    shots?: number | null
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type PutRequestUpdateCardType = {
    _id: string | undefined,
    question?: string
    answer?: string
    cardsPack_id?: string
}
