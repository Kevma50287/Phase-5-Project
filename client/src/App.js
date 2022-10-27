import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import './App.css';
import Form from './Components/Form/SignUpForm';

const AppContext = React.createContext();

function App() {
  const [user, setUser] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const {coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchPosition:true,
  })

  useEffect(() => {
    if (coords?.latitude){
      setLatitude(coords.latitude)
    }
    
    if (coords?.longitude){
      setLongitude(coords.longitude)
    }
    // return () => {
    //   second
    // }
  }, [coords])
  

  const contextObj = {
    user: user,
    location: {
      latitude:latitude,
      longitude:longitude,
    }
  }
  // console.log(contextObj)

  return (
    <AppContext.Provider value={contextObj}>
      <div className="App">
        <Form/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
