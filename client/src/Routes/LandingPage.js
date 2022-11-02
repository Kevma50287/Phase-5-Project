import React from "react";
import NavButton from "../Components/Buttons/NavButton";
import { v4 as uuid } from 'uuid';
import BasicCard from "../Components/Cards/BasicCard";
import './LandingPage.scss'

const cardsToMake = [
  {
    title: "Create a Hangout",
    content:
      "Tell us what you want to do and we'll find people who want the same. You'll never be at it alone unless you want to!",
    image: "tbd",
  },
  {
    title: "Join a Hangout",
    content: "See what other experiences people are offering and join them!",
    image: "tbd",
  },
  {
    title: "Make Friends",
    content:
      "Enjoyed an experience or had a great conversation? Found a hobby buddy? Message, videochat, and add them!",
    image: "tbd",
  },
];

const LandingPage = () => {
  return (
    <div className="content-container">
      <div className="banner">
        <h1>Welcome to Reach</h1>
        <p>Discover new friends, plan hangouts, and enjoy new experiences! </p>
        <p>
          We believe that everything is best enjoyed with good company.
          Something you want to do but no one is free? We'll help you find the
          perfect buddy to do it with!
        </p>
      </div>
      <div className="flex flex-row space-x-4">
        {cardsToMake.map((card) => {
          return (
            <BasicCard
              key={uuid()}
              title={card.title}
              content={card.content}
              image={card.image}
            />
          );
        })}
      </div>
      <div className="flex flex-col">
        <h1>
          Login or SignUp to start your journey into a world of new
          relationships and experiences!
        </h1>
        <div className="flex flex-row home-buttons-container">
          <NavButton title="Login" navigateTo="/login" size="large" />
          <NavButton title="Signup" navigateTo="/signup" size="large" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;