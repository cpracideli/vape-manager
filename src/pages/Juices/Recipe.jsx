import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Button, Box, Card, CardActionArea, CardMedia, CardContent, CardActions, Paper, Typography } from '@material-ui/core'
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

const host = "https://vape-tool.herokuapp.com";
const _host = "http://localhost:3333";

const Recipe = () => {
    const { juiceId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        axios(`${host}/recipes/${juiceId}`).then(function (res) {
            setRecipe(res.data);
        });
    }, juiceId);

    useEffect(() => {
        console.log(juiceId)
        axios(`${host}/recipeFlavors/${juiceId}`).then(function (res) {
            setFlavors(res.data);
        });
    }, juiceId);

    const renderStars = (stars) => {
        var object = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= stars) {
                object.push(<AiFillStar color="orange" />)
            }
            else {
                object.push(<AiOutlineStar color="orange" />)
            }
        }
        return (object)
    }

    return (
        <>
            <Paper elevation={5}>

                <Box m={3}>
                    <Box mt={2} >
                        <Typography variant="h5">{recipe.name} Recipe {renderStars(recipe.owner_rating)}</Typography>

                    </Box>
                    <Box m={2}>
                        <img src={recipe.img_url} width={200} />
                    </Box>
                    <Box m={2}>
                        <Typography >{recipe.description}</Typography>
                    </Box>


                    <Box m={5}>
                        <TableContainer component={Paper} >
                            <Table size="small" fullWidth>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Flavor</TableCell>
                                        <TableCell>(%)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {flavors.map((row, i) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">{row.flavor}</TableCell>
                                            <TableCell component="th" scope="row">{row.amount * 100}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box m={2}>
                        <a href="/calculator">Open in Calculator</a>

                    </Box>

                </Box>
            </Paper>

        </>
    );
}

export default Recipe;