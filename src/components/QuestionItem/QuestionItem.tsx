import React, {FC} from 'react';
import {GetQuestionData} from "../../types/QuestionTypes";
import { Link } from 'react-router-dom';
import {Button, Card, Container} from 'react-bootstrap';

interface  Props {
    data:GetQuestionData
}

const QuestionItem: FC<Props> = ({data}) => {
    const path = `questions/${data.id.toString()}`;
    {/*style={{ width: '50rem' }}*/}

    return (
            <Card>
                <Card.Body>
                    <Card.Title><Link to={path}>{data.title}</Link></Card.Title>
                    <Card.Text>
                        {
                            `Asked by ${data.userName} on ${new Date(data.created).toLocaleDateString()}`
                        }
                    </Card.Text>
                    <Card.Text>
                        Total answers: {data.answers.length}
                    </Card.Text>
                    {/*<Button variant="primary">AnswerItem QuestionItem</Button>*/}
                </Card.Body>
            </Card>
    )
}

export default QuestionItem;
