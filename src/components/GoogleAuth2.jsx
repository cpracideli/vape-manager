
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "../framework/redux/module/Authorization";
import { GoogleLogin, GoogleLogout, } from 'react-google-login'

const GoogleAuth = (store) => {
    const [auth, setAuth] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';
    //const clientSecret = 'lWxhr5teQzYGLnjs5PqcexJm';

    const onLoginSuccess = (res) => {
        
        setAuthenticated(true);
        console.log(auth);

        store.dispatch(
            //userId, userEmail, userFullName, userPhotoUrl
            AuthorizationAction.signIn(res.wt.NT, res.wt.cu, res.wt.Ad, res.wt.hK)
        );
        auth.signIn();
        console.log(store)
    };

    const onLogoutSuccess = () => {
        auth.signOut();
        setAuthenticated(false);
        store.dispatch(
            AuthorizationAction.signOut()
        )
    };

    const onFailure = (res) => {
        console.log('[login/logout failure] res:', res)
        alert('Failure! Try again')
    }

    const renderAuthButton = () => {
        if (authenticated) {
            return (
                <div>
                    <span>{store.userFullName}</span>
                    <GoogleLogout
                        buttonText="Logout"
                        clientId={clientId}
                        onLogoutSuccessSuccess={onLogoutSuccess}
                        onFailure={onFailure}
                    />
                    {/* <button onClick={onSignOutClick}>Signout</button> */}
                </div>


            );
        } else {
            return (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Google Login"
                    onSuccess={onLoginSuccess}
                    onFailure={onFailure}
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
    const mapStateToProps = (state) => {
        return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
      };
};

export default connect(mapStateToProps)(GoogleAuth);