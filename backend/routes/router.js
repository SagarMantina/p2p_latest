const express = require("express");
const cookieparser = require("cookie-parser");
const path = require("path");
const router = express.Router();
const app = express();
app.set("view  engine", "ejs");
router.use(cookieparser());
router.use(express.static(path.join(__dirname, "public")));
const { getSellerdata ,  sellGame, getsellerMyGames,getsellerTransactions} = require("../controllers/sellerController");
const {createCommunity,
  joinCommunity,
  getCommunity,
  getcommunityChat,
  sendMessage,
  getUserCommunities,} = require("../controllers/communityController");
const {
  getuserdata,
  signout,
  getcategories,
  searchgames,

} = require("../controllers/home");
const {  updateuserdetails,getuserTransactions,getuserMyGames, checkUser } = require("../controllers/userController");
const { postlogin } = require("../controllers/loginController");
const { postregister } = require("../controllers/registerController");
const { postregister2 } = require("../controllers/register2Controller");
const {
  getallUsers,
} = require("../controllers/adminController");
const {
  addtocart,
  getcartgames,
  removetocart,
} = require("../controllers/cartController");
const {
  getComparisons,
  postreview,
  getclickgame,
} = require("../controllers/gamepageController");

const { paygame, cartpaygame} = require("../controllers/paymentController");
const { getTopSellingGames , getTopRevenueGames} = require("../controllers/paymentController");



const { getadmindata } = require("../controllers/adminController");
const { homeGames } = require("../controllers/homeController");
const {getGames } = require("../controllers/adminController");

const {  getaTransactions} = require("../controllers/home");





//to use to update the details
router.post("/updateuser", updateuserdetails);






//handle the default route for all
// router.get("/", getdashboard);


//admin routes
//this route for getting admin all the game count, user count smth like that
router.get("/admin_data", getadmindata);



router.get("/api/top-selling",getTopSellingGames );
router.get("/api/top-revenue",getTopRevenueGames)

//admin, seller and user routes
router.post("/login", postlogin);
router.post("/register", postregister);
router.post("/register2", postregister2);
router.get("/signout", signout);
// end of user routes

router.get("/user/communities", getUserCommunities);
router.post("/createcommunity", createCommunity);
router.post("/joincommunity", joinCommunity);
router.get("/community", getCommunity);

router.get("/community/:community", getcommunityChat);
router.post("/community/:community", sendMessage);










//get all the users and all the games data
router.get("/allusers", getallUsers);
router.get("/allgames",getGames);


//seller routes
router.get("/sellerdata", getSellerdata);
router.post("/sellgame", sellGame);
router.get("/seller/mygames", getsellerMyGames);
router.get("/seller/transactions", getsellerTransactions);
//end of seller routes


router.get("/user/transactions", getuserTransactions);
router.get("/user/mygames", getuserMyGames);

router.get("/admin/transactions", getaTransactions);




//route to get userdata of anyone at any instance of time if cookies fail or smth like that
router.get("/userdata", getuserdata);





//to get the home games
router.get("/api/games", homeGames);

//To visit to The game(or) product page when on clicked and also get comparisons for the game in the game page
router.get("/clickgame/:gamename", getclickgame);
router.get("/comparisons/:gamename", getComparisons);


//To Filter out the games for search and categories
router.get("/searchgames", searchgames);
router.get("/categories", getcategories);



//buy game anywhere route
router.post("/paygame", paygame);
//buyt game only at cart
// router.post("/cartpaygame", cartpaygame);

router.get("/cartpaygame", cartpaygame);


router.get("/check/:username",checkUser);


//post for an review of the game page usually we do it using params
router.post("/postreview/:gamename", postreview);


//cart routes
router.post("/addtocart", addtocart);
router.get("/getcartgames", getcartgames);
router.post("/removetocart", removetocart);
//end of cart routes

module.exports = router;

// router.get("/user_chat",getuserchatpage);
// router.get("/chat",getchat);
// router.post("/send",postsend);
// router.get("/messages/:recipientId",getmessages);
// router.post("/msg",postmessage);
// router.get("/userChat",getuserchat);
