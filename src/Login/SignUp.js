import '../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"; 



function SignUp({navigation}){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName:"",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        homeCity: "",
        currentCity: "",
        highSchool: "",
        college: "",
        friends: [],
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
    
    // SIGN IN WITH PHONE NUMBER LAST ADDITION: https://firebase.google.com/docs/auth/web/phone-auth
    const submitAccount = async () => {

        if(user.password == user.confirmPassword){
            await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                // Signed in
                const userCred = userCredential.user;
                console.log(userCred);                
                
                // This will later take the user to their Solar system
                try {
                    const data =  {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        homeCity: user.homeCity,
                        currentCity: user.currentCity,
                        highSchool: user.highSchool,
                        college: user.college,
                        friend: {},
                        interests: [],
                        pfpUrl: "",
                    }

                    const docRef = doc(db, "users", userCred.uid)
                    
                    await setDoc(docRef, data).then(() => {
                        console.log("Document written with ID: ", docRef.id);
                        navigate("/src/Login/AdditionalInfo.js")
                    })
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
            
        }
      }

    return(
        <div className="entry-page">
        <header>
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </header>
            <div id='inputs' className='grid'>
            
                <p className="bold-title title-spacing"> Create</p>
                <p className='regular-title title-spacing'>Your</p>
                <p className='regular-title title-spacing'>Contact Card</p>
                <p className='info-text title-spacing'>Fill out your information so you friends don't have to!</p>
            
            <div id='usrInfo' className='grid'>
                <label className='input-label bold-text'>USER INFORMATION</label>
                
                    <label className='input-label'>FIRST NAME</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`First Name Here...`}
                        name = 'firstName'
                        onChange={UserHandler}
                        value={user.firstName}
                        />
                    <label className='input-label'>LAST NAME</label>
                    <input
                        id = 'lname'
                        type="text"
                        className="input-box"
                        placeholder={`Last Name Here...`}
                        name = 'lastName'
                        onChange={UserHandler}
                        value={user.lastName}
                        />
                   
                    
                    
                    <label className='input-label'>EMAIL</label>
                    <input
                        type="text"
                        className="input-box"
                        name = 'email'
                        placeholder={`Email Here...`}
                        onChange={UserHandler}
                        value={user.email}
                        />
                        
                    <label className='input-label'>PHONE NUMBER</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Phone Number...`}
                        name = 'phoneNumber'
                        onChange={UserHandler}
                        value={user.phoneNumber}
                        />
                    
                    
                    <label className='input-label'>NEW PASSWORD</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Type Password...`}
                        name = 'password'
                        onChange={UserHandler}
                        value={user.password}
                        />
                    <label className='input-label'>CONFIRM PASSWORD</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Re-type Password...`}
                        name = 'confirmPassword'
                        onChange={UserHandler}
                        value={user.confirmPassword}
                        />
                    
                    
                </div>
            <div id= 'background info' className='grid'>
                <label className='input-label bold-text'>USER BACKGROUND</label>
                    <label className='input-label'>CITY FROM</label>
                    <input
                        id = 'usrFrom'
                        type="text"
                        className="input-box"
                        placeholder={`City Name Here...`}
                        name = 'homeCity'
                        onChange={UserHandler}
                        value={user.homeCity}
                        />
                    
                
                    <label className='input-label'>CITY YOU RESIDE</label>
                    <input
                        id = 'usrCity'
                        type="text"
                        className="input-box"
                        placeholder={`City Name Here...`}
                        name = 'currentCity'
                        onChange={UserHandler}
                        value={user.currentCity}
                        />
                    
                    <label className='input-label'>HIGHSCHOOL</label>
                    <input
                        id= 'usrHS'
                        type="text"
                        className="input-box"
                        placeholder={`Highschool Attended Here...`}
                        name = 'highSchool'
                        onChange={UserHandler}
                        value={user.highSchool}
                        />
                    
                    <label className='input-label'>COLLEGE</label>
                    <input
                        id = "usrCollege"
                        type="text"
                        className="input-box"
                        placeholder={`College Attended Here...`}
                        name = 'college'
                        onChange={UserHandler}
                        value={user.college}
                        />
                    
                </div>
            </div>
                <button id='proceed' className='next-button' onClick={() => submitAccount()}>Next</button>
        </div>
        
    )
}

export default SignUp