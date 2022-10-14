import { Box } from '@mui/material'
import React from 'react'
import DashboardReview from './DashboardReview'

type Props = {
    reviews: {id:number,body:string}[]
}

const DashboardReviewsList = ({reviews}: Props) => {
  return (
    (reviews)?<Box>
        {reviews.map(review=><DashboardReview key={review.id} {...review}/>)}
    </Box>
    :<>Loading...</>
  )
}

export default DashboardReviewsList