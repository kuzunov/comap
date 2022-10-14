import React from "react";
import { Paper, Button, Box, Container, Link } from "@mui/material";
import { IEvent } from "../../../model/event";
import { useNavigate } from "react-router-dom";

type Props = {
  event: IEvent;
};

export const DashboardEvent = ({ event }: Props) => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        minHeight: "200px",
        minWidth: "200px",
        backgroundImage: `url(${event.poster})`,
        backgroundSize: "contain",
        padding: "10px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          margin: "10px",
          backgroundColor: "rgba(255,255,255,0.8)",
          minWidth: "180px",
          minHeight: "180px",
          padding:"15px"
        }}
      >
        <h2>{event.name}</h2>
        <p>{event.description}</p>

        <Button onClick={() => navigate(`/events/${event.id}`)}>See more...</Button>
      </Paper>
    </Container>
  );
};

export default DashboardEvent;
