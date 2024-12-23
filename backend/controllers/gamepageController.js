const express = require("express");
const path = require("path");
const user = require("../models/accountschema");
const game_details = require("../models/gameschema");

async function postreview(req, res) {
  const { postreview, reviewrating } = req.body;
  const { gamename } = req.params;

  // console.log(postreview, reviewrating, gamename);
  try {
    const game = await game_details.findOne({ game_name: gamename }); 


    //check if the game exists
    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    // Check if the user is logged in using cookies
    const username = req.cookies.username;
    if (!username) {
      return res
        .status(401)
        .json({ message: "Please login to post a review!" });
    }

    // Check if the user has already posted a review
    const existingReview = game.reviews.find(
      (review) => review.name === username
    );
    if (existingReview) {
      return res
        .status(401)
        .json({ message: "You have already reviewed and rated the game!" });
    }

    // Calculate the new rating
    const currentrating = game.rating;
    const reviewCount = game.reviews.length;
    const newrating =
      (currentrating * reviewCount + parseInt(reviewrating)) /
      (reviewCount + 1);

    // Update the game with the new rating and add the new review
    game.rating = newrating;
    game.reviews.push({
      name: username,
      review: postreview.trim(),
      rating: reviewrating,
    });

    // console.log(game);

    // Save the updated game data
    const updatedGameData = await game.save();

    // Return the updated game data
    res.json({ updatedGameData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}



async function getclickgame(req, res) {
  const { gamename } = req.params;

  try {
    const product = await game_details.findOne({ game_name: gamename });
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

async function getComparisons(req, res) {
  const { gamename } = req.params;
  // console.log(gamename);
  try {
    const product = await game_details.findOne({ game_name: gamename });
    if (product) {
      let comparisons_data = [];
   
      let total_games = 5;

      let product_upper_bound = product.price * 1.4;
      let product_lower_bound = product.price * 0.6;
      let games_price = await game_details.find({
        price: { $gte: product_lower_bound, $lte: product_upper_bound },
      });

      if (games_price.length < total_games) {
        let leftout_games = total_games - games_price.length;
        let leftout_games_price = await game_details
          .find({ category: product.category })
          .limit(leftout_games);
        comparisons_data.push(...leftout_games_price);
        comparisons_data.push(...games_price);
      } else {
        for (let i = 0; i < 5; i++) {
          comparisons_data.push(games_price[i]);
        }
      }

      // comparisons_data.forEach((product) => {
      //   console.log(product.game_name);
      // });
      res.json(comparisons_data);
    } else {
      res.status(404).json({ errorMessage: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error", error });
  }
}

module.exports = { postreview, getComparisons, getclickgame };
