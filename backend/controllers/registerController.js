const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const user = require("../models/accountschema");



async function postregister(req, res) {
  try {
    let { email, username, password, confirm_pass, userrole } = req.body;

    const hash_pswd = await bcrypt.hash(password, 10);
    const exists = await user.findOne({ username });
    const exists1 = await user.findOne({ email });

    if (confirm_pass !== password) {
      return res.status(401).json({ errorMessage: "Please Enter same Password" });
    }

    const totalusers = await user.countDocuments({});
    if (totalusers === 0) {
      userrole = "admin"; 
    }

    if (exists) {
      console.log("username already exists for:", username);
      return res.status(401).json({ errorMessage: "Username already exists" });
    }

    if (exists1) {
      console.log("Email already exists for:", email);
      return res.status(401).json({ errorMessage: "Email already exists" });
    }

    const new_user = new user({
      email,
      username,
      password: hash_pswd,
      role: userrole,
    });

    await new_user.save();
    res.status(201).json({ message: "Registration successful!" }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = {  postregister };
