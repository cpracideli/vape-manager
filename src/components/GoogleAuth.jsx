
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "../framework/redux/module/Authorization";
import {GoogleLogin, GoogleLogout, } from 'react-google-login'


const GoogleAuth = ({ dispatch, isSignedIn, userId,userEmail, userFullName, userPhotoUrl }) => {
    const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';
    const clientSecret = 'lWxhr5teQzYGLnjs5PqcexJm';

    const onSignInClick = (res) => {
        dispatch(
            AuthorizationAction.signIn(res.profileObj.googleId, res.profileObj.email, res.profileObj.name, res.profileObj.imageUrl)
        );
    };

    const onSignOutClick = () => {
        //dispatch(AuthorizationAction.signOut());
        //auth.signOut();
    };

    const onFailure = (res) =>{
        console.log('[login failure] res:', res)    
    }

    const renderAuthButton = () => {
        if (isSignedIn) {
            return (
                <div>
                    
                        <GoogleLogout
                        buttonText="Logout"
                        clientId={clientId}
                        onLogoutSuccessSuccess={onSignOutClick}
                        onFailure={err => console.log('fail', err)}
                        
                    />
                    {/* <button onClick={onSignOutClick}>Signout</button> */}
                </div>

                
            );
        } else {
            return(
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
    console.log(state)
    return { isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        userEmail: state.auth.userEmail,
        userFullName: state.auth.userFullName,
        userPhotoUrl: state.auth.userPhotoUrl, };
};

export default connect(mapStateToProps)(GoogleAuth);