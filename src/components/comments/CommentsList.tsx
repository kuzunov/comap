import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { IComment } from '../../model/comment'
import Comment from './Comment'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type Props = {
    comments:IComment[],
}

const CommentsList = ({comments}: Props) => {
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments ( {comments.length} )</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                    <Grid container spacing={2}>    
                {(comments)?comments.map(comment=>
                <Grid key={comment.id} item xs={4}><Comment  {...comment}/></Grid>):<>No Ongoing comments</>
                }
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default CommentsList