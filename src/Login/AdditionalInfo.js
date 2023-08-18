import '../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth, db, storage } from '../firebase/config'
import { arrayUnion, doc, updateDoc } from "firebase/firestore"; 
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
    const [inputs, setInputs] = useState([{ key: randomString(), value: '' }]);

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
        if(imageUpload == null){
            return;
        }
        const imageRef = ref(storage, `profilePictures/pfp${auth.currentUser.uid}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            console.log("Image Uploaded")
        })
    }

    const sumbitForm = async (event) => {
        event.preventDefault();
        uploadImage()
        const valuesArray = inputs.map(input => input.value);
        console.log(valuesArray);
        const docRef = doc(db, "users", auth.currentUser.uid)
        let data = {
            interests: valuesArray,
            pfpUrl: `profilePictures/pfp${auth.currentUser.uid}`,
        }
        await updateDoc(docRef, data)
        console.log("Submit additional info");
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
    
      const interestSubmit = async (event) => {
        

      };


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
                        onClick={addInput}
                        >
                        Add Another Interest
                        </button>
                        <button onClick={(e) => interestSubmit(e)}>Submit interests</button>
                    </form>



                    </i>
                    <i></i>
                    <i><label className='input-label bold-text'>FAVORITE HANGOUTS</label></i>
                    <div>
                    
                        
                    </div>
                    <i></i>
                    <i></i>
                    <i><input type="file" className='custom-file-upload' onChange={(event)=>{setImageUpload(event.target.files[0])}}/></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    
                </div>
                <button id='proceed' className='next-button' onClick={(e) => sumbitForm(e)} >Submit</button>
            </i>
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