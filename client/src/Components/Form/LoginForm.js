import axios from "axios";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import { handleSubmitErrors } from "./SignUpForm";
import "./Form.scss";
import FunctionButton from "../Buttons/FunctionButton";
import NavButton from "../Buttons/NavButton";
import BasicModal from "../Modal/BasicModal";
import { AppContext } from "../../App";

const LoginForm = () => {
  // Context
  const { setUser } = useContext(AppContext);

  // State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  // Handler Functions
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setData = async (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.jwt);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", formData);
      const data = await res.data
      setData(data)
      handleShow()
    } catch (error) {
      console.log(error)
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
      <div className="flex flex-col justify-center text-center content-center">
        <div className="mt-2">
          <FunctionButton title="Login" clickAction={handleFormSubmit}/>
        </div>
        <div className="my-2">
          <NavButton title="Signup" navigateTo="/signup" />
        </div>
      </div>
    </form>
    <BasicModal show={show} setShow={setShow} title='Success' message="You are now logged in!" navigateTo="/profile"/>
    </>
  );
};

export default LoginForm;
