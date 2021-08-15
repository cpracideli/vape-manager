import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Button, Toolbar, AppBar, Typography } from "@material-ui/core";
import { GiEyedropper, GiSquareBottle } from 'react-icons/gi';
import { CgCalculator } from 'react-icons/cg';
import { HiMenu } from 'react-icons/hi';


const Navbar = (props) => {

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
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <HiMenu />
                    </IconButton>
                    <Typography variant="h6">
                        Vape Tool
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default Navbar;