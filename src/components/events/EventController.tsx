import { Button, Container } from '@mui/material';
import { Form, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { IEvent } from '../../model/event';
import EventList from './EventList'


type Props = {
  eventsToDisplay?:IEvent[]}

const EventController = ({eventsToDisplay}: Props) => {
  //const [events, setEvents] = useState<IEvent[]>();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  // const dashEvents = () => {
  //   setEvents(mockEevents.slice(0,3));
  // };
  const addEvent = () => {
    navigate("/events/add")
  }
  
  const events = useLoaderData() as IEvent[]
  // useEffect(()=>{
  //   setEvents(eventsL);
  // },[]);
  return (
  <Container sx={{margin:"20px"}}>
    <Form action="add">
      <Button variant="contained" sx={{color:"white",margin:"5px 0px"}} type="submit">Add New Event</Button>
    </Form>
    <EventList events={events} />
  </Container>
  )
}

export default EventController