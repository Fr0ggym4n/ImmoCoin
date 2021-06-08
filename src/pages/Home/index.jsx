import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Home() {

    const [properties, setProperties] = useState([])
    
    const URL = 'https://immocoin-backend.herokuapp.com/api/properties';

    useEffect(() => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setProperties(data))
   },[])
    
    
    console.log(properties)
   

    return (
        <div>
           
           
                {properties.map((item) => (
                    
                    <Card key={item.id} property={item}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="interior house"
                        height="140"
                        image="https://images.unsplash.com/photo-1616137466211-f939a420be84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
                        title="house"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                     
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
            
        </div>
    )
}

export default Home
