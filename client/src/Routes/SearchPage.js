import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import uuid from "react-uuid";
import UserCard from "../Components/Cards/UserCard";
import "./EventPage.scss";

const SearchPage = ({ allUsers }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const searchedArray = allUsers?.filter((user) => {
    const { username, first_name, last_name } = user;
    return (
      username.toLowerCase().includes(keyword.toLowerCase()) ||
      first_name.toLowerCase().includes(keyword.toLowerCase()) ||
      last_name.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  console.log(searchedArray);

  const renderUserCards = searchedArray.map((user) => (
    <div key={uuid()} onClick={() => navigate(`/user/${user.id}`)}>
      <UserCard username={user.username} image={user.avatar_url} />
    </div>
  ));

  return (
    <>
      <div className="text-center text-6xl mt-4">Users</div>
      <div className="flex flex-col m-auto text-center">{renderUserCards}</div>
    </>
  );
};

export default SearchPage;
