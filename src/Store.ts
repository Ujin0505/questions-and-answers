import {Action, ActionCreator, Dispatch, Reducer, combineReducers, Store, createStore, applyMiddleware} from "redux";
import thunk, {ThunkAction} from 'redux-thunk'
import {GetQuestionData, PostQuestionData} from "./types/QuestionTypes";
import {Api} from "./services/Api";

interface QuestionState {
    readonly loading: boolean,
    readonly questions: GetQuestionData[] | null,
    readonly postStatus: boolean| undefined
}

export interface AppState {
    readonly questions: QuestionState
}

const initialQuestionState: QuestionState = {
    loading: false,
    questions: null,
    postStatus: undefined
}

//Actions

interface GettingQuestionsAction extends Action<'GettingQuestionsAction'>{
}
interface GetQuestionsAction extends Action<'GetQuestionsAction'>{
    questions: GetQuestionData[]
}
interface PostedQuestionAction extends Action<'PostedQuestionAction'>{
    result: GetQuestionData | null
}

interface ResetPostStatusAction extends Action<'ResetPostStatusAction'>{
}


type QuestionActions =
    GettingQuestionsAction
    | GetQuestionsAction
    | PostedQuestionAction
    | ResetPostStatusAction

//Actions Creators

export const getQuestionsActionCreator: ActionCreator<ThunkAction<Promise<void>, GetQuestionData[], string|null, GetQuestionsAction>> = (filter: string| null) =>{
    return async (dispatch: Dispatch) =>{
        const gettingQuestionsAction: GettingQuestionsAction  =  { type: "GettingQuestionsAction" };
        dispatch(gettingQuestionsAction)

        const questions = await Api.getQuestions(filter);
        /*const questions = await getUnAnsweredQuestions();*/
        const gotQuestionActions : GetQuestionsAction = {
            type: 'GetQuestionsAction',
            questions
        }

        dispatch(gotQuestionActions);
    }
}

export const postQuestionActionCreator: ActionCreator<ThunkAction<Promise<void>, GetQuestionData, PostQuestionData, PostedQuestionAction>> = (data: PostQuestionData) =>{
    return async (dispatch: Dispatch) =>{
        const result = await Api.postQuestion(data);
        const postedQuestionAction : PostedQuestionAction = {
            type: 'PostedQuestionAction',
            result
        }
        dispatch(postedQuestionAction);
    }
}

export const resetPostStatusActionCreator: ActionCreator<ThunkAction<void, null, null, ResetPostStatusAction>> = () =>{
    return (dispatch: Dispatch) =>{
        const resetPostQuestionAction : ResetPostStatusAction = {
            type: 'ResetPostStatusAction'
        }
        dispatch(resetPostQuestionAction);
    }
}

/*export const searchActionCreator: ActionCreator<ThunkAction<Promise<void>, null, string, SearchAction>> = (search: string) => {
    return async(dispatch: Dispatch) => {

        const findedQuestions = await Api.getQuestions(search);
        const searchAction: SearchAction = {
            type: "SearchAction",
            result: findedQuestions
        }
        dispatch(searchAction);
    }
}*/



//Reducer

const neverReached = (never: never) =>{}

const questionsReducer: Reducer<QuestionState, QuestionActions> = (state = initialQuestionState, action) =>{

    switch (action.type) {
        case "GettingQuestionsAction":
            const empty: GetQuestionData[] = [];
            return{
                ...state,
                questions: empty,
                loading: true
            }
            break;
        case "GetQuestionsAction":
            return{
                ...state,
                questions: action.questions,
                loading: false
            }
            break;
        case "PostedQuestionAction":
            const questions = action.result? (state.questions || []).concat(action.result) : state.questions;
            return {
                ...state,
                questions: questions,
                postStatus: action.result != null
            }
            break;
        case "ResetPostStatusAction":
            return {
                ...state,
                postStatus: undefined
            }
            break;
        default:
            neverReached(action)
    }
    return state;
}

const rootReducer = combineReducers<AppState>({
    questions: questionsReducer,
})


// Store
export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));



