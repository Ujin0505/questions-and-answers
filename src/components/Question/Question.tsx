import React, {FC, useState, useEffect, MouseEvent, ChangeEvent} from 'react';
import {useForm} from "react-hook-form";
import {Link, RouteComponentProps} from 'react-router-dom'
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@aspnet/signalr";
import {Form, Button, Container, Row, Col, Card, Spinner} from "react-bootstrap";

import {Api} from "../../services/Api";
import {GetQuestionData} from "../../types/QuestionTypes";
import {PostAnswerData} from "../../types/AnswerTypes";

import AnswerList from "../AnswerList/AnswerList";

interface RouteParams {
    questionId: string
}

const Question : FC<RouteComponentProps<RouteParams>> = ({match}) =>{

    const {handleSubmit, setValue, getValues} = useForm<{
        content: string
    }>();

    const [question, setQuestion] = useState<GetQuestionData | null>(null);
    const [isEnable, setEnable] = useState(true)

    const setUpSignalRConnection = async (questionId: number) => {

        //setup
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/questionshub')
            .withAutomaticReconnect()
            .build();
        connection.on('Message', (message: string) => {
            console.log('Message', message);
        });
        connection.on('ReceiveQuestion', ( questionId: number/*question: QuestionsDataAPI*/) => {
            console.log('ReceiveQuestion (id)', questionId);
            fetchQuestion(questionId);
            //setQuestion(mapQuestionFromServer(question));
        });

        //start
        try{
            await connection.start();
        }catch (e) {
            console.log(e)
        }

        if (connection.state === HubConnectionState.Connected) {
            connection
                .invoke('SubscribeQuestion', questionId)
                .catch((err: Error) => {
                    return console.error(err.toString());
                });
        }
        return connection;
    }
    const cleanUpSignalRConnection = async(questionId: number, connection: HubConnection) => {
        if (connection.state === HubConnectionState.Connected) {
            try {
                await connection.invoke('UnsubscribeQuestion', questionId);
            } catch (err) {
                return console.error(err.toString());
            }
        } else {
            connection.off('Message');
            connection.off('ReceiveQuestion');
            connection.stop();
        }
    }

    const onSubmit = handleSubmit( async (data, e) =>{
        const postAnswerData: PostAnswerData = { questionId: Number(match.params.questionId), content: data.content}

        setEnable(false);
        const result = await Api.postAnswer(postAnswerData);

        e!.target.reset(); // reset after form submit
        setEnable(true);
    });
    /*const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>) =>{
        const text = event.target.value;

    }*/

    const fetchQuestion = async (questionId: number) =>{
        const result = await Api.getQuestion(questionId);
        //const result = await getQuestion(questionId);
        setQuestion(result);
    };

    useEffect(()=> {
        let connection: HubConnection;
        if(match.params.questionId){
            const id = Number(match.params.questionId);
            fetchQuestion(id);
            setUpSignalRConnection(id)
                .then(con => {
                    connection = con;
                });
        }

        return function cleanUp() {
            if (match.params.questionId) {
                const questionId = Number(match.params.questionId);
                cleanUpSignalRConnection(questionId, connection);
            }
        };

    }, [match.params.questionId])

    return (
        <Container>
            <Row className="justify-content-center">
                {
                    question === null
                        ?  <Col className="col-1"><Spinner animation="border"/></Col>
                        : (
                            <Col>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <Card.Title>{question.title}</Card.Title>
                                            <Card.Text> {question.content}</Card.Text>
                                            <Card.Text> Asked by {question.userName} on {new Date(question.created).toLocaleDateString()} </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <AnswerList data={question.answers}/>
                                    <Form className="pt-2" onSubmit={onSubmit}>
                                        <Form.Group>
                                            <Form.Label>Your answer</Form.Label>
                                            <Form.Control as ="textarea" onChange={(e) => setValue("content", e.target.value)}/>
                                        </Form.Group>
                                        {
                                            isEnable ? <Button variant="primary" type="submit"> Submit </Button>
                                                : <Button variant="primary" type="submit" disabled> Submit </Button>
                                        }
                                    </Form>
                            </Col>
                        )
                }
            </Row>
        </Container>

    )
}

export default Question;



