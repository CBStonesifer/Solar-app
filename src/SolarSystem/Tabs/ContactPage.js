import '../../ComponentStyles.css'
import './ContactCard.css'
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react'
import {doc, getDoc} from "firebase/firestore";
import { auth, db, storage } from "../../firebase/config"
import { getDownloadURL, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Carter from '../Carter.jpeg'
import Overlay from '../Overlay';


function ContactPage({ navigation }){
    let navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [userID, setUserID] = useState();


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
                        <button>Details</button>
                        <button onClick={() => toggleFriendEditor()}>Edit</button>
                    </div>
                </div>
    )}
    const [isOpen, setIsOpen] = useState(false);

    function toggleFriendEditor() {
      setIsOpen(!isOpen);

    };

    const getFriends = async () => {
        let userDoc = doc(db, "users", auth.currentUser.uid)
        
        await getDoc(userDoc).then(Fdoc => {
            try{
                let friendLevels = Fdoc.data().friend
                const allFriends = [];
                for (const key in friendLevels) {
                    allFriends.push(...friendLevels[key]);
                }
                // parse the users friends and lookup their documents in the database
                setContacts(allFriends)
                console.log("Loaded Friends: "+contacts)
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

    useEffect(() => {
        let user = auth.currentUser;
        if (user == undefined) {
            console.log("Loading User")
            getCurrentUser()
        } else if (!user) {
                console.log("Who is logged in here?")
        } else {
            getFriends();
        }
    }, [userID])

    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const getDocuments = async () => {
          const promises = contacts.map(async (id) => {
            const docRef = doc(db, "users", id);
            const myDoc = await getDoc(docRef);
            return myDoc;
          });
          const docs = await Promise.all(promises);
          setDocuments(docs);
        };
        
        getDocuments();
      }, [contacts]);

    return(
        <div className="entry-page">
            <div id='inputs' className='grid'>
            
                <button className='back-button' onClick={() => navigate(-1)}>Back</button>
            
                <h1 className="bold-title">Contacts</h1>
            
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

export default ContactPage