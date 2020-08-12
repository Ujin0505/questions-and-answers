import React, {FC, useEffect, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {useForm} from "react-hook-form";
import {Alert, Button, Form, FormGroup} from "react-bootstrap";
import {AppState, postQuestionActionCreator, resetPostStatusActionCreator} from "../../Store";
import {GetQuestionData, PostQuestionData} from "../../types/QuestionTypes";
import {RouteComponentProps} from "react-router-dom";
import {Container} from 'react-bootstrap';
import {AnyAction} from "redux";

interface Props {
    postQuestionData: (data: PostQuestionData) => any;
    postStatus: boolean | undefined,
    resetPostStatus: () => void;
}

/*interface Alert {
    isShow: boolean,
    status: string,
    message: string
}*/

const AskQuestion: FC<Props> = ({postQuestionData, postStatus, resetPostStatus}) => {

    const {handleSubmit, setValue} = useForm<{
        title: string;
        content: string
    }>();

    const onSubmit = handleSubmit((data) => {
        const newQuestion : PostQuestionData = {
            content: data.title,
            title: data.content
        }
        postQuestionData(newQuestion)
    });

    useEffect(() =>{
        console.log(postStatus);
        return () =>{
            resetPostStatus()
        }
    }, [resetPostStatus])

    return(
        <Container>
            <Alert  variant={postStatus ? "success": "danger"} show={postStatus !== undefined} onClose={(e) => resetPostStatus() } dismissible>
                {
                    postStatus ? "Your question successful posted!" : "Your question has not been posted!"
                }
            </Alert>
            <Form className ="p-3" onSubmit={onSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        onChange={(e)=> setValue("title", e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" onChange={(e) => setValue("content", e.target.value)}/>
                </Form.Group>
                {
                    postStatus === undefined ? <Button variant="primary" type="submit"> Submit </Button>
                        : <Button variant="primary" type="submit" disabled> Submit </Button>
                }
            </Form>
        </Container>
    )
}


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) =>{
    return {
        postQuestionData: (data: PostQuestionData) => dispatch(postQuestionActionCreator(data)),
        resetPostStatus: () => dispatch(resetPostStatusActionCreator())
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        postStatus: store.questions.postStatus,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AskQuestion);