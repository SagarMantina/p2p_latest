const user = require("../models/accountschema");
const game_details= require("../models/gameschema");



async function  homeGames (req, res)  {
    try {   
       var highlight_games = [];
       var featured_games = [];
       var discounts_games = [];
       var popular_games = [];
       var new_games = [];


       new_games = await game_details.find().sort({ createdAt: -1 }).limit(8);
       highlight_games = await game_details.find({ highlight: true });
       featured_games = await game_details.find({ featured: true }).limit(8);
       discounts_games = await game_details.find({ discounts: true }).limit(8);
       popular_games = await game_details.find({ popular: true }).limit(8);



       res.status(200).json({ "new_games" : new_games, "highlight_games" : highlight_games, "featured_games" : featured_games, "discounts_games" : discounts_games, "popular_games" : popular_games});

    }

    catch (error) {
    }
}


module.exports  = { homeGames };