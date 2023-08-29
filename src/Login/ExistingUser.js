import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";


function ExistingUser(){

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }
    //https://firebase.google.com/docs/auth/web/manage-users
    //const user = auth.currentUser;
    const submitLogIn = () => {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
            // Signed in
            const userCred = userCredential.user;
            console.log(userCred.email)
            const docRef = doc(db, "users", userCred.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().firstName);
                navigate("../../src/SolarSystem/SolarSystem.js")
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
            
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }



    let navigate = useNavigate();
    return(
        <div className="entry-page">
        <header>
        <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </header>
            <div>
                <div className='grid'>
                    
                        <p className="bold-title title-spacing"> Log In</p>
                        <p className='regular-title title-spacing'>Enter Your Details </p>
                    
                    <div id='usrInfo' className='grid'>
                    <label className='input-label bold-text'>LOG IN DETAILS</label>
                    
                        <label className='input-label'>EMAIL</label>
                        <input
                            type="text"
                            className="input-box"
                            placeholder={`Email Here...`}
                            name = 'email'
                            onChange={UserHandler}
                            value={user.email}
                            />
                        <label className='input-label'>PASSWORD</label>
                        <input
                            id = 'usrPassword'
                            type="text"
                            className="input-box"
                            placeholder={`Password Here...`}
                            name = 'password'
                            onChange={UserHandler}
                            value={user.password}
                            />
                        
                        </div>
                        
                    
                </div>
                <button id='proceed' className='next-button' onClick={submitLogIn}>Login</button>
            </div>
        </div>
    )
}

export default ExistingUser
