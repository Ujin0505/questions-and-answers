import React, {useEffect, useState, FC, ChangeEvent} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {RouteComponentProps} from 'react-router-dom';

import {getQuestionsActionCreator, AppState} from "../../Store";
import QuestionList from "../QuestionList/QuestionList";
import {GetQuestionData} from "../../types/QuestionTypes";
import {useAuth} from "../../Auth";
import {Button, Container, Row, Col, FormControl, Form, Spinner} from "react-bootstrap";


interface Props extends RouteComponentProps {
    getQuestions: (search: string | null) => Promise<void>;
    questions: GetQuestionData[] | null;
    questionsLoading: boolean
};



const Home: FC<Props> = ({history, questions, questionsLoading, getQuestions}) =>{

    const {isAuth} = useAuth()
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const delay = setTimeout(() =>{
            console.log("fetch with delay")
            getQuestions(searchValue)
        }, 2000)

        return () => clearTimeout(delay)
    }, [searchValue])

    useEffect( () =>{
        if(questions === null){
            getQuestions(null)
        }
    }, [questions, getQuestions]);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setSearchValue(e.currentTarget.value);
        /*if(!questionsLoading){
            getQuestions(search)
        }*/
    }

    return <React.Fragment>
            {
                questionsLoading
                    ? <Container> <Spinner animation="border" /> </Container>
                    :(
                        <Container>
                            <Row>
                                <Col>
                                    <Row  className="align-items-center p-3">
                                        <Col>
                                            <input type="text"  placeholder="Search"  onChange={handleSearchInputChange}/>
                                        </Col>
                                        {
                                            isAuth && (
                                                <Col>
                                                    <Row className="justify-content-end ">
                                                        <Button variant="primary" onClick={() => history.push("/ask")}>Ask a question</Button>
                                                    </Row>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        questions && <QuestionList data={questions}/>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    )
            }
    </React.Fragment>
}

const mapStateToProps =(store: AppState) => {
    return{
        questions: store.questions.questions,
        loading: store.questions.loading
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) =>{
    return{
        getQuestions: (search: string| null) => dispatch(getQuestionsActionCreator(search)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);


