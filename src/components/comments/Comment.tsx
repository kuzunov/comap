import React from 'react'
import { IComment } from '../../model/comment'


const Comment = ({id, created,modified,body,authorId}: IComment) => {
  return (
    <div>Comment: {`${id}, ${created},${modified},${body},${authorId}}`}</div>
  )
}

export default Comment