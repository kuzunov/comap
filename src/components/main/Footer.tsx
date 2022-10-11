import { Container, Grid, Link, Typography } from '@mui/material'

type Props = {}

const Footer = (props: Props) => {
  return (
      <Container maxWidth={false} sx={{
        bgcolor:'primary.main',
        width: `100%`,
        position: "fixed",
        left:"0",
        bottom:"0",
        overflow: "hidden",
        padding: "5px",
      }}>
        <Grid container direction="row">
            <Grid item>
              <Link >
                <Typography variant="overline" sx={{
                    color: "#fff", borderBottom:"1px solid #757ce8"
                    }}>
                  CoMAP
                </Typography>
              </Link>
            </Grid>
        </Grid>
        <Grid container direction="column" >
          {/* //<Social /> */}
        </Grid>
        <Grid item>
          <Typography sx={{
    color: "#fff",
    fontSize: "1em"}}>
            &copy; Konstatin Uzunov
          </Typography>
        </Grid>
      </Container>
  )
}

export default Footer