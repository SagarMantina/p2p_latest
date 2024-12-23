const mongoose = require("mongoose");
const user = require("./accountschema");


const transaction_schema = new mongoose.Schema({
    buyer: { type: String, required: true},
    seller: { type: String, required: true, ref: user, default: "P2P" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    game_name : { type: String, required: true },
  });
  
  const transaction = mongoose.model("transaction", transaction_schema);
  module.exports=transaction;



//   const mongoose = require("mongoose");
// const user = require("../models/accountschema");


// const transcation_schema = new mongoose.Schema({
//     buyer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: user },
//     seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: user, default: "P2P" },
//     amount: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
//   });
  
//   const transcation = mongoose.model("transcation", transcation_schema);
//   module.exports=transcation;