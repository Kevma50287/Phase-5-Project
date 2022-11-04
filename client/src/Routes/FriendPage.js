import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import uuid from "react-uuid";
import { AppContext } from "../App";
import UserCard from "../Components/Cards/UserCard";
import "./EventPage.scss";

const FriendPage = () => {
  const navigate = useNavigate();
  const friends = useContext(AppContext).user.friends
  const renderUserCards = friends.map((user) => (
    <div key={uuid()} onClick={() => navigate(`/user/${user.id}`)}>
      <UserCard username={user.username} image={user.avatar_url} />
    </div>
  ));

  return (
    <>
      <div className="text-center text-6xl mt-4">Friends</div>
      <div className="flex flex-col m-auto text-center">{renderUserCards}</div>
    </>
  );
};

export default FriendPage;
