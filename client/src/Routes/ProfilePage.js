import { CheckCircle, Edit } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import uuid from "react-uuid";
import { AppContext } from "../App";
import EventCard from "../Components/Cards/EventCard";
import "./ProfilePage.scss";

const ProfileInfoContainer = ({
  index,
  objectId,
  title,
  content,
  setToggleEdit,
  toggleEdit,
}) => {
  const { user } = useContext(AppContext);
  const [currTitle, setCurrentTitle] = useState(title);
  const [text, setText] = useState(content);
  const isCurrentlyEditing = toggleEdit === index;

  const handleEdit = (e) => {
    // if we are not editing this, we change state
    if (!isCurrentlyEditing) {
      setToggleEdit(index);
    } else {
      setToggleEdit(null);
    }
  };

  const handleSaveEdit = async () => {
    const updateBio = async () => {
      const res = await axios.patch(
        `http://localhost:3000/biography_blocks/${objectId}`,
        {
          title: currTitle,
          content: text,
        },
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      return res;
    };

    const status = await updateBio().status;
    if (status === 204){

    } else {
      console.log('something wrong happened')
    }
    setToggleEdit(null);
  };

  const handleChange = (e) => {
    if (e.target.name === "text") {
      setText(e.target.value);
    } else {
      setCurrentTitle(e.target.value);
    }
  };

  return (
    <div className="profile-info-container">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">{currTitle}</h1>
        <div>
          <Edit className="edit-icon" onClick={handleEdit} />
          {isCurrentlyEditing ? (
            <CheckCircle className="edit-icon" onClick={handleSaveEdit} />
          ) : null}
        </div>
      </div>
      <br></br>
      {isCurrentlyEditing ? (
        <form onSubmit={handleSaveEdit}>
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleChange}
          />
          <input type="text" value={text} name="text" onChange={handleChange} />
        </form>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  const [toggleEdit, setToggleEdit] = useState("");
  const infoArray = user
    ? user["biography_blocks"].map((object, index) => {
        return (
          <ProfileInfoContainer
            key={uuid()}
            objectId={object.id}
            index={index}
            title={object.title}
            content={object.content}
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
          />
        );
      })
    : null;

  if (user) {
    return (
      <>
        <div className="flex flex-row mt-4">
          <div className="flex flex-col w-2/3">
            <div className="profile-info-container">
              <div className="flex flex-row justify-evenly">
                <img
                  src={user.avatar_url}
                  alt="your profile"
                  className="profile-picture"
                />
                <div className="flex flex-col">
                  <div className="text-5xl">{`${user.first_name} ${user.last_name}`}</div>
                  <div className="text-xl">{`Age: ${user.age}`}</div>
                  <div className="text-xl">{`Sex: ${user.sex}`}</div>
                  <div className="text-xl">{`Friends: ${user.friends.length}`}</div>
                  <div className="text-xl">{`Location: ${user.city}`}</div>
                </div>
              </div>
            </div>
            {infoArray}
          </div>
          <div className="flex flex-row w-1/3">
            <div className="flex flex-col w-full text-center">
              <div>Attending Events</div>
              <div>
                {user.events.map((event) => (
                  <EventCard />
                ))}
              </div>
              <div>Hosted Events</div>
              <div>
                {user.hosted_events.map((event) => (
                  <EventCard />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default ProfilePage;
