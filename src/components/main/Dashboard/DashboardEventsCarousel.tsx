import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { IEvent } from '../../../model/event'
import DashboardEvent from './DashboardEvent'

type Props = {
  events:IEvent[]
}

const DashboardEventsCarousel = ({events}: Props) => {
  return (
    <Carousel sx={{minHeight:"50%",
                   minWidth:"50%"}}>
            {
                (events)? events.map( (event:IEvent, i:number) => <DashboardEvent key={i} event={event} /> ):
                <>Loading...</>
            }
    </Carousel>
  )
}

export default DashboardEventsCarousel