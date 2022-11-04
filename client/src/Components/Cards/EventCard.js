import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { default_avatar, default_event } from "../../Images/Links";
import { AppContext } from "../../App";
import {
  AddCircleOutline,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import axios from "axios";
import uuid from "react-uuid";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventCard({ props, allowDelete = false }) {
  const [expanded, setExpanded] = React.useState(false);
  const {
    id,
    title,
    location,
    city,
    state,
    lat,
    lng,
    party_size,
    party_count,
    what,
    when,
    why,
    avatar_url = default_avatar,
    image_url = default_event,
    users,
  } = props;

  const contextObj = React.useContext(AppContext);
  const user = contextObj.user
  const currlocation = contextObj.location

  const distanceFromMe = () => {
    const R = 6371e3; // metres
    const φ1 = (currlocation?.latitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat * Math.PI) / 180;
    const Δφ = ((lat - currlocation?.latitude) * Math.PI) / 180;
    const Δλ = ((lng - currlocation?.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    const distanceInMiles = Math.round((distance / 1609) * 100) / 100;
    return distanceInMiles;
  };

  const isCurrentUserAttendingThisEvent = users
    ?.map((user) => user.id)
    .includes(user?.id);
  console.log(isCurrentUserAttendingThisEvent);

  //Handlers
  const handleGetLink = () => {
    console.log("to be made");
  };

  const handleEventJoin = async () => {
    if (party_count < party_size) {
      const res = await axios.post(
        `http://localhost:3000/participations`,
        {
          user_id: user.id,
          event_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.reload();
    } else {
      alert("Maximum partysize reached");
    }
  };

  const handleEventRemove = async () => {
    const res = await axios.delete(
      `http://localhost:3000/participations/${user.id}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res);
    window.location.reload();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteEvent = async () => {
    const res = await axios.delete(`http://localhost:3000/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    window.location.reload();
  };

  return (
    <Card className="event-card" sx={{ maxWidth: 600, maxHeight: 800 }}>
      <CardHeader
        avatar={<Avatar src={avatar_url} />}
        title={title}
        subheader={when}
      />
      <CardMedia
        component="img"
        image={image_url}
        className="event-card-image"
        sx={{ maxWidth: 600, maxHeight: 300 }}
      />
      <CardContent>
        <Typography paragraph>{`What: ${what}`}</Typography>
        <Typography paragraph>{`Where: ${location}`}</Typography>
        <Typography
          paragraph
        >{`Distance: Aprox. ${distanceFromMe()} miles`}</Typography>
        <Typography
          paragraph
        >{`Party: ${party_count}/${party_size}`}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!isCurrentUserAttendingThisEvent ? (
          <IconButton aria-label="attend" onClick={handleEventJoin}>
            <AddCircleOutline />
          </IconButton>
        ) : (
          <IconButton aria-label="attend" onClick={handleEventRemove}>
            <RemoveCircleOutline />
          </IconButton>
        )}
        {allowDelete ? (
          <IconButton aria-label="share" onClick={handleDeleteEvent}>
            <DeleteOutline />
          </IconButton>
        ) : null}
        <IconButton aria-label="share" onClick={handleGetLink}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Why?</Typography>
          <Typography paragraph>{why}</Typography>
          <Typography paragraph>Who's Going?</Typography>
          {users.map((user) => {
            return (
              <Typography key={uuid()} paragraph>
                {user.username}
              </Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
