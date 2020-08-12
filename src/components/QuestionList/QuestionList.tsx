import React, {FC, useEffect} from 'react'
import {GetQuestionData} from "../../types/QuestionTypes";
import QuestionItem from "../QuestionItem/QuestionItem";
import {Container, ListGroup, Row, Col} from "react-bootstrap";

interface Props {
    data: GetQuestionData[]
}

const QuestionList: FC<Props> = ({data}) => {

    return <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            data.map((question) => {
                                return <ListGroup.Item key={question.id}>
                                    <QuestionItem data={question}/>
                                </ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
}

export default QuestionList;

