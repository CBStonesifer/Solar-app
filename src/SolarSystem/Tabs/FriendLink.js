import '../../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function FriendLink({navigation}){
    let navigate = useNavigate();

    return(
        <div className="entry-page">
            <div id='inputs' className='grid'>
            <div>
                <button className='back-button' onClick={() => navigate(-1)}>Back</button>
            </div>
            <div>
                <h1>Link</h1>
            </div>
            
            </div>
        </div>
        
    )
}

export default FriendLink