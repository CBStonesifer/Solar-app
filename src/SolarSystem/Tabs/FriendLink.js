import '../../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { auth, db, storage } from "../../firebase/config"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, doc, getDoc, collection, where, getDocs} from "firebase/firestore";




function FriendLink({navigation}){
    let navigate = useNavigate();
    const [userID, setUserID] = useState();
    const [filtered, setFiltered] = useState();
    const [fields, setFields] = useState({
        interests: "",
        location: "",
    });

    const UserHandler = (e) => {
        const { name, value } = e.target;
        setFields((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }
    function ListItem(props) {
        return (
                <div className="contact-container">
                    <div className="contact-image-container">
                        <img src={props.value.data().pfpUrl} alt="Image"/>
                    </div>
                    <div className="contact-text-container">
                        <p>{props.value.data().firstName} {props.value.data().lastName}</p>
                        <p><b>Number:</b> {props.value.data().phoneNumber}</p>
                        <p><b>Email:</b> {props.value.data().email}</p>
                    </div>
                    <div className="contact-buttons-container">
                        <button onClick={() => {console.log("TEXTING " + props.value.data().firstName)}}>Message</button>
                    </div>
                </div>
    )}

    async function returnFields(){
        console.log("Searched for "+ fields.interests+" in "+fields.location)
        let userDoc = doc(db, "users", auth.currentUser.uid)
        
        await getDoc(userDoc).then(async Fdoc => {
            try{
                let friendLevels = Fdoc.data().friend
                const allFriends = [];
                let filteredFriends = [];
                for (const key in friendLevels) {
                    allFriends.push(...friendLevels[key]);
                }
                for(const file in allFriends){
                    let userDoc = doc(db, "users", allFriends[file])
                    await getDoc(userDoc).then(async f => {
                        try{
                            let search = await f.data().interests
                            if(search.includes(fields.interests)){
                                filteredFriends.push(allFriends[file])
                            }  
                        } catch {
                            console.log("Cannot find user")
                        }
                    })
                }
                setFiltered(filteredFriends)
            } catch {
                console.log("Current user info not found")
            }
        })
    }

    const getCurrentUser = async() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setUserID(user.uid)
        });
    }
    //Ensure the user is logged in on page load
    useEffect(() => {
        let user = auth.currentUser;
        if (user == undefined) {
            console.log("Loading User")
            getCurrentUser()
        } else if (!user) {
                console.log("Who is logged in here?")
        } else {
            console.log("Logged In")
        }
    }, [userID])

    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        
        const getDocuments = async () => {
        if(filtered){
          const promises = filtered.map(async (id) => {
            const docRef = doc(db, "users", id);
            const myDoc = await getDoc(docRef);
            return myDoc;
          });
        
          const docs = await Promise.all(promises);
          setDocuments(docs);
        }
        };
        
        getDocuments();
      }, [filtered]);

    return(
        <div className="entry-page">
            <div id='inputs' className='grid'>
                <div>
                    <button className='back-button' onClick={() => navigate(-1)}>Back</button>
                </div>
                <div>
                    <h1 className="bold-title">Link with Friends</h1>
                </div>
                <div/>
                <div/>
                <div>
                    <p className='info-text title-spacing'>Search your Solar System to see who's down to clown</p>
                </div>
                <div/>
                <div/>
                <div>
                    <div>
                        <label className='input-label'>INTEREST</label>
                        <input
                            type="text"
                            className="input-box"
                            placeholder={`Enter Interest Here...`}
                            name = 'interests'
                            onChange={UserHandler}
                            
                            />
                    </div>
                    <div>
                        <label className='input-label'>LOCATION</label>
                        <input
                            type="text"
                            className="input-box"
                            placeholder={`Enter Location Here...`}
                            name = 'location'
                            onChange={UserHandler}
                            
                            />
                    </div>
                    <button id='proceed' className='next-button' onClick={() => returnFields()}>Search</button>
                </div>
                <div/>
                <div/>
                <div>
                {documents.map((doc) => (
                    <div key={doc.id}>
                        <ListItem key={doc.id} value={doc} />
                    </div>
                ))}
                </div>
            
            </div>
        </div>
        
    )
}

export default FriendLink