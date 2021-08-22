import { GoogleLogout } from 'react-google-login'
import React from 'react';

const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';

const Logout = () =>{
    const onSuccess = (res) =>{
        alert('logout succesfuly')    
    }

    return (
        <>
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccessSuccess={onSuccess}
                onFailure={onSuccess}
            />
        </>
    )

}

export default Logout;