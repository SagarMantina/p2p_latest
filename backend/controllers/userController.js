const express=require('express')
const path=require('path')
const bcrypt = require("bcryptjs");
const user=require('../models/accountschema');
const transaction = require("../models/transactionSchema");
const game_details = require("../models/gameschema");



async function updateuserdetails(req, res) {
  const username = req.cookies.username;
  const { name, email, password } = req.body;
 
  // Check if user exists

  const existingUser = await user.findOne({ username : username });
  
  //  console.log(name, email, password);
  if (!existingUser) {
    return res.status(401).json({ errorMessage: "User not found" });
  }
  const exist = await user.findOne({ username });
  try {
  

    let updated = false;

    // Update username if provided
    if (name) {

      exist.username = name;
      updated = true;
      res.clearCookie('username');
      res.cookie("username", name, {
        httpOnly: false,    // Allow access from the frontend
        secure: false,      // Set true in production when using HTTPS
        sameSite: "lax",    // Or "strict" based on your use case
      });
    }

    // Update email if provided
    if (email) {
      exist.email = email;
      updated = true;
    }

    // Update password if provided
    if (password) {
      const isPass = await bcrypt.compare(password, exist.password);
      if (isPass) {
        return res.status(401).json({ errorMessage: "Please enter a different password" });
      } else {
        exist.password = await bcrypt.hash(password, 10); // Hash the new password
        updated = true;
      }
    }

    // If any field was updated, save the user
    if (updated) {
      await exist.save();
      res.status(200).json({ message: "User details updated successfully." });
    } else {
      res.status(400).json({ errorMessage: "No valid fields provided to update." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server issues ");
  }
}



const getuserTransactions = async (req, res) => {
  try {
    const transactions = await transaction.find({buyer: req.cookies.username});
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error !" });
  }
}
const getuserMyGames = async (req, res) => {
  try {
    const username = await req.cookies.username;
    const exists = await user.findOne({ username: username });
    
    if (!exists) {
     return res.status(404).json({ errorMessage: "PLEASE DO LOGIN!!!" });
    }
    const myGames = await game_details.find({ broughtBy: username });

    if (myGames.length === 0) {
      return res.status(404).json({ errorMessage: "No games found for this user." });
    }
    if (myGames) {
     return res.status(200).json({ myGames });
    } 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Sever Error");
  }
};



const checkUser = async (req, res) => {
  try{
    const { username } = req.params;

    console.log(username);
    const db_user = await user.findOne({ username });
    if(!db_user){
     return  res.status(404).json({ errorMessage: "User not found" });
    }
    return res.status(200).json({ message: "User found successfully." });
  }
  catch(error){
    console.error("Error:", error);
   return  res.status(500).send("Internal server issues ");

  }
}
module.exports={updateuserdetails,getuserTransactions,getuserMyGames,checkUser};