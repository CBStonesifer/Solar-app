import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import SignUp from './Login/SignUp';
import ExistingUser from './Login/ExistingUser';
import SolarLogo from './Login/SolarLogo';
import AdditionalInfo from "./Login/AdditionalInfo";
import SolarSystem from "./SolarSystem/SolarSystem";
import FriendReminder from "./SolarSystem/Tabs/FriendReminder";
import FriendLink from "./SolarSystem/Tabs/FriendLink";
import ContactPage from "./SolarSystem/Tabs/ContactPage";
import FriendUpdates from "./SolarSystem/Tabs/FriendUpdates";


function App() {

  return (
    <div  className='App'>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SolarLogo />} />
            <Route path="/src/Login/ExistingUser.js" element={<ExistingUser />} />
            <Route path="/src/Login/NewUser.js" element={<SignUp />} />
            <Route path="/src/Login/AdditionalInfo.js" element={<AdditionalInfo />} />
            <Route path="/src/SolarSystem/SolarSystem.js" element={<SolarSystem />} />
            <Route path="/src/SolarSystem/Tabs/FriendReminder.js" element={<FriendReminder />} />
            <Route path="/src/SolarSystem/Tabs/FriendLink.js" element={<FriendLink />} />
            <Route path="/src/SolarSystem/Tabs/ContactPage.js" element={<ContactPage />} />
            <Route path="/src/SolarSystem/Tabs/FriendUpdates.js" element={<FriendUpdates />} />

        </Routes>
    </BrowserRouter>

      
    </div>
  );
}

export default App;
