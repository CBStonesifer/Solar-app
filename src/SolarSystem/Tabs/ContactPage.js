import '../../ComponentStyles.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function ContactPage({navigation}){
    let navigate = useNavigate();

    return(
        <div className="entry-page">
            <div id='inputs' className='grid'>
            <div>
                <button className='back-button' onClick={() => navigate(-1)}>Back</button>
            </div>
            <div>
                <h1>Contacts</h1>
            </div>
            
            </div>
        </div>
        
    )
}

export default ContactPage