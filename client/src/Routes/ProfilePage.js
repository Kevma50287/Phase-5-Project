import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  if (user) {
    return (
      <>
        <div className="flex flex-row">
          <div className="flex flex-col w-2/3">
            <div className="profile-info-container">
              <div className="flex flex-row">
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
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/3">
              <div>Events</div>
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
