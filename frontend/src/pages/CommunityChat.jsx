import React, { useState, useEffect } from "react";
import styles from "./CommunityChat.module.css";
import { useParams } from "react-router-dom";
import Header from "./Header";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
export default function CommunityChat() {
  const { communityname } = useParams();  // Correct use of useParams here
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${baseUrl}/community/${communityname}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      }
    };

    if (communityname) {
      fetchMessages();
    }
  }, [communityname]);

  const handleSend = async () => {
    try {
      const response = await fetch(`${baseUrl}/community/${communityname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
        credentials: "include",
      });
      if (response.ok) {
        setNewMessage("");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <>
   <Header />
   <div className={styles.container}>
      <h1 className={styles.title}>Community: {communityname}</h1>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.sender.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
   </>
  );
}
