import React from 'react'
import { IdType } from '../../model/sharedTypes';

type Props = {    
  id:IdType,
  body:string,
  authorId:string,
  created:string,
  modified:string,
  rating:number;}

const Review = ({id,body,authorId,created,modified,rating}: Props) => {
  return (
    <div>Review</div>
  )
}

export default Review