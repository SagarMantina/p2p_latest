const express = require('express')
const path = require('path');
const bcrypt = require("bcryptjs");
const cookie_parser = require("cookie-parser");
const user = require('../models/accountschema');
var arr=[];


async function postlogin(req, res) {
  const { username, password } = req.body;


  try {
    const exists = await user.findOne({ username });

    if (!exists) {
      console.log("User not found for username:-", username);
      return res.status(401).json({ errorMessage: "Username not found" });
    }

    const isPass = await bcrypt.compare(password, exists.password);

    if (isPass) {
      res.cookie("username", username, {
        httpOnly: false,    // Allow access from the frontend
        secure: false,      // Set true in production when using HTTPS
        sameSite: "lax",    // Or "strict" based on your use case
      });
  
     
      return res.json({ userrole: exists.role });
    } else {
      console.log("Incorrect password for username:-", username);
      return res.status(401).json({ errorMessage: "Incorrect password" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ errorMessage: "Error processing data" });
  }
}

module.exports = { postlogin};