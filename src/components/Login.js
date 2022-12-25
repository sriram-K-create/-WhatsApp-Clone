import React from 'react'
import "../css/Login.css";
import {Button} from "@material-ui/core"
import {auth ,provider} from "../firebase";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
function Login() {
    const [{} , dispatch] = useStateValue();
    function signIn(){

        auth.signInWithPopup(provider).then(result =>{
            console.log(result);
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user
            });
        }).catch(error =>{
            alert(error);
        })
    }

    return (
        <div className = "login">
            <div className = "login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>

            <div className = "login_text">
                <h1>Login to WhatsApp</h1>
            </div>

            <Button onClick = {signIn} >
                Sign in with Google
            </Button>
            </div>

        </div>
    )
}

export default Login
