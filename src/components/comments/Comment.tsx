import React, { useEffect } from 'react'
import { IComment } from '../../model/comment'
import { UsersApi } from '../../service/UsersApi'


const Comment = ({id, created,modified,body,authorId,authorUsername}: IComment & {authorUsername:string}) => {
  return (
    <div>Comment: {`Author: ${authorUsername} Body: ${body}`}</div>
  )
}

export default Comment