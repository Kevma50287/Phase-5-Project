import axios from "axios";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import { handleSubmitErrors } from "./SignUpForm";
import "./Form.scss";
import BasicModal from "../Modal/BasicModal";
import { AppContext } from "../../App";
import TagInput from "./TagInput";

const EventForm = ({clickAction}) => {
  // Context
  const { user, setUser } = useContext(AppContext);

  // State
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    city: "",
    state: "",
    zipcode: 0,
    party_size: 0,
    what: "",
    when: "",
    why: "",
    image_url: ""
  });

  const [show, setShow] = useState(false);
  const [tags, setTags] = useState([])




  // Handler Functions
  const handleShow = () => {
    setShow(true);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Forward GeoCoding to retrieve coordinates of event based on location/address
  const handleCoordinateApi = async () => {
    const coordinateResponse = await axios.post(
      "http://localhost:3000/coordinates",
      {
        location: `${formData.location} ${formData.city}, ${formData.state} ${formData.zipcode}`,
      }
    );
    const data = await coordinateResponse.data;
    // console.log(data);
    // destructure to replace zipcode with new location data
    const eventObj = { ...formData, lat: data.latt, lng: data.longt };
    // console.log(eventObj);
    return eventObj;
  };

  // Creates the Event
  const handleSubmitApi = async (obj) => {
    const res = await axios.post("/events", {...obj, user_id:user.id, tags:tags, avatar_url: user.avatar_url}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.data;
    return data;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventObj = await handleCoordinateApi();
      console.log(`Obj retruned by api function: ${eventObj}`);
      const data = await handleSubmitApi(eventObj);

      console.log(`Data retruned by backendAPI function:`, data);
      const updateUserEvent = [...user.events]
      updateUserEvent.push(data)
      const updatedUserHostedEvent = [...user.hosted_events]
      updatedUserHostedEvent.push(data)
      const updatedUser = {...user, events:updateUserEvent, hosted_events:updatedUserHostedEvent}
      setUser(updatedUser)
      handleShow();
    } catch (error) {
      handleSubmitErrors(error)
      console.log(error);
    }
  };

  function sentenceCase(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  //Creates an array of inputs
  const formInputArray = Object.keys(formData).map((key, index) => {
    if (key === "zipcode" || key === "party_size") {
      return (
        <FormInput
          key={index}
          formData={formData}
          handleFormInput={handleFormInput}
          formKey={key}
          inputLabel={sentenceCase(key)}
          inputType="number"
        />
      );
    } else if (key==='when') {
      return (
        <FormInput
          key={index}
          formData={formData}
          handleFormInput={handleFormInput}
          formKey={key}
          inputLabel={sentenceCase(key)}
          inputType="datetime-local"
        />
      )
    } else if (key ==='tags') {
      return (
        null
      )
    }
    
    else {
      return (
        <FormInput
          key={index}
          formData={formData}
          handleFormInput={handleFormInput}
          formKey={key}
          inputLabel={sentenceCase(key)}
        />
      );
    }
  });

  return (
    <>
      <form
        className="flex flex-col justify-center w-1/2 mt-4 mx-auto text-center gap-y-4 event-form"
        onSubmit={handleFormSubmit}
      >
        {formInputArray}
        <TagInput tags={tags} setTags={setTags}/>
        <div>
          {formData.image && <img src={formData.image} alt="main event" />}
        </div>
        <div className="flex flex-col">
          <div className="w-1/3"></div>
          <div>
            <button
              className="bg-sky-200 w-1/2 m-auto rounded border-2 border-blue-400 text-slate-600"
              type="submit"
            >
              {" "}
              Create Event{" "}
            </button>
            <button
              className="bg-sky-200 w-1/2 m-auto rounded border-2 border-blue-400 text-slate-600"
              onClick={clickAction}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      </form>
      <BasicModal show={show} setShow={setShow} title={'Success'} message={`Event has been created!`} reload={true} />
    </>
  );
};

export default EventForm;
