import axios, {AxiosInstance} from 'axios';
import {GetAnswerData, PostAnswerData} from "../types/AnswerTypes";
import {GetQuestionData, PostQuestionData} from "../types/QuestionTypes";
import {getAccessToken} from "../Auth";

const instance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:5001/api/',
    withCredentials: true,

})

/*const getUnansweredQuestions = async (): Promise<QuestionData[]> =>{
    const responce = await instance.get("questions")
    let questions: QuestionData[] = [{content: 'content', title: 'title', questionId: 1, created: new Date(), userName: 'userName', answers: []}];
    return questions;
}*/

const getQuestion = async(id: number): Promise<GetQuestionData | null> =>{
    try {
        const token = await getAccessToken();
        instance.defaults.headers["Authorization"] = `Bearer ${token}`;

        const response = await instance.get<GetQuestionData>(`questions/${id}`);
        console.log(response)

        if(response.status === 200)
        {
            return response.data
            /*return {
                id: response.data.id,
                title: response.data.title,
                content: response.data.content,
                userName: response.data.userName,
                created: new Date(response.data.created dateCreated),
                answers: response.data.answers
            }*/
        }
    }
    catch (e) {
        console.log(e)
    }
    return null;
}
const getQuestions = async (filter: string | null = null): Promise<GetQuestionData[]> =>{
    let questions: GetQuestionData[] = [];
    try {

        const url = filter === null ? "questions" : `questions?search=${filter}`;
        const response = await instance.get<GetQuestionData[]>(url);
        if(response.status === 200)
        {
            return response.data;
            /*questions = response.data.map((item: any) => {
                return {
                    questionId: item.id,
                    title: item.title,
                    content: item.content,
                    userName: item.userName,
                    created: new Date(item.dateCreated),
                    answers: item.answers
                }
            });*/
        }
    }
    catch (e) {
        console.log(e)
    }
    return questions;
}
const postQuestion = async(data: PostQuestionData): Promise<GetQuestionData| null> =>{
    const token = await getAccessToken();
    instance.defaults.headers["Authorization"] = `Bearer ${token}`;

    const response = await instance.post<GetQuestionData>("questions", data);
    if(response.status === 201)
    {
        return response.data;
        /*return {
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            userName: response.data.userName,
            created: new Date(response.data.dateCreated),
            answers: []
        }*/
    }
    return null;
}
const postAnswer = async (data: PostAnswerData): Promise<GetAnswerData| null> => {
    const token = await getAccessToken();
    instance.defaults.headers["Authorization"] = `Bearer ${token}`;

    const response = await instance.post<GetAnswerData>(`questions/${data.questionId}/answers/`, data);
    if(response.status === 201)
    {
        return response.data;
        /*return  {
            id: response.data.Id,
            questionId: response.data.questionId,
            content: response.data.content,
            userName: response.data.userName,
            created: new Date(response.data.dateCreated)
        }*/
    }
    return null;

}

export const Api = {
    getQuestion,
    getQuestions,
    postQuestion,
    postAnswer
};
