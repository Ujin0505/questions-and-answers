import React, {FC} from 'react';
import {GetAnswerData} from "../../types/AnswerTypes";
import AnswerItem from '../AnswerItem/AnswerItem';
import {Container, ListGroup, Row, Col} from 'react-bootstrap';

interface Props {
    data: GetAnswerData[]
}

const AnswerList: FC<Props> = ({data}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            data.map((answer, idx) => {
                                return (
                                    <ListGroup.Item key={answer.id}>
                                        <AnswerItem data={answer}/>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default AnswerList;