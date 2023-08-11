import '../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth, db, storage } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes } from "firebase/storage"



function AdditionalInfo({navigation}){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        additionalInfo: {
            activities: "",
            clubs:"",
            hangOuts:"",
        }
    })
    const [imageUpload, setImageUpload] = useState(null)


    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }
    const uploadImage = () => {
        if(imageUpload == null){
            return;
        }
        const imageRef = ref(storage, `profilePictures/pfp${auth.currentUser.uid}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            console.log("Image Uploaded")
        })
    }

    const sumbitForm = () => {
        uploadImage()
        //Update fields here
            //IMPORTANT: Upload profile picture URL into pfpURL


        navigate("../../src/SolarSystem/SolarSystem.js")
    }


    return(
        <div className="entry-page">
            <div id='inputs' className='grid'>
            <i>
                <button className='back-button' onClick={() => navigate(-1)}>Back</button>
            </i>
            <i></i>
            <i></i>
            <i></i>
            <i>
                <p className="bold-title title-spacing"> Add</p>
                <p className='regular-title title-spacing'>Your</p>
                <p className='regular-title title-spacing'>Life Details</p>
                <p className='info-text title-spacing'>Add details about you that give your friends more opportunities to foster conenctions</p>
            </i>
            <i></i>
            <i></i>
            <i>
            <div id='usrInfo' className='grid'>
                <i><label className='input-label bold-text'>Interests</label></i>
                <i></i>
                <i></i>
                    <i></i>
                    <i>
                    <div>
                        <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    </div>
                    <label className='input-label'>HOBBIES/SPORTS/ACTIVITIES</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Input Info Here...`}
                        name = 'firstName'
                        onChange={UserHandler}
                        value={user.additionalInfo.activities}
                        />
                    </i>
                    <i></i>
                    <i></i>
                    <i>
                    <label className='input-label'>CLUBS</label>
                    <input
                        type="text"
                        className="input-box"
                        name = 'email'
                        placeholder={`Clubs Here...`}
                        onChange={UserHandler}
                        value={user.additionalInfo.clubs}
                        />
                        </i>
                    <i></i>
                    <i><label className='input-label bold-text'>Places</label></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i>
                    <label className='input-label'>FAVORITE HANGOUTS</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Hangouts Here...`}
                        name = 'hangOuts'
                        onChange={UserHandler}
                        value={user.additionalInfo.hangOuts}
                        />
                    </i>
                    <i></i>
                    <i></i>
                    <i></i>
                    
                </div>
                <button id='proceed' className='next-button' onClick={sumbitForm} >Submit</button>
            </i>
            </div>
        </div>
        
    )
}

export default AdditionalInfo