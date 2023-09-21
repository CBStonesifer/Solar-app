import '../../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function FriendUpdates({navigation}){
    let navigate = useNavigate();

    return(
        <div className="entry-page">
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>

            <div id='inputs' className='grid'>
            <h1>Updates</h1>
            </div>
        </div>
        
    )
}

export default FriendUpdates