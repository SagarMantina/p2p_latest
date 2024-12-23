const express=require('express')
const path=require('path')
const bcrypt = require("bcryptjs");
const user=require('../models/accountschema');

async function postregister2(req, res) {
  try {
      const { dateOfBirth, backupKey } = req.body;

      const latest_user = await user.findOne().sort({ _id: -1 }).limit(1);

      if (!latest_user) {
          return res.status(404).send("No user found");
      }

      latest_user.dateofbirth = dateOfBirth;
      latest_user.securitykey = backupKey;

      await latest_user.save();
   
      res.status(200).send("User Registration 2 updated successfully");
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server issues");
  }
}
module.exports={postregister2}