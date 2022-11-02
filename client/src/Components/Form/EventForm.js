import axios from "axios";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import { handleSubmitErrors } from "./SignUpForm";
import "./Form.scss";
import FunctionButton from "../Buttons/FunctionButton";
import NavButton from "../Buttons/NavButton";
import BasicModal from "../Modal/BasicModal";
import { AppContext } from "../../App";

const EventForm = () => {
  // Context
  const { user } = useContext(AppContext);

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
    image_url: null,
  });

  const [show, setShow] = useState(false);

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
    const { latt, longt } = await coordinateResponse.data[formData.zipcode];
    console.log(latt, longt);
    // destructure to replace zipcode with new location data
    const eventObj = { ...formData, lat: latt, lng: longt };
    console.log(eventObj);
    return eventObj;
  };

  // Creates the Event
  const handleSubmitApi = async (obj) => {
    const res = await axios.post("/events", obj);
    const data = await res.data;
    return data;
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventObj = await handleCoordinateApi();
      console.log(eventObj);

      const data = await handleSubmitApi(eventObj);

      console.log(data);
      handleShow();
    } catch (error) {
      handleSubmitErrors(error);
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
  const formInputArray = Object.keys(formData).map((key) => {
    if (key === "zipcode" || key === "party_size") {
      return (
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey={key}
          inputLabel={sentenceCase(key)}
          inputType="number"
        />
      );
    } else {
      return (
        <FormInput
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
        className="flex flex-col justify-center w-1/2 mt-4 mx-auto text-center gap-y-4"
        onSubmit={handleFormSubmit}
      >
        {formInputArray}
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
          </div>
        </div>
      </form>
      <BasicModal show={show} setShow={setShow} navigateTo="/events" />
    </>
  );
};

export default EventForm;
