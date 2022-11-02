import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { default_avatar, default_event } from '../../Images/Links';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventCard({id, title, location, city, state, lat, lng, party_size, what, when, why, avatar_url = default_avatar, image_url=default_event}) {
  const [expanded, setExpanded] = React.useState(false);

  const distanceFromMe = () => {
    console.log('to be made')
  }

  //Handlers
  const handleGetLink = () => {
    console.log('to be made')
  }

  const handleEventRequest = () => {
    console.log('to be made')
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar src={avatar_url}/>
        }
        title={title}
        subheader={when}
      />
      <CardMedia
        component="img"
        height="300"
        image={image_url}
      />
      <CardContent>
        <Typography paragraph>
          {`What: ${what}`}
        </Typography>
        <Typography paragraph>
          {`Where: ${location}`}
        </Typography>
        <Typography paragraph>
          {`Distance: ${distanceFromMe()}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={handleEventRequest}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={handleGetLink}/>
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
          <Typography paragraph>Why:</Typography>
          <Typography paragraph>
            {why}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
