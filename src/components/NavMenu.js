import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction,AppBar } from "@material-ui/core";
import './NavMenu.css';
import { GiEyedropper, GiSquareBottle } from 'react-icons/gi';
import { CgCalculator } from 'react-icons/cg';


const NavMenu = (props) => {

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
        
        <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
        
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            >
            {options.map((o, i) =>
                <BottomNavigationAction 
                    label={o.title} 
                    icon={o.icon}
                    component={Link}
                    to={o.page} />
                    
            )}
        </BottomNavigation>
        </AppBar>
    </div>
  );

}

export default NavMenu;
