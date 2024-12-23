
import React, { useState, useEffect } from "react";
import styles from "./Communities.module.css";
import { useNavigate } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
export default function Communities() {
  const [allCommunities, setAllCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [newCommunity, setNewCommunity] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all communities
        const responseAll = await fetch(`${baseUrl}/community`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const allData = await responseAll.json();
        setAllCommunities(allData);

        // Fetch user's communities
        const responseUser = await fetch(`${baseUrl}/user/communities`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const userData = await responseUser.json();
        setUserCommunities(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleJoin = (communityName) => {
    fetch(`${baseUrl}/joincommunity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ communityName }),
    })
      .then(() => {
        alert("Joined community successfully!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // Send community name and description to the backend
    fetch(`${baseUrl}/createcommunity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        community_name: newCommunity,
        description: description, // Send description as well
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Community created successfully!");
          window.location.reload();
        } else {
          alert(data.error); // Handle errors, like community already exists
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCommnityRedirect = (communityName) => {
    navigate(`/communities/${communityName}`);
  };

  return (
   <>
   <Header />
   <div className={styles.container}>
      <h1 className={styles.title}>Communities</h1>

      <div className={styles.section}>
        <h2>Your Communities</h2>
        <ul className={styles.list}>
          {userCommunities.map((community) => (
            <li key={community._id} className={styles.community } onClick={()=>{handleCommnityRedirect(community.name)}}>
              {community.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>All Communities</h2>
        <ul className={styles.list}>
          {allCommunities.map((community) => (
            <li key={community._id} className={styles.community}>
              {community.name}
              <button
                className={styles.joinButton}
                onClick={() => handleJoin(community.name)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.createSection}>
        <h2>Create Community</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Community Name"
            value={newCommunity}
            onChange={(e) => setNewCommunity(e.target.value)}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Community Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            required
          ></textarea>
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
    <Footer />
   </>
  );
}

