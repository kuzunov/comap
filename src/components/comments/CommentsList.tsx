import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IComment } from '../../model/comment'
import Comment from './Comment'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UsersApi } from '../../service/UsersApi';


type Props = {
    comments:(IComment&{authorUsername:string})[],
}

const CommentsList = ({comments}: Props) => {
const [commentsList, setComments] = useState<(IComment&{authorUsername:string})[]>([]);
useEffect(
  ()=> {
    setComments([...comments])
  },[comments]
)

  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments ( {(commentsList)? commentsList.length : 0} )</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{overflow: 'scroll'}}>
          <Typography>
                    <Grid container spacing={2}>    
                {commentsList.map(comment=>
                <Grid item key = {comment.id}xs={8}><Comment {...comment}/></Grid>)
                }
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default CommentsList