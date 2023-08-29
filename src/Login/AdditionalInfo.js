import '../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth, db, storage } from '../firebase/config'
import { arrayUnion, doc, updateDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"



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
    const [inputs, setInputs] = useState([{ key: randomString(), value: '' }]);
    const [profileURL, setProfileUrl] = useState()

    function randomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
      }


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
        
    }

    const sumbitForm = async (event) => {
        event.preventDefault();

        if(imageUpload == null){
            return;
        }
        const valuesArray = inputs.map(input => input.value);
        const docRef = doc(db, "users", auth.currentUser.uid)
        const imageRef = ref(storage, `profilePictures/pfp${auth.currentUser.uid}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then(async (url) => {
                console.log("Image Uploaded: "+ url)
                let data = {
                    interests: valuesArray,
                    pfpUrl: url,
                }
                await updateDoc(docRef, data)
            }).catch((error) => {
                console.log(error)
            })
        })

        
        console.log(valuesArray);
        
        
        console.log("Submitted additional info");
        //Update fields here
            //IMPORTANT: Upload profile picture URL into pfpURL


        navigate("../../src/SolarSystem/SolarSystem.js")
    }


    const addInput = () => {
        setInputs([
          ...inputs,
          { key: randomString(), value: '' }
        ]);
      };

    const handleInputChange = (e, index) => {
        const newInputs = [...inputs];
        newInputs[index].value = e.target.value;
        setInputs(newInputs);
    };

    const removeInput = (inputToRemove) => {
        setInputs(inputs.filter((input) => input.key !== inputToRemove.key));
      };
    
    return(
        <div className="entry-page">
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>

            <div id='inputs' className='grid'>
            
            
                <p className="bold-title title-spacing"> Add</p>
                <p className='regular-title title-spacing'>Your</p>
                <p className='regular-title title-spacing'>Life Details</p>
                <p className='info-text title-spacing'>Add details about you that give your friends more opportunities to foster conenctions</p>
            
            <div id='usrInfo' className='grid'>
                <label className='input-label bold-text'>Interests</label>
                
                    
                    <label className='input-label'>HOBBIES/SPORTS/ACTIVITIES</label>
                    
                    <form>
                        {inputs.map((input, index) => (
                        <div key={input.key} className="form-group">
                            <input
                            type="text"
                            className="input-box"
                            name = "activity"
                            placeholder={`Add an interest`}
                            value={input.value}
                            onChange={(e) => handleInputChange(e, index)}
                            />
                            <button
                            type="button"
                            className="custom-file-upload"
                            onClick={() => removeInput(input)}
                            >
                            Remove
                            </button>
                        </div>
                        ))}
                        <button
                        type="button"
                        className="custom-file-upload"
                        onClick={addInput}
                        >
                        Add Another Interest
                        </button>
                    </form>

                    <label className='input-label bold-text'>FAVORITE HANGOUTS</label>
                    <input type="file" className='custom-file-upload' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                   
                </div>
                <button id='proceed' className='next-button' onClick={(e) => sumbitForm(e)} >Submit</button>
            
            </div>
        </div>
        
    )
}

export default AdditionalInfo

/**
 * <input
                        type="text"
                        className="input-box"
                        placeholder={`Input Info Here...`}
                        name = 'activites'
                        onChange={UserHandler}
                        value={user.additionalInfo.activities}
                        />


 */