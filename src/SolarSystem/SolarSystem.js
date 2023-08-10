import React, {useState , useEffect} from "react";
import { MapInteractionCSS } from 'react-map-interaction';
import "./Solar.css"
import { useNavigate } from "react-router-dom";
import InteractiveSystem from './InteractiveSystem'
import solarSystem from "./solar_system.png"
import { query, collection, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import Overlay from "./Overlay";
import {  signOut } from "firebase/auth";
import { Firestore } from "firebase/firestore";

function SolarSystem({navigation}) {
    let navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    const [findUser, setUser] = useState({
        firstName:"",
        lastName: "",
        email: "",
        phoneNumber: "",
    })

    const[newFriend, setNewFriend] = useState();

    const findFriend = async( phoneNumber ) => {
        let userRef = collection(db, "users");
        let results = query(userRef, where('phoneNumber', '==', phoneNumber))

        // Lof the first name of the user search for by phone Number
        await getDocs(results).then((soughtUser) => {
            if(!soughtUser.empty){
                soughtUser.forEach(async (user)=> {
                    console.log(user.data().firstName)
                    setNewFriend(user.id)
                })
            } else {
                console.log("Invite member to join")
            }
        })
        
        let userDoc = doc(db, "users", (auth.currentUser.uid))

        //Update the freinds field in a user
        updateDoc(userDoc, {
            friend: arrayUnion(newFriend)
        }).then(userDoc => {
            console.log("Updated fields")
        }).catch(error => {
            console.log(error)
        })
        // await getDoc(userDoc).then(Fdoc => {
        //     try{
        //         //this in theory should work
        //         updateDoc(Fdoc, {
        //             friend: arrayUnion(newFriend)
        //         })
        //         //parse the users friends and lookup their documents in the database
        //         // Fdoc.data().friend.forEach(async (connection) => {
        //         //     let friendDoc = doc(db, "users", (connection))
        //         //     await getDoc(friendDoc).then((Fdoc) => {
        //         //         try {
        //         //             console.log(Fdoc.data().firstName)
        //         //         } catch{
        //         //             console.log("User no longer exists")
        //         //         }
        //         //     })})
        //     } catch {
        //         console.log("Current user info not found")

        //     }
        // })
        

    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleOverlay = () => {
      setIsOpen(!isOpen);
    };

    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
    }

    const TabHandler = (e) => {
        const { name } = e.target;
        navigate(`/src/SolarSystem/Tabs/${name}.js`)
    }

    // useEffect(() => {
    //     console.log(newFriend)
    // })

    //INSIDE THE OVERLAY below, Design a text field to look up users with their name and number, then add them to their database of friends:
    //Also design database of friends to collect users by category

    return (
        <div className="solar-page">
            <div className="container">
                <div className="sidebar">
                    <h1 className="solar-main-title">Solar</h1>
                    <button className="add-friend" onClick={() => toggleOverlay()}>Add</button>
                    <button className="add-friend" onClick={handleLogout}>Sign Out</button>
                </div>
                    
                <div className="main interactive-system">
                    <MapInteractionCSS
                        defaultValue={{
                            scale: 4,
                            translation: { x: 0, y: 300 }
                        }}
                        minScale={0.5}
                        maxScale={5}
                        translationBounds={{
                            xMax: 1100,
                            yMax:800,
                            yMin:-50,
                            xMin:-1100,
                        }}>
                            <InteractiveSystem />
                </MapInteractionCSS>


                <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                <label className='input-label'>User Phone Number</label>
                    <input
                        type="text"
                        className="input-box"
                        placeholder={`Enter Number Here...`}
                        name = 'phoneNumber'
                        onChange={UserHandler}
                        value={findUser.phoneNumber}
                        />
                        <button id='proceed' className='next-button' onClick={() => findFriend(findUser.phoneNumber)}>Search</button>
                </Overlay>


                </div>
                <div className="content">
                <div className="layout-main ">
                <i className="grid-item-main">
                    <button className="grid-item-button menu-item reminder" name="FriendReminder" onClick={TabHandler}>
                    </button>
                </i>
                <i className="grid-item-main"><button className="grid-item-button menu-item link"
                name="FriendLink" onClick={TabHandler}></button></i>
                <i className="grid-item-main"><button className="grid-item-button menu-item contact"
                name="ContactPage" onClick={TabHandler}></button></i>
                <i className="grid-item-main"><button className="grid-item-button menu-item inbox"
                name="FriendUpdates" onClick={TabHandler}></button></i>
                </div>

                </div>
            </div>
            
        </div>
    )
}

export default SolarSystem

/**
 * <div id='inputs' className='solar-grid'>
            <i></i>
            <i>
            <h1>Solar</h1></i>
            <i></i>
            <i></i>
            <i>
        
            <MapInteractionCSS
            className = "interactive-system"
            defaultValue={{
                scale: 1,
                translation: { x: 0, y: 20 }
            }}
            minScale={0.5}
            maxScale={3}
            translationBounds={{
                xMax: 200,
                yMax:200
            }}>
                <InteractiveSystem/>
            </MapInteractionCSS>
            </i>
            <i></i>
            </div>
 */