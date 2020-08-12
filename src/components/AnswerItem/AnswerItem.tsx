import React, {FC} from 'react'
import {GetAnswerData} from "../../types/AnswerTypes";

interface Props {
    data: GetAnswerData
}

const AnswerItem: FC<Props> = ({data}) =>{

    const date = new Date(data.created);

    return (
        <div>
            <div>Content: {data.content}</div>
           <div>Answered by {data.userName} on {date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
        </div>
    )
}

export default  AnswerItem;