import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { IEvent } from '../../model/event'
import Event from "./Event"

type EventListProps = {
    events?:IEvent[]
}

const EventList = ({events}: EventListProps) => {
  
  return (<Grid container spacing={2}>    
          {(events)?events.map(event=>
          <Grid key={event.id} item xs={4}><Event  {...event}/></Grid>):<>No Ongoing Events</>
          }
          <Outlet />
  </Grid>
  )
}

export default EventList;