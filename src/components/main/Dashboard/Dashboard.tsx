import { Box } from "@mui/material";
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { IEvent } from "../../../model/event";
import { IReview } from "../../../model/review";
import DashboardEventsCarousel from "./DashboardEventsCarousel";
import DashboardReviewsList from "./DashboardReviewsList";




type Props = {}

const Dashboard = (props: Props) => {
  const fetcher = useFetcher();
  const loader = useLoaderData() as {events:IEvent[], reviews:IReview[]};

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/?index");
    }
  }, [fetcher]);
  return ( <Box sx={{minHeight:"500px", minWidth:"500px", backgroundColor:"grey"}}>
          <DashboardEventsCarousel events={(fetcher.data)?fetcher.data.events:[]}/>
          <DashboardReviewsList reviews={(fetcher.data)?fetcher.data.reviews:[]} />
    </Box>

  )
}

export default Dashboard