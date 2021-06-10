
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    margin: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  centerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },

  link: {
    textDecoration: "none"
  }
}));

const Home = ({ properties }) => {



  const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary"
        variant="h2"
        align="center"
      >
        <h3>ImmoCoin</h3>

        Where do you want to live ?
        
        </Typography>
      <br />
      <Container maxWidth='xl' className={classes.textHome}>
        <Typography variant="h6"
          align="center"
          color="initial">
The place you are looking for is certainly here - on our real estate website.<br />
Whether you want to buy or sell your property: you have come to the right place!<br /><br />

Real estate is not just about surface area and their selling prices,<br />
it should be all about you: your life projects and finding a place to call home :slight_smile:<br />
Here we are all about helping you face new challenges  together, with a good dose of creativity and an exciting human adventure!<br />
    </Typography>

      </Container>

      <Container maxWidth='xl' className={classes.centerItem}>
        {properties.map((item) => (
          <Grid item md={8} key={item.id} >
            <Paper className={classes.paper}>
              <Link
                className={classes.link}
                to={"/properties/" + item.id}
                key={item.id}>
                <Card >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="interior house"
                      height="250"
                      image="https://source.unsplash.com/640x427/?house"
                      title="house"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>

                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Container>

    </>

  );
}


export default Home;

