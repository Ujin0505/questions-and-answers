export type GetAnswerData = {
    id: number,
    questionId: number,
    content: string,
    userName: string,
    created: string
}

export type PostAnswerData = {
    questionId: number,
    content: string,
}