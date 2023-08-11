import React from 'react';
import './SolarDesign.css';
import { background } from '@chakra-ui/react';

function InteractiveSystem(props){


    return(
      <div>
        <div>
      <div className="rings-container-main">
      <div className="big-ring-main">
        <div className="circle-main circle-small-main"></div>
      </div>
      <div className="small-ring-main">
        <div className="circleBig-main circle-big-main"></div>
      </div>
      <div className="center-circle-main" style={{backgroundImage: `url(${props.value}`}}>

      </div>
    </div>
        </div>
        </div>
    )


}
export default InteractiveSystem;