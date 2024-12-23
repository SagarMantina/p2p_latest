
const mongoose = require('mongoose');
const user = require('../models/accountschema');
const gameSchema = new mongoose.Schema({
  game_name: {
    type: String,
    
  },
  poster: {
    type: String,
  
  },
  main_image: {
    type: String,
   
  },
  sub_images: [
    {
      type: String,
    },
  ],
  gifs: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  releaseDate: {
   type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  about: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  discounts: {
    type: Boolean,
    default: false,
  },
  popular: {
    type: Boolean,
    default: false,
  },

  highlightImage :{
    type: String,
    default : null,
  },
  rating: {
    type: Number,
    default:0,
  },
  reviews: [
    {
      name: String,
      rating: Number,
      review: String,
    },
  ],
  seller: {
    type: String,
    default: "P2P",
  },
  quantity_sold: {
    type: Number,
    default: 1,
  },
  broughtBy:  [{ type: String}],
}, { timestamps: true });



const game_details = mongoose.model("game_details", gameSchema);
module.exports=game_details;