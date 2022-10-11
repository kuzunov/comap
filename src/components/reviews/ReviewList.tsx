import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@mui/material';
import React from 'react'
import { IReview } from '../../model/review';
import Review from './Review';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type Props = {
  reviews: IReview[];
}

const ReviewList = ({reviews}: Props) => {
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Reviews ( {reviews.length} )</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                    <Grid container spacing={2}>    
                {(reviews)?reviews.map(review=>
                <Grid key={review.id} item xs={4}><Review  {...review}/></Grid>):<>No reviews</>
                }
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default ReviewList