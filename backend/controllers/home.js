const express=require('express');
const app=express()
const path=require('path')
const bcrypt = require("bcryptjs");
const user=require('../models/accountschema');
const game_details=require('../models/gameschema');
const authController = require('./loginController');
const { trace } = require('console');
const transaction = require('../models/transactionSchema');
let arr = authController.arr;


async function getuserdata(req,res){
    const username = req.cookies.username;

    try {
      const db_user = await user.findOne({ username });
      res.json(db_user);
    } catch (error) {
      res.status(401).json({ errorMessage: "Internal server error" });
    }
}


async function signout(req,res){
    let username = req.cookies.username;
    res.clearCookie("username");
    res.status(200).json({ successMsg: "User Logged Out" });

}


async function getcategories(req,res)
{
    try {
        var search_term = req.query.search.toUpperCase();
    
        const searchTermRegex = new RegExp(search_term, "i");
        const games_filtered = await game_details
          .find({ category: { $regex: searchTermRegex } })
          .limit(5);
        res.json(games_filtered);
      } catch (error) {
        console.log("Server is issue" + error);
      }
}


async function searchgames(req,res)
{
    try {
        var search_term = req.query.term.toUpperCase();
        console.log(search_term);
       

         const searchTermRegex = new RegExp('^' + search_term, "i"); 
         const games_filtered = await game_details
      .find({
        $or: [{ game_name: searchTermRegex }, { category: searchTermRegex }],
      })
      .limit(5);
         console.log(games_filtered);
        res.json(games_filtered);
      } catch (error) {
        console.error("Error searching for games:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

//this is post request for getting game data
async function getGame(req,res)
{
    const game_name = req.body.game_name;

    try {
      const gameName = new RegExp(game_name, "i");
      const product = await game_details.findOne({ game_name: gameName });
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ errorMessage: "Product not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
}

async function getaTransactions(req,res) { 
  try {
    const username = req.cookies.username;
    const db_user = await user.findOne({ buyer : username });
    if(!db_user) {
      return res.status(404).json({ errorMessage: "Login to see Transactions" });
    }
    const transactions = await transaction.find({});

    console.log(transactions);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}


async function getuTransactions(req,res) {

  try {
    const username = req.cookies.username;
    const db_user = await user.findOne({ buyer: username });

    if(!db_user) {
      return res.status(404).json({ errorMessage: "Login to see Transactions" });
    }

    const transactions = await transaction.find({ username: db_user.username });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

async function getsTransactions(req,res) {

  try {
    const username = req.cookies.username;
    const db_user = await user.findOne({ seller : username });

    if(!db_user) {
      return res.status(404).json({ errorMessage: "Login to see Transactions" });
    }

    const transactions = await transaction.find({ username: db_user.username });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}
module.exports={getuserdata,signout,getcategories,searchgames,getGame,getaTransactions,getsTransactions,getuTransactions}