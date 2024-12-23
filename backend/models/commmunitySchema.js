const mongoose=require( 'mongoose');
const fs = require('fs');
const user  = require("../models/accountschema");

const community_schema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  description: { type: String, required: true }, // New field
  user: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: user }],
  messages: [
     {
        sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: user },
        message: { type: String, required: true },
     },
  ],
}, );

  const community = mongoose.model("community", community_schema);
  module.exports=community;