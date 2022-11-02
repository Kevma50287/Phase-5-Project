import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "../Components/Cards/EventCard";
import Filter from "../Components/Form/Filter";
import eventBanner from '../Images/Destination.png'
import './EventPage.scss'

const EventPage = () => {
  // Hold all the events
  const [events, setEvents] = useState([]);
  //Hold the filter for the events
  const [filter, setFilter] = useState('None')

  const tags = new Set(events?.map(event => event.tags).flat(1))

  const filteredEvents = events.filter(event => event.tags.includes(filter))

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:3000/events");
      const { events } = await res.data;
      console.log(events);
      setEvents(events);
    };

    fetchEvents();
  }, []);

  const eventsArray = filteredEvents?.map((event) => {
    return (
      <EventCard 
        props={event}
      />
    )
  })

  return (
    <>
      <div className="banner-wrapper w-full">
        <img src={eventBanner} alt="event banner" className="w-auto h-auto m-auto"/>
      </div>
      <div className="text-center text-6xl mt-4">Events</div>
      <div>
        <Filter filter={filter} setFilter={setFilter} tags={tags} />
      </div>
      <div>
        {eventsArray}
      </div>
    </>
  );
};

export default EventPage;
