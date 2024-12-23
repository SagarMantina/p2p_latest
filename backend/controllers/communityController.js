const community = require("../models/commmunitySchema");
const mongoose = require("mongoose");
const user = require("../models/accountschema");

async function joinCommunity(req, res) {
  try {
      const username = req.cookies.username;
      const { communityName } = req.body;
   
      const userDoc = await user.findOne({ username });
      if (!userDoc) return res.status(404).json({ error: "User not found." });

      const communityDoc = await community.findOne({ name: communityName });
      if (!communityDoc) return res.status(404).json({ error: "Community not found." });

      if (!communityDoc.user.includes(userDoc._id)) {
          communityDoc.user.push(userDoc._id);
          await communityDoc.save();
          return res.status(200).json({ success: "Joined the community." });
      }
      res.status(400).json({ error: "Already a member of the community." });
  } catch (error) {
      console.error("Error joining community:", error);
      res.status(500).json({ error: "Internal server error." });
  }
}

async function createCommunity(req, res) {
  try {
      const username = req.cookies.username;
   
      const exists_user = await user.findOne({ username: username });
       
      if (!exists_user) {
          return res.status(404).json({ error: "User not found." });
      }
      const { community_name, description } = req.body;


      const exists_community = await community.findOne({ name: community_name });
      if (username && !exists_community) {
          const new_community = new community({
              name: community_name,
              user: [exists_user._id],
              description,
          });
          await new_community.save();
         res.status(200).json({ success: "Community created successfully." });
      } else {
          res.status(400).json({ error: "Community already exists." });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server issues");
  }
}

async function getUserCommunities(req, res) {
  try {
      const username = req.cookies.username;
      const userDoc = await user.findOne({ username });
      if (!userDoc) return res.status(404).json({ error: "User not found." });

      const userCommunities = await community.find({ user: userDoc._id });
      res.status(200).json(userCommunities);
  } catch (error) {
      console.error("Error fetching user's communities:", error);
      res.status(500).json({ error: "Internal server error." });
  }
}

async function getCommunity(req, res) {
  const communities = await community.find({});

  res.json(communities);
}

async function getcommunityChat(req, res) {
  try {
      const username = req.cookies.username;
      const communityName = req.params.community;

      // Check if the community exists
      const exists_community = await community.findOne({ name: communityName }).populate('messages.sender', 'username'); 

      if (!exists_community) {
          return res.status(404).json({ errorMessage: "Community not found." });
      }

      // Check if the user exists
      const exists_user = await user.findOne({ username: username });
      if (! exists_user) {
          return res.status(404).json({ errorMessage: "User not found." });
      }

      // Respond with user information and community chat messages
      res.json({
          user: {
              username:  exists_user.username,
              // Add other user fields as necessary
          },
          community: exists_community.name,
          messages: exists_community.messages,
      });
  } catch (error) {
      console.error("Error fetching community chat:", error);
      res.status(500).json({ errorMessage: "Internal server error." });
  }
}
async function sendMessage(req, res) {
  try {
      const username = req.cookies.username; // Get the username from cookies
      const communityName = req.params.community; // Get the community name from request parameters
      const { message } = req.body; // Get the message from the request body

      // Check if the community exists
      const communityDoc = await community.findOne({ name: communityName });
      if (!communityDoc) {
          return res.status(404).json({ errorMessage: "Community not found." });
      }

      // Check if the user exists
      const userDoc = await user.findOne({ username: username });
      if (!userDoc) {
          return res.status(404).json({ errorMessage: "User not found." });
      }

      // Create a new message object
      const newMessage = {
          sender: userDoc._id, // Use the user's ObjectId as the sender
          message: message, // Message content
      };

      // Add the message to the community's messages array
      communityDoc.messages.push(newMessage);
      await communityDoc.save();

      res.status(200).json({ successMessage: "Message sent successfully.", message: newMessage });
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ errorMessage: "Internal server error." });
  }
}

module.exports = {
  createCommunity,
  joinCommunity,
  getCommunity,
  getcommunityChat,
  sendMessage,
  getUserCommunities,
};
