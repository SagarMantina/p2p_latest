const mongoose=require( 'mongoose');
const fs = require('fs');
const login_schema = new mongoose.Schema({
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      required:true,
    },
    dateofbirth: {
      type: Date,
    },
  
    securitykey: {
      type: String,
    },
    cart: {
      type: [String],
    },

    purchase:{
      type: [String ],

    },
    createdAt : {
      type: Date,
      default: Date.now,
    },
   
  }, {
    timestamps: true
  });
  const user = mongoose.model("user", login_schema);
  module.exports=user;