import React, { useState, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import axios from "axios";

const consumer = createConsumer(getWebSocketURL);

function getWebSocketURL() {
  const token = localStorage.getItem("token");
  return `http://localhost:3000/cable?token=${token}`;
}

function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [channel, setChannel] = useState(null);

  // Specify a different URL to connect to

  // Use a function to dynamically generate the URL
  createConsumer(getWebSocketURL);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        const res = await axios.get("http://localhost:3000/messages", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.data;
        setMessages(data);
      }
    };

    const makeChannel = async () => {
      if (user) {
        const newChannel = consumer.subscriptions.create(
          { channel: "ChatChannel", room: "Breakfast Club" },
          {
            received: (data) => {
              // console.log(data)
              setMessages((oldMessages) => {
                console.log(oldMessages)
                return [...oldMessages, data]
              });
              // console.log(messages)
              setMessageInput("");
            },
          }
        );

        setChannel(newChannel);
      }
    };

    fetchMessages();
    makeChannel()
  }, [user]);

  console.log(messages)

  function handleMessageInputChange(e) {
    setMessageInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    channel.send({ content: messageInput });
    console.log("hi");
    // setMessageInput("");
  }

  return (
    <div>
      <h3>Cat Chat Room:</h3>

      {messages.map((message, i) => (
        <p key={i}>
          {message.content} - {message.created_at}
        </p>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="bg-gray-100 rounded border-2 border-gray-300 w-full"
          type="text"
          value={messageInput}
          onChange={handleMessageInputChange}
        />
      </form>
    </div>
  );
}

export default ChatRoom;
