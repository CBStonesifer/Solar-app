import React from 'react';
import { Link } from 'react-router-dom';
import '../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth';

    

function UserEntry() {
    let navigate = useNavigate();
    
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            console.log("uid", uid)
            navigate("../../src/SolarSystem/SolarSystem.js")
          } else {
            // User is signed out
            // ...
            console.log("user is logged out")
          }
        });  
  }, [])

    return (
        <div>
        <p>
            <Link to="/">
            </Link>
        </p>
          <p>
            <Link to="/src/Login/NewUser.js" 
            className="entry-title">
              Sign Up
            </Link>
          </p>
          <h1 className="solar-OR">or</h1>
          <p>
            <Link to="/src/Login/ExistingUser.js"
            className="entry-title"
            >
              Log In
            </Link>
          </p>

        </div>
  
    );
}

export default UserEntry;