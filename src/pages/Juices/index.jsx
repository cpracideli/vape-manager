import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, Grid, Button, Box, Card, CardActionArea, CardMedia, CardContent, CardActions, Paper, Typography } from '@material-ui/core'
import { BsTrash } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
    },
    media: {
        height: 140,
    },
});

const host = "https://vape-tool.herokuapp.com";
const _host = "http://localhost:3333";

const Juices = () => {
    const classes = useStyles();
    const [juices, setJuices] = useState([]);
    const [filtredJuices, setFiltredJuices] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios(`${host}/recipes`).then(function (res) {
            setJuices(res.data);
            setFiltredJuices(res.data);
        });
    }, juices);

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

    const handleFilter = (value) => {
        setFilter(value);
        console.log(value)
        if(value !== ''){
            const res = juices.filter(j => 
                j.name.toLowerCase().includes(value.toLowerCase()) || 
                j.description.toLowerCase().includes(value.toLowerCase())
            );
            setFiltredJuices(res);
        }
        else{
            setFiltredJuices(juices);
        }
    }

    return (
        <>

            <Box m={3}>
                <Box mt={2} mb={2} >
                    <Grid container justifyContent="center">
                        <TextField
                            placeholder="Search..."
                            value={filter}
                            onChange={(data) => handleFilter(data.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineSearch />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Box>
                <Box mt={2} mb={2} >
                    <Grid container justifyContent="center">
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Create New
                        </Button>
                    </Grid>
                </Box>
                <Grid container spacing={1} justifyContent="center">
                    {filtredJuices.map(j => (
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