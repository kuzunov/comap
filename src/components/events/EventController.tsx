import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { Fetcher, Form, useFetcher } from "react-router-dom";
import { IEvent } from "../../model/event";
import { IdType } from "../../model/sharedTypes";
import { useAuth } from "../users/UserContext";
import EventList from "./EventList";

type Props = {
  eventsToDisplay?: IEvent[];
};

const EventController = ({ eventsToDisplay }: Props) => {
  const { getToken,currentUserState } = useAuth();
  const fetcher = useFetcher<IEvent[]>();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/events");
    }
  }, [fetcher]);

  const onDelete = (id: IdType) => {
    fetcher.submit(
      { id: id as string, token: getToken() as string },
      { method: "delete", action: "/events" }
    );
  };
  return (
    <Container sx={{ margin: "20px" }}>
      <Form action="add">
        {(currentUserState.isLoggedIn) && <Button
          variant="contained"
          sx={{ color: "white", margin: "5px 0px" }}
          type="submit"
        >
          Add New Event
        </Button>}
      </Form>
      <EventList events={fetcher.data} onDelete={onDelete} />
    </Container>
  );
};

export default EventController;
