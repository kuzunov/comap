import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useFetcher } from "react-router-dom";
import UserCard from "./UserCard";


const UsersList = () => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/users");
    }
  }, [fetcher]);
  return <Box sx={{
    display:"flex",
    flexWrap:"wrap"
  }}> {(fetcher.data && Array.isArray(fetcher.data))? fetcher.data.map((user) => 
    <UserCard key={user.id} {...user}/>
  ):'Loading...'
  }
  </Box>;
};

export default UsersList;
