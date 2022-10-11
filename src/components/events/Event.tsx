import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link, useFetcher, useNavigate } from 'react-router-dom'
import { IEvent } from '../../model/event'


const Event = ({name,date,organizer,poster,participants,id}: IEvent) => {
  const navigate=useNavigate();
  const onDelete = () => {
    navigate(`/events/${id}/delete`);
  }
  const fetcher = useFetcher();
  return (
    <Card>
      <Link to={`/events/${id}`}>
      <CardActionArea>
      <CardMedia
      image={poster}
      component="img"
      height="140"
      >
      </CardMedia>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>        
        <fetcher.Form method="delete" action={`${id}/delete`}>
          <Button type="submit" size="small">DELETE</Button>
        </fetcher.Form>
      </CardActions>
    </Card>
  )
}

export default Event