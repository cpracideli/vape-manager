import React from 'react';
import GoogleAuth from '../components/GoogleAuth';
import { useSelector } from 'react-redux';

const Login = () =>{
    const auth = useSelector((state) => state.auth)
    console.log(auth)

    const renderLogin=() =>{
        return(
        <>
            <p>Some funcions is only available after login. Make login with google to access complete tool</p>
            <GoogleAuth/>
        </>
        );
    }
    const renderLogout=() =>{
        return(
        <>
            <p>Hello {auth.userFullName}, welcome to Vape Tool.</p>
            <GoogleAuth/>
        </>
        );
    }

    return (
        <>
            {auth.isSignedIn?renderLogout(): renderLogin()}
            
        </>
    )
}

export default Login;