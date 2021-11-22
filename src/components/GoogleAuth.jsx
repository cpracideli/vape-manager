
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "../framework/redux/module/Authorization";
import { GoogleLogin, GoogleLogout, } from 'react-google-login'
import { Avatar, Button, Menu, MenuItem } from '@material-ui/core'


const GoogleAuth = ({ dispatch, isSignedIn, userId, userEmail, userFullName, userPhotoUrl }) => {
    const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';
    const clientSecret = 'lWxhr5teQzYGLnjs5PqcexJm';
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSignInClick = (res) => {
        dispatch(
            AuthorizationAction.signIn(res.profileObj.googleId, res.profileObj.email, res.profileObj.name, res.profileObj.imageUrl)
        );
    };

    const onSignOutClick = () => {
        //dispatch(AuthorizationAction.signOut());
        //auth.signOut();
        //isSignedIn = false;
    };

    const onFailure = (res) => {
        console.log('[login failure] res:', res)
    }

    const renderAuthButton = () => {
        console.log(userPhotoUrl)
        if (isSignedIn) {
            return (
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar alt="Remy Sharp" src={userPhotoUrl} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disabled>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>
                            <GoogleLogout
                                buttonText="Logout"
                                clientId={clientId}
                                onLogoutSuccessSuccess={onSignOutClick}
                                onFailure={err => console.log('fail', err)}
                            />
                        </MenuItem>
                    </Menu>
                    
                    {/* <button onClick={onSignOutClick}>Signout</button> */}
                </div>


            );
        } else {
            return (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Google Login"
                    onSuccess={onSignInClick}
                    onFailure={err => console.log('fail', err)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )
            // return <button onClick={onSignInClick}>Sign In with Google</button>;
        }
    };

    return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        userEmail: state.auth.userEmail,
        userFullName: state.auth.userFullName,
        userPhotoUrl: state.auth.userPhotoUrl,
    };
};

export default connect(mapStateToProps)(GoogleAuth);