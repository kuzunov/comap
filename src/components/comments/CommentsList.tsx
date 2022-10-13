import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { IComment } from "../../model/comment";
import Comment from "./Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CommentsList = ({
  passedComments,
}: {
  passedComments: (IComment & { authorUsername: string })[];
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Comments ( {passedComments ? passedComments.length : 0} )
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: "scroll" }}>
        <Typography component={"div"}>
          <Grid container spacing={2}>
            {passedComments.map((comment) => (
              <Grid item key={comment.id} xs={8}>
                <Comment {...comment} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CommentsList;
