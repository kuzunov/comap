import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import React from 'react'
import { Link, Form } from 'react-router-dom';
import { IdType } from '../../model/sharedTypes';
import { IUser } from '../../model/user';
import MapHOC from '../maps/MapHOC';

type Props = {
    id:IdType;
                name:string;
                members:IUser[];
                mainLocation: google.maps.MarkerOptions;
}

const Organization = ({id,name,members,mainLocation}: Props) => {
  return (
    <Card>
      <Link to={`/organizations/${id}`}>
      <CardActionArea>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
      <MapHOC zoom={13} center={mainLocation.position as google.maps.LatLngLiteral} markers={[mainLocation]} style={{width:"500px", height:"300px"}}/>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Join
        </Button>
        <Form method="delete" action={`/${id}/delete`}>
        <Button type="submit" size="small">DELETE</Button>
        </Form>
      </CardActions>
    </Card>
  )
}

export default Organization