import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import styles from "./ChatPage.module.css";
import Header from './Header'
import { FaRegCircleUser } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Footer";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const ChatPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [contactInput, setContactInput] = useState("");
  const [directMessage, setDirectMessage] = useState("");
  const [isDirectMessage, setIsDirectMessage] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const currentUser = getCookie("username");

  const handleDirectMessage = async() => {
    if (!contactInput.trim() || !directMessage.trim()) return;

    const response = await fetch(`${baseUrl}/check/${contactInput}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data.errorMessage || "Couldn't find the user. Please try again with a valid username.");
      toast.error(data.errorMessage || "Couldn't find the user. Please try again with a valid username.", {
        duration: 5000,
      });
    }
  
   if(response.ok){

    toast.success("Message sent successfully!", {
      duration: 3000,
    });
    const message = {
      sender: currentUser,
      recipient: contactInput,
      content: directMessage,
    };

    // Emit the direct message through the socket
    socket.emit("sendMessage", message);

    // Add the message to the local state to simulate the sent message
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);

    // Add the user to the contact list if not already present
    if (!contacts.includes(contactInput)) {
      setContacts((prev) => [...prev, contactInput]);
    }

    // Reset the input fields and exit direct messaging mode
    setContactInput("");
    setDirectMessage("");
    setIsDirectMessage(false);
  };
}

  useEffect(() => {
    const newSocket = io(`${baseUrl}`, {
      withCredentials: true,
    });
    setSocket(newSocket);
    newSocket.emit("joinRoom", currentUser);

    return () => newSocket.close();
  }, [currentUser]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/contacts`, { withCredentials: true })
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  useEffect(() => {
    if (selectedContact) {
      axios
        .get(`${baseUrl}/messages/${selectedContact}`, { withCredentials: true })
        .then((response) => setMessages(response.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedContact]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        if (
          message.sender === selectedContact ||
          (message.recipient === selectedContact && message.sender === currentUser)
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
  }, [socket, selectedContact, currentUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      sender: currentUser,
      recipient: selectedContact,
      content: newMessage,
    };

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
    setNewMessage("");
  };
  return (
    <div className={styles.fullchat}>
    <Header />
    <div className={styles.chatContainer}>
      <div className={styles.contacts}>
        <h3><a href="/chat">Chat</a></h3>
        <h3>Your Contacts</h3>

        <ul>
          {contacts.map((contact) => (
            <li
              key={contact}
              className={
                selectedContact === contact ? styles.active : undefined
              }
              onClick={() => {
           
                setSelectedContact(contact);
                
              }}
            >
                <FaRegCircleUser size={30} color="yellow" />
              {contact}
            </li>
          ))}
        </ul>
        <h3 className={styles.newchat} onClick={() => setIsDirectMessage(true)}>
          Start a New Chat
        </h3>
      </div>
      <div className={styles.chatWindow}>
        {selectedContact ? (
          <>
            <h3>Chat with {selectedContact}</h3>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === currentUser
                      ? styles.sentMessage
                      : styles.receivedMessage
                  }
                >
                  <p>{msg.content}</p>
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className={styles.messageInput}
              />
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </form>
          </>
        ) : isDirectMessage ? (
          <div className={styles.newchatform}>
            <h3>Start a New Chat</h3>
            <label htmlFor="contactInput">Username:</label>
            <input
              type="text"
              id="contactInput"
              placeholder="Enter User Name"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
            />

            <label htmlFor="messageFor">Message:</label>
            <input
              type="text"
              id="messageFor"
              placeholder="Say Hi!"
              value={directMessage}
              onChange={(e) => setDirectMessage(e.target.value)}
            />

            <button onClick={handleDirectMessage}>Send</button>
          </div>
        ) : (
          <p>Select a contact to start chatting</p>
        )}
      </div>
    </div>
    <ToastContainer />
    <Footer />
    </div>
  );
};

export default ChatPage;
