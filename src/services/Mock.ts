import {GetQuestionData} from "../types/QuestionTypes";

const questions: GetQuestionData[] = [
    {
        id: 1,
        title: "title",
        content: "content",
        userName: "User3",
        created: new Date().toString(),
        answers: [
            {
                id: 1,
                questionId: 1,
                content: "answer1",
                userName: "User1",
                created: new Date().toString()
            },
            {
                id: 2,
                questionId: 1,
                content: "answer2",
                userName: "User2",
                created: new Date().toString()
            }
        ]
    },
    {
        id: 2,
        title: "title2",
        content: "content2",
        userName: "User3",
        created: new Date().toString(),
        answers: []
    }
]

export const getAllQuestions = (): GetQuestionData[] =>{
    return questions;
}
export const getUnAnsweredQuestions = async (): Promise <GetQuestionData[]> =>{

    await wait(500);
    return questions.filter(q => q.answers.length === 0);
}
export const getQuestion = async (questionId: number): Promise<GetQuestionData | null> =>{
    await wait(500);
    const results = questions.filter(q => q.id === questionId);
    return results.length == 0 ? null : results[0];
}
export const searchQuestions = async (criteria: string): Promise<GetQuestionData[]> =>{
    await  wait(500);
    const results = questions.filter(q=> q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
                                         q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0)
    return results;
}

const wait = (ms: number) : Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

// Server
/*export interface  QuestionsDataAPI {
    questionId: number,
    title: string,
    content: string,
    userName: string,
    created: string,
    answers: AnswerDataAPI[]
}*/
/*export interface AnswerDataAPI {
    answerId: number,
    questionId: number,
    content: string,
    userName: string,
    created: string
}*/
/*export const mapQuestionFromServer = (question: QuestionsDataAPI): GetQuestionData => (
    {...question,
        created: new Date(question.created.substr(0, 19)),
        answers: question.answers.map(answer => ({
            ...answer,
            created: new Date(answer.created.substr(0, 19))
        }))
    });*/

