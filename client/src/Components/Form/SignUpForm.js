import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import FormInput from "./FormInput";
import "./Form.scss";
import BasicModal from "../Modal/BasicModal";

const handleSubmitErrors = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
};

const SignUpForm = () => {
  // Context
  const { setUser } = useContext(AppContext);

  // State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    first_name: "",
    last_name: "",
    sex: "",
    age: "",
    zipcode: "",
    avatar: "",
  });

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const [preview, setPreview] = useState(false);

  // Handler Functions
  const handleFormInput = (e) => {
    if (e.target.files?.length > 0) {
      setFormData({ ...formData, avatar: e.target.files[0] });
      // To Access the uploaded file content we need to first convert it into an Object URL(uniform resource locator)
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleZipCodeApi = async () => {
    const zipResponse = await axios.post("http://localhost:3000/location", {
      zipcode: formData.zipcode,
    });
    const zipData = await zipResponse.data[formData.zipcode];
    console.log(zipData);
    // destructure to replace zipcode with new location data
    const { zipcode, avatar, ...userObj } = formData;
    userObj["location"] = `${zipData.city}, ${zipData.state}`;
    userObj["city"] = `${zipData.city}`;
    userObj["state"] = `${zipData.state}`;
    userObj["lat"] = zipData.lat;
    userObj["lng"] = zipData.lng;

    return userObj;
  };

  const handleSubmitApi = async (obj) => {
    const res = await axios.post("/users", obj);
    const data = await res.data;
    return data;
  };

  const setData = async (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.jwt);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO:comment this in for final product
      const userObj = await handleZipCodeApi();
      console.log(userObj);
      // // TODO:comment this out
      // const { zipcode, avatar, ...userObj } = formData

      // Because we are sending a file to the database we need to attach it to a formdata object - can't JSON.stringify file object
      const dataObj = new FormData();
      for (const [key, value] of Object.entries(userObj)) {
        dataObj.append(`user[${key}]`, value);
      }
      dataObj.append("user[avatar]", formData.avatar);
      console.log(dataObj)
      const data = await handleSubmitApi(dataObj);
      // for (var pair of dataObj.entries()){
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      console.log(data);
      setData(data);
      handleShow();
    } catch (error) {
      handleSubmitErrors(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-center w-1/2 mt-4 mx-auto text-center gap-y-4"
        onSubmit={handleFormSubmit}
      >
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="username"
          inputLabel="Username"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="password"
          inputLabel="Password"
          inputType="password"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="password_confirmation"
          inputLabel="Password Confirmation"
          inputType="password"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="first_name"
          inputLabel="First Name"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="last_name"
          inputLabel="Last Name"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="email"
          inputLabel="Email Address"
        />
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="age"
          inputLabel="Age"
          inputType="number"
        />
        <div className="flex flew-rox">
          <div className="w-1/3 text-right pr-4">
            <label htmlFor="sex">Sex:</label>
          </div>
          <div className="mr-4">
            <input
              name="sex"
              type="radio"
              value="M"
              checked={formData.sex === "M"}
              onChange={handleFormInput}
            ></input>{" "}
            M
          </div>
          <div>
            <input
              name="sex"
              type="radio"
              value="F"
              checked={formData.sex === "F"}
              onChange={handleFormInput}
            ></input>{" "}
            F
          </div>
        </div>
        <FormInput
          formData={formData}
          handleFormInput={handleFormInput}
          formKey="zipcode"
          inputLabel="ZipCode"
          inputType="number"
        />
        <div className="flex flex-row">
          <div className="w-1/3 text-right pr-4">
            <label htmlFor="avatar">Profile Picture:</label>
          </div>
          <div>
            <input
              className="bg-gray-100 rounded border-2 border-gray-300 w-full"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFormInput}
            ></input>
          </div>
        </div>
        <div>{preview && <img src={preview} alt="profile" />}</div>
        <div className="flex flex-col">
          <div className="w-1/3"></div>
          <div>
            <button
              className="bg-sky-200 w-1/2 m-auto rounded border-2 border-blue-400 text-slate-600"
              type="submit"
            >
              {" "}
              Create Account{" "}
            </button>
          </div>
        </div>
      </form>
      <BasicModal show={show} setShow={setShow} navigateTo="/profile" title="Success" message="Account has been created - you will now be redirected to your profile page" />
    </>
  );
};

export { handleSubmitErrors };
export default SignUpForm;
