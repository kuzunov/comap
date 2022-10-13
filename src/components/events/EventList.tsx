import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { IEvent } from "../../model/event";
import { IdType } from "../../model/sharedTypes";
import Event from "./Event";

type EventListProps = {
  events?: IEvent[];
  onDelete: (eventId: IdType) => void;
};

const EventList = ({ events, onDelete }: EventListProps) => {
  return (
    <Grid container spacing={2}>
      {events ? (
        events.map((event) => (
          <Grid key={event.id} item xs={4}>
            <Event event={event} onDelete={onDelete} />
          </Grid>
        ))
      ) : (
        <>No Ongoing Events</>
      )}
      <Outlet />
    </Grid>
  );
};

export default EventList;
