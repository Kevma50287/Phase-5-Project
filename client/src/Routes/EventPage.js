import axios from "axios";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { AppContext } from "../App";
import EventCard from "../Components/Cards/EventCard";
import Filter from "../Components/Form/Filter";
import Sort from "../Components/Form/Sort";
import eventBanner from "../Images/Destination.png";
import "./EventPage.scss";

const EventPage = ({events, setEvents}) => {

  //Hold the filter for the events
  const [filter, setFilter] = useState("None");
  const [sortVal, setSortVal] = useState(0);

  const contextObj = React.useContext(AppContext);
  const currlocation = contextObj.location;

  const tags = new Set(events?.map((event) => event.tags).flat(1));

  const sortArr = (arr) => {
    let sorted = [...arr];
    switch (sortVal) {
      case "1":
        return sorted.sort((a, b) => {
          const A = a.distance;
          const B = b.distance;
          return A - B;
        });
      case "2":
        return sorted.sort((a, b) => {
          const A = a.party_size;
          const B = b.party_size;
          return A - B;
        });
      default:
        return sorted;
    }
  };

  const filteredEvents =
    filter !== "None"
      ? events?.filter((event) => event.tags.includes(filter))
      : events;

  const sortedEvents = sortArr(filteredEvents)

  const eventsArray = sortedEvents?.map((event) => {
    return (
      <div>
        <EventCard key={uuid()} props={event} />
      </div>
    );
  });

  return (
    <>
      <div className="banner-wrapper w-full">
        <img
          src={eventBanner}
          alt="event banner"
          className="w-auto h-auto m-auto"
        />
      </div>
      <div className="text-center text-6xl mt-4">Events</div>
      <div className="flex flex-row gap-x-12">
        <div className="flex flex-col ml-8 w-1/5">
          <Filter filter={filter} setFilter={setFilter} tags={tags} />
          <Sort sortVal={sortVal} setSortVal={setSortVal} />
        </div>
        <div className="flex flex-col gap-y-12 w-4/5 m-auto">{eventsArray}</div>
      </div>
    </>
  );
};

export default EventPage;
