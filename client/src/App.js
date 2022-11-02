import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

export const AppContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchPosition: false,
    });

  useEffect(() => {
    if (coords?.latitude) {
      setLatitude(coords.latitude);
    }

    if (coords?.longitude) {
      setLongitude(coords.longitude);
    }
    // return () => {
    //   second
    // }
    console.log("useffect for coord ran");
  }, [coords]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.data;
      setUser(data);
      console.log("fetch ran once");
    };
    fetchProfile();
  }, []);

  const contextObj = {
    user: user,
    setUser: setUser,
    location: {
      latitude: latitude,
      longitude: longitude,
    },
  };
  // console.log(contextObj)

  return (
    <AppContext.Provider value={contextObj}>
      <BrowserRouter>
        <NavBar/>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="events" element={<EventPage />} />
          </Routes>
        </main>

        {/* <div className="App">
          <SignUpForm/>
        <LoginForm/>
          <ChatRoom user={user} />
        </div> */}
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
