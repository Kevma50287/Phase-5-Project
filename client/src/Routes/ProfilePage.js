import {
  Add,
  AddCircle,
  CheckCircle,
  Edit,
  RemoveCircle,
} from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { AppContext } from "../App";
import FunctionButton from "../Components/Buttons/FunctionButton";
import EventCard from "../Components/Cards/EventCard";
import EventForm from "../Components/Form/EventForm";
import "./ProfilePage.scss";

const ProfileInfoContainer = ({
  index,
  objectId,
  title,
  content,
  setToggleEdit,
  toggleEdit,
}) => {
  const { user, setUser } = useContext(AppContext);
  const [currTitle, setCurrentTitle] = useState(title);
  const [text, setText] = useState(content);
  const isCurrentlyEditing = toggleEdit === index;

  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/biography_blocks/${objectId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status === 204) {
      const blocks = user.biography_blocks;
      const updatedBlocks = blocks.filter((obj) => obj.id !== objectId);
      setUser({ ...user, biography_blocks: updatedBlocks });
    } else {
      console.log("something wrong happened");
    }
  };

  const handleEdit = (e) => {
    // if we are not editing this, we change state
    if (!isCurrentlyEditing) {
      setToggleEdit(index);
    } else {
      setToggleEdit(null);
    }
  };

  const handleSaveEdit = async () => {
    const res = await axios.patch(
      `http://localhost:3000/biography_blocks/${objectId}`,
      {
        title: currTitle,
        content: text,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status === 204) {
      const block = user.biography_blocks[index];
      block.title = currTitle;
      block.content = text;
      setToggleEdit(null);
    } else {
      console.log("something wrong happened");
    }
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
            <>
              <CheckCircle className="edit-icon" onClick={handleSaveEdit} />
              <RemoveCircle className="edit-icon" onClick={handleDelete} />
            </>
          ) : null}
        </div>
      </div>
      <br></br>
      {isCurrentlyEditing ? (
        <form onSubmit={handleSaveEdit}>
          <label>Title:</label>
          <input
          className="w-full"
            type="text"
            value={currTitle}
            name="title"
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <label>Content:</label>
          <input className="w-full" type="text" value={text} name="text" onChange={handleChange} />
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
  const [toggleForm, setToggleForm] = useState(false)
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

  const createBioBlock = async () => {
    const res = await axios.post(
      "http://localhost:3000/biography_blocks",
      { title: "New Block", content: "Add Info Here", user_id: user.id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.data;
    console.log(data);
  };

  const handleToggle = () => {
    setToggleForm(e => !e)
  }

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
            <FunctionButton title="Add Block" clickAction={createBioBlock} />
          </div>
          <div className="flex flex-row w-1/3">
            <div className="flex flex-col w-full text-center">
              <div>Attending Events</div>
              <div>
                {user?.events.map((event) => (
                  <EventCard props={event}/>
                ))}
              </div>
              <div className="flex flex-row justify-center gap-x-2">
                <div>Hosted Events</div>
                <AddCircle className="edit-icon" onClick={handleToggle}/>
              </div>
              <div>
                {user?.hosted_events.map((event) => (
                  <EventCard props={event} allowDelete={true}/>
                ))}
              </div>
            </div>
          </div>
          {toggleForm ? <EventForm className='event-form' clickAction={handleToggle}/> : null}
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default ProfilePage;
