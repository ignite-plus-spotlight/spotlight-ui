import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import img1 from '../../assets/images/team.jpg';
import Grid from '@material-ui/core/Grid';
import Layout from '../layout/Layout';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Team(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Layout>
          <div>
          <Hidden xlUp color="secondary">
          <Paper ><h1>Team Awards</h1></Paper>
        </Hidden>
    <Grid container>
    <Grid item xs={12} s={6} md={4}>
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="team awards" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title=" Team Award name"
        subheader="July 22,2020"
      />
      <CardMedia
        className={classes.media}
        image={img1}
        title="team award1"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            description
        </Typography>
      </CardContent>
    </Card>
    </Grid>
<Grid item xs={12} s={6} md={4}>
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="team awards" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Team Award name"
        subheader="July 22,2020"
      />
      <CardMedia
        className={classes.media}
        image={img1}
        title="team award2"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         description
        </Typography>
      </CardContent>
    
    </Card>
    </Grid>
    </Grid>
    </div>
    </Layout>
  );
}

