const express = require('express')
const user = require('../models/accountschema');
const path = require('path')
const game_details = require("../models/gameschema");

async function addtocart(req, res) {
  try {
      if (req.cookies.username) {
          const curr_user = req.cookies.username;
          const cart_games = req.body.cart_games;
          // console.log(cart_games);
  
          const exists_user = await user.findOne({ username: curr_user });

          // Ensure we are adding just the game name (string) to the cart
          if (typeof cart_games.game_name === 'string') {
              exists_user.cart.push(cart_games.game_name); // Push only the game_name string
          } else {
              // Handle case where cart_games.game_name is not a string
              return res.status(400).json({ errorMessage: "Invalid game name format" });
          }
          
          await exists_user.save();
          res.status(201).json({ successMsg: "Successfully Added To Cart. Visit Cart To BUY" });
      } else {
          res.status(404).json({ errorMessage: "Login to get access to the cart" });
      }
  } catch (error) {
      console.log("Internal Server Error", error);
      res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}



async function getcartgames(req,res){
    try {
         
        if (req.cookies.username) {
          const curr_user = req.cookies.username;
          const user_data = await user.findOne({ username: curr_user });
    
          const cart_game = [];
    
          for (const ip of user_data.cart) {
            const game = await game_details.findOne({ game_name: ip });
    
            if (game) {
              cart_game.push(game);
            }
          }

          res.json(cart_game);
        }

        else{
            res.status(401).json({
                errorMessage: "Login First To get Acess of the cart ",
              });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ errorMessage: "Error processing data" });
      }
}

async function removetocart(req,res)
{
    try {
        if (req.cookies.username) {
          const curr_user = req.cookies.username;
          const cart_games = req.body.cart_games;
           
           const game= await game_details.findOne({ game_name: cart_games });
          if(!game){
            return res.status(401).json({ errorMessage: "Game Not Found" });
          }
          const exists_user = await user.findOneAndUpdate(
            { username: curr_user },
            { $pull: { cart: cart_games } }
          );
    
          res.status(201).json({ successMsg: "Removed From Cart" });
        } else {
          res.status(401).json({
            errorMessage: "Login First To get Acess of the cart ",
          });
        }
      } catch (error) {
        console.error("Internal Server Error" + error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
      }
}


module.exports={addtocart,getcartgames,removetocart};