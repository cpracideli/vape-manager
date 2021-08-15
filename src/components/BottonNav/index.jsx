import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction,AppBar } from "@material-ui/core";
import { GiEyedropper, GiSquareBottle } from 'react-icons/gi';
import { CgCalculator } from 'react-icons/cg';

const BottonNav = (props) => {

  const [value, setValue] = React.useState('');
  var options = [
      {
          'title': 'Calculator',
          'icon': <CgCalculator size={25} />,
          'page': '/calculator',
          
      },
      {
          'title': 'Juices',
          'icon': <GiSquareBottle size={25} />,
          'page': '/juices',
      },
      {
          'title': 'Flavors',
          'icon': <GiEyedropper size={25} />,
          'page': '/flavors',
      }
  ]

  const styles = {
    root: {
      innerHeight: 5000
    }
  };

  return (
    <div>
        <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
        <BottomNavigation
            style={{height: 70}}
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

export default BottonNav;