import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Button, Box, Card, CardActionArea, CardMedia, CardContent, CardActions, Paper, Typography } from '@material-ui/core'
import { BsTrash } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
    },
    media: {
        height: 140,
    },
});

const Recipe = () => {
    const classes = useStyles();
    const recipe = {
        id: 4,
        name: "Mega Melon",
        description: "Melon, Mango and Papaya",
        rate: 2,
        imgUrl: "https://static.libertyprim.com/files/familles/melon-large.jpg?1574629891",
        owner: "cpracideli@gmail.com",
        recipe: [
            { flavor: "cantaloupe TPA", amount: 0.02 },
            { flavor: "papaya TPA", amount: 0.015 },
            { flavor: "mango TPA", amount: 0.03 }
        ]
    }


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
                    <Typography variant="h5">{recipe.name} Recipe</Typography>


                    <img src={recipe.imgUrl} height={300}></img>
                    {renderStars(recipe.rate)}
                    <TableContainer component={Paper}>
                        <Table size="small" fullWidth>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Flavor</TableCell>
                                    <TableCell>(%)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recipe.recipe.map((row, i) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">{row.flavor}</TableCell>
                                        <TableCell component="th" scope="row">{row.amount * 100}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <a href="/calculator">Open in Calculator</a>

                </Box>
            </Paper>

        </>
    );
}

export default Recipe;