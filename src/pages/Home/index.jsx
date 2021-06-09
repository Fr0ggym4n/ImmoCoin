import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
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
  centerItem:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
    
  },
  link: {
    textDecoration:"none"
  }
}));

const Home= ({properties})=> {
  

  
  const classes = useStyles();

  return (
    <Container maxWidth='xl' className={classes.centerItem}>
      {properties.map((item) => (
        <Grid item md={8}  key={item.id} >
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
                  image="https://images.unsplash.com/photo-1616137466211-f939a420be84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
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
  );
}


export default Home;

