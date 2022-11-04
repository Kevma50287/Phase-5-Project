import { AddCircle } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { AppContext } from "../App";
import FunctionButton from "../Components/Buttons/FunctionButton";
import "./ProfilePage.scss";

const PersonInfoContainer = ({ title, content }) => {
  return (
    <div className="profile-info-container">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
      <br></br>
      <p>{content}</p>
    </div>
  );
};

const PersonPage = () => {
  const {user} = useContext(AppContext)
  const params = useParams();
  const userId = params.userId;
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      const data = await res.data
      setPerson(data)
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const infoArray = person
    ? person["biography_blocks"].map((object, index) => {
        return (
          <PersonInfoContainer
            key={uuid()}
            title={object.title}
            content={object.content}
          />
        );
      })
    : null;


  const handleAddFriend = async () => {
    const res = await axios.post(
      "http://localhost:3000/friendships",
      { user_id:user.id, friend_id: userId},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.data;
    console.log(data);
  }

  const handleDeleteFriend = () => {

  }
  if (person) {
    return (
      <>
        <div className="flex flex-row mt-4">
          <div className="flex flex-col w-2/3">
            <div className="profile-info-container">
              <div className="flex flex-row justify-evenly">
                <img
                  src={person.avatar_url}
                  alt="your profile"
                  className="profile-picture"
                />
                <div className="flex flex-col">
                  <div className="text-5xl">{`${person.first_name} ${person.last_name}`}</div>
                  <div className="text-xl">{`Age: ${person.age}`}</div>
                  <div className="text-xl">{`Sex: ${person.sex}`}</div>
                  <div className="text-xl">{`Friends: ${person.friends.length}`}</div>
                  <div className="text-xl">{`Location: ${person.city}`}</div>
                </div>
              </div>
              <FunctionButton title="Add Friend" clickAction={handleAddFriend}/>
              <FunctionButton title="Delete Friend" clickAction={handleDeleteFriend}/>
            </div>
            {infoArray ? infoArray : null}
          </div>
          {/* <div className="flex flex-row w-1/3">
            <div className="flex flex-col w-full text-center">
              <div>Attending Events</div>
              <div>
                {person?.events.map((event) => (
                  <EventCard props={event}/>
                ))}
              </div>
              <div className="flex flex-row justify-center gap-x-2">
                <div>Hosted Events</div>
              </div>
              <div>
                {person?.hosted_events.map((event) => (
                  <EventCard props={event}/>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default PersonPage;
