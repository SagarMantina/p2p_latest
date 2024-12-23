const mongoose = require("mongoose");
const user = require("../models/accountschema");
const game_details = require("../models/gameschema");
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");

const home = require("./home");
const app = express();
const transaction = require("../models/transactionSchema");


async function getadmindata(req, res) {
  let total_games = await game_details.countDocuments();
  let total_users = await user.countDocuments();

  // total purhcases:-
  let total_purchases = await transaction.countDocuments();

  const now = new Date();

// Get current time for today
const todayStart = new Date(now);
todayStart.setHours(0, 0, 0, 0);
const currentMoment = new Date(now);

// Get the equivalent time range for yesterday
const yesterdayStart = new Date(todayStart);
yesterdayStart.setDate(todayStart.getDate() - 1);
const yesterdayEnd = new Date(currentMoment);
yesterdayEnd.setDate(currentMoment.getDate() - 1);

// Count today's sales
const today_sales = await transaction.countDocuments({
  date: { $gte: todayStart, $lt: currentMoment },
});

// Count yesterday's sales
const yesterday_sales = await transaction.countDocuments({
  date: { $gte: yesterdayStart, $lt: yesterdayEnd },
});

// Calculate sales increase
const sales_increase = today_sales - yesterday_sales;

// console.log(`Sales Increase: ${sales_increase} {today_sales: ${today_sales}, yesterday_sales: ${yesterday_sales}}`);




  let data = {
    total_games: total_games,
    total_users: total_users,
    total_purchases: total_purchases,
    today_sales: today_sales,
    sales_increase: sales_increase,
  };
  // console.log(data);
  res.json(data);
}




//To Update Username 

async function getTransactions(req, res) {
  try {
    const transactions = await transaction.find({});
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error !" });
  }
}

async function getGames(req, res) {
  try {
    const games = await game_details.find({});
    res.json(games);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error !" });
  }
}



async function getallUsers(req, res) {
  try {
    // Get total users
    const total_users = await user.countDocuments();

    // Total visits (if visits are counted in another way, adjust this logic accordingly)
    const total_visits = total_users; // Assuming all users are visits

    // Get the count of users created in the last 7 days
    const weekly_visits = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const startOfDay = new Date();
        startOfDay.setDate(startOfDay.getDate() - i);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await user.countDocuments({
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        });

        return count;
      })
    );

    // Prepare final data
    const final_data = {
      total_users,
      total_visits,
      weekly_visits,
    };

    // Send response
    res.json(final_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}



module.exports = {

  getadmindata,
  getTransactions,
  getGames,
  getallUsers,
};
