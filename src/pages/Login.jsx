import { GoogleLogin } from 'react-google-login'
import React, {useState} from 'react';

const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';
const clientSecret = 'lWxhr5teQzYGLnjs5PqcexJm';

const Login = () =>{
    const [email, setEmail] = useState('');

    const onSuccess = (res) =>{
        console.log('[login success] current user:', res.profileObj)
        setEmail(res.profileObj.name + " (" + res.profileObj.email +")")    
    }
    const onFailure = (res) =>{
        console.log('[login failure] res:', res)    
    }

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                
                buttonText="Google Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

            <p>Autenticated user: {email}</p>
        </>
    )

}

export default Login;