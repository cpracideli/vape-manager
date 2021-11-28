import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, Card, CardActionArea, CardMedia, CardContent, CardActions, Paper, Typography } from '@material-ui/core'
import { BsTrash } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
    },
    media: {
        height: 140,
    },
});



const Juices = () => {
    const classes = useStyles();
    const [juices, setJuices] = useState([]);


    useEffect(() => {
        axios('https://vape-tool.herokuapp.com/recipes').then(function(res){
            setJuices(res.data);
            console.log(res.data);
        });
    },juices);

    // const juices = [
    //     {
    //         id: 1,
    //         name: "Froot Loops",
    //         description: "Foot Loops Juice Without milk",
    //         rate: 5,
    //         imgUrl: "https://www.kelloggs.com/content/dam/NorthAmerica/kelloggs/en_US/images/Brandlogo/Froot-Loops-Logo_349x208.png",
    //         owner: "diogo.kenji.pracideli@gmail.com"
    //     },
    //     {
    //         id: 2,
    //         name: "Nut Coffe",
    //         description: "Expresso Coffe with toasted almond",
    //         rate: 4,
    //         imgUrl: "https://static.turbosquid.com/Preview/2019/07/15__05_52_12/Espresso_Coffee_thumbnail_0000.jpgDE3EEDC7-9006-44A8-9EB9-3E3C047FA115Large.jpg",
    //         owner: "cpracideli@gmail.com"
    //     },
    //     {
    //         id: 3,
    //         name: "Tigers Blood",
    //         description: "Mixed Fruits",
    //         rate: 0,
    //         imgUrl: "https://cdn10.bigcommerce.com/s-paatz/products/2438/images/5175/tigersblood-vape__58102.1537128901.1280.1280.jpg?c=2",
    //         owner: "cpracideli@gmail.com"
    //     },
    //     {
    //         id: 4,
    //         name: "Mega Melon",
    //         description: "Melon, Mango and Papaya",
    //         rate: 2,
    //         imgUrl: "https://static.libertyprim.com/files/familles/melon-large.jpg?1574629891",
    //         owner: "cpracideli@gmail.com",
    //         recipe: [
    //             {flavor: "cantaloupe TPA", ammount: 0.02},
    //             {flavor: "papaya TPA", ammount: 0.015},
    //             {flavor: "mango TPA", ammount: 0.03}
    //         ]
    //     }
    // ]

    const renderStars = (stars) => {
        var object = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= stars) {
                object.push(<AiFillStar />)
            }
            else {
                object.push(<AiOutlineStar />)
            }
        }

        return (object)
    }

    return (
        <>

            <Box m={3}>
                <Grid container spacing={3}>
                    {juices.map(j => (
                        <Grid item xl={3} >
                            <Card elevation={5} >
                                    <CardActionArea href={`/recipe/${j.id}`}>
                                        {typeof j.img_url !== 'undefined' ? <CardMedia
                                            className={classes.media}
                                            image={j.img_url}
                                            title={j.name}
                                        /> : null}

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {j.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {j.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            <FiShare />
                                        </Button>
                                        <Button size="small" style={{ "color": "red" }}>
                                            <BsTrash />
                                        </Button>
                                        <Button size="small" style={{ "color": "orange" }}>
                                            {renderStars(j.owner_rating)}

                                        </Button>
                                    </CardActions>
                            </Card>
                        </Grid>
                        ))}
            </Grid>
        </Box>
            


        </>
    );
}

export default Juices;