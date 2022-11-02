import axios from "axios";
import React, { useEffect, useState } from "react";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:3000/events");
      const { events } = await res.data;
      console.log(events);
      setEvents(events);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div>EventPage</div>
      <div>Filters</div>
      <div>Events Container</div>
    </>
  );
};

export default EventPage;
