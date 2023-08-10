import React from 'react';
import './RotatingRing.css';
import UserEntry from './UserEntry';


function SolarLogo(){


    return(
      <div>
        <div>
      <div className="rings-container">
      <div className="big-ring">
        <div className="circle circle-small"></div>
      </div>
      <div className="small-ring">
        <div className="circleBig circle-big"></div>
      </div>
      <div className="center-circle"></div>
    </div>
            <h1 className="solar-title"> Solar</h1>
        </div>
        <UserEntry />
        </div>
    )


}
export default SolarLogo;