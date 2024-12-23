const express = require('express')
const path = require('path');
const app = express();
const user = require('../models/accountschema');
const transcation = require('../models/transactionSchema');
const game_details = require('../models/gameschema');
const bcrypt = require("bcryptjs");


async function cartpaygame(req, res) {
    try {
        const username = req.cookies.username;
        console.log(username);

        if (!username) {
            return res.status(404).json({ errorMessage: "Please Login To Purchase" });
        }

        const user_data = await user.findOne({ username: username });

        if (!user_data) {
            return res.status(404).json({ errorMessage: "User not found" });
        }

        console.log("User Cart:", user_data.cart);

        // Check if the cart is empty
        if (!user_data.cart || user_data.cart.length === 0) {
            return res.status(400).json({ errorMessage: "Cart is empty" });
        }

        for (const game of user_data.cart) {
            console.log("Current Game:", game);

            if (!game) {
                return res.status(400).json({ errorMessage: "Invalid game entry in cart" });
            }

            const gamename = await game_details.findOne({ game_name: game });
            console.log(game);

            // If game not found in the database
            if (!gamename) {
                return res.status(404).json({ errorMessage: `Game ${game} not found` });
            }

            // Check if the user already purchased the game
            if (user_data.purchase.includes(gamename.game_name)) {
                return res.status(200).json({
                    message: `User has already purchased the game ${gamename.game_name}`,
                });
            }

            // Add the game to the user's purchase history
            user_data.purchase.push(gamename.game_name);

            // Increment the quantity sold for the game
            gamename.quantity_sold += 1;
            gamename.broughtBy.push(username);
          
            await gamename.save();

            // Create a new transaction
            const new_transaction = new transcation({
                buyer: username,
                seller: gamename.seller,
                amount: gamename.price,
                date: Date.now(),
                game_name: gamename.game_name,
            });

            await new_transaction.save();
        }

        // Clear the cart after processing all games
        user_data.cart = [];
        await user_data.save();




        // After all the games are processed
        return res.status(200).json({
            message: "Successfully purchased the game(s)",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}

async function paygame(req, res) {
    try {
        const data = req.body;
        let gamename = data.game_name;
        let username = req.cookies.username;

        gamename = await game_details.findOne({ game_name: gamename });
        username = await user.findOne({ username: username });

        if (username) {
            if (username.purchase.includes(gamename.game_name)) {
                res.status(200).json({
                    message: "User has already purchased the game",
                });
            } else {
                // Add game to user's purchase history
                username.purchase.push(gamename.game_name);
                await username.save();

                // Increment the quantity sold for the game
                gamename.quantity_sold += 1;
                await gamename.save();

                // Create a new transaction
                const new_transcation = new transcation({
                    buyer: username.username,
                    seller: gamename.seller,
                    amount: gamename.price,
                    date: Date.now(),
                    game_name: gamename.game_name,
                });

                await new_transcation.save();

                res.status(200).json({
                    message: "Successfully purchased the game",
                });
            }
        } else {
            res.status(404).json({ errorMessage: "Please Login To Purchase" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}


async function getTopSellingGames(req, res) {
    try {
        const topSellingGames = await game_details.find().sort({ quantity_sold: -1 }).limit(10);

        res.status(200).json({
            message: "Top 10 Games by Quantity Sold",
            data: topSellingGames
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}

async function getTopRevenueGames(req, res) {
    try {
        const topRevenueGames = await game_details.aggregate([
            {
                $project: {
                    game_name: 1,
                    price: 1,
                    quantity_sold: 1,
                    totalRevenue: { $multiply: ["$price", "$quantity_sold"] }
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 }
        ]);

        res.status(200).json({
            message: "Top 10 Games by Highest Revenue",
            data: topRevenueGames
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}



module.exports = {  paygame ,cartpaygame,getTopSellingGames,getTopRevenueGames}