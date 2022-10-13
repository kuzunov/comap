import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IEvent } from "../../model/event";
import { IdType } from "../../model/sharedTypes";

type eventProps = {
  event: IEvent;
  onDelete: (id: IdType) => void;
};
const Event = ({ event, onDelete }: eventProps) => {
  return (
    <Card>
      <Link to={`/events/${event.id}`}>
        <CardActionArea>
          <CardMedia
            image={event.poster}
            component="img"
            height="140"
          ></CardMedia>
          <CardContent>
            <Typography>{event.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button onClick={() => onDelete(event.id)} size="small">
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
};

export default Event;
