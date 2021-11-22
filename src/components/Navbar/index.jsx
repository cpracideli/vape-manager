import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Box, Toolbar, AppBar, Typography, Menu, MenuItem } from "@material-ui/core";
import { GiEyedropper, GiSquareBottle } from 'react-icons/gi';
import { CgCalculator } from 'react-icons/cg';
import { HiMenu } from 'react-icons/hi';
import GoogleAuth from '../GoogleAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginButton: {
        marginRight: {
            position: 'relative',
            marginLeft: 'auto',
        }
    },
    textAlign:{
        position: "relative",
        top: theme.spacing.unit,
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    var options = [
        {
            'title': 'Calculator',
            'icon': <CgCalculator />,
            'page': '/calculator',
        },
        {
            'title': 'Juices',
            'icon': <GiSquareBottle />,
            'page': '/juices',
        },
        {
            'title': 'Flavors',
            'icon': <GiEyedropper />,
            'page': '/flavors',
        }
    ]



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                            <HiMenu />
                        </IconButton>
                        <Typography variant="h6" className={classes.textAlign}>
                            Vape Tool
                        </Typography>
                    </Box>

                    <div className={classes.loginButton}>
                        <GoogleAuth />
                    </div>





                </Toolbar>
            </AppBar>
        </div>
    );

}

export default Navbar;