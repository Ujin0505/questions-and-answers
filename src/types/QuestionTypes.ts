import {GetAnswerData} from "./AnswerTypes";

export type GetQuestionData = {
    id: number,
    title: string,
    content: string,
    userName: string,
    created: string,
    answers: GetAnswerData[]
}
export type PostQuestionData = {
    title: string,
    content: string,
}