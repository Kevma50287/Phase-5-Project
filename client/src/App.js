import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Routes/LandingPage";
import LoginPage from "./Routes/LoginPage";
import EventPage from "./Routes/EventPage";
import ProfilePage from "./Routes/ProfilePage";
import SignupPage from "./Routes/SignupPage";
import PersonPage from "./Routes/PersonPage";
import SearchPage from "./Routes/SearchPage";

export const AppContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
    const distanceFromMe = (e) => {
      const R = 6371e3; // metres
      const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (e.lat * Math.PI) / 180;
      const Δφ = ((e.lat - latitude) * Math.PI) / 180;
      const Δλ = ((e.lng - longitude) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // in metres
      const distanceInMiles = Math.round((distance / 1609) * 100) / 100;
      return distanceInMiles;
    };

    const fetchProfile = async () => {
      const res = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.data;
      setUser(data);
      console.log("fetch ran once");
    };
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:3000/events");
      const events = await res.data;
      const eventsWithDistanceFromCurrLocation = events?.map((event) => {
        const distanceInMiles = distanceFromMe(event);
        const updatedEventWithDistanceKeyValuePair = {
          ...event,
          distance: distanceInMiles,
        };
        return updatedEventWithDistanceKeyValuePair;
      });
      setEvents(eventsWithDistanceFromCurrLocation);
    };

    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.data;
      setAllUsers(data);
    };

    fetchEvents();
    fetchProfile();
    fetchUsers();
  }, []);

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
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/user/:userId" element={<PersonPage />} />
            <Route
              path="events"
              element={<EventPage events={events} setEvents={setEvents} />}
            />
            <Route path="users" element={<SearchPage allUsers={allUsers}/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
