
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();
const gameDetails = require("./models/gameschema");
const User = require("./models/accountschema");
const Message = require("./models/messageschema");
const { connecttomongodb } = require("./models/connect");
const router = require("./routes/router");

const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5000", // Replace with your frontend's origin
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

// Connect to MongoDB and initialize game data
// connecttomongodb("mongodb://localhost:27017/p2p")
//   .then(async () => {
//     console.log("DB CONNECTED");

//     const count = await gameDetails.countDocuments();
//     if (count === 0) {
//       const filePath = path.join(__dirname, "models", "updated_games.json");
//       const data = await readDataFromJSONFile(filePath);
//       await Promise.all(data.map(async (gameData) => {
//         const game = new gameDetails(gameData);
//         await game.save();
//       }));
//       console.log("Data saved successfully to games collection!");
//     } else {
//       console.log(`Data already exists in game_details collection (${count} documents). No new data added.`);
//     }
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//   });
   
connecttomongodb(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB CONNECTED");

    const count = await gameDetails.countDocuments();
    if (count === 0) {
      const filePath = path.join(__dirname, "models", "updated_games.json");
      const data = await readDataFromJSONFile(filePath);
      await Promise.all(data.map(async (gameData) => {
        const game = new gameDetails(gameData);
        await game.save();
      }));
      console.log("Data saved successfully to games collection!");
    } else {
      console.log(`Data already exists in game_details collection (${count} documents). No new data added.`);
    }
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
// Read JSON file utility
function readDataFromJSONFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

// Express routes for contacts and messages
app.get("/contacts", async (req, res) => {
  try {
    const currentUser = req.cookies.username;
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const contacts = new Set();
    const senderMessages = await Message.find({ sender: currentUser });
    senderMessages.forEach((msg) => contacts.add(msg.recipient));

    const recipientMessages = await Message.find({ recipient: currentUser });
    recipientMessages.forEach((msg) => contacts.add(msg.sender));

    res.status(200).json(Array.from(contacts));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

app.get("/messages/:recipient", async (req, res) => {
  try {
    const currentUser = req.cookies.username;
    const recipient = req.params.recipient;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, recipient },
        { sender: recipient, recipient: currentUser },
      ],
    }).sort("timestamp");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Socket.IO setup for real-time communication
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000", // Replace with your frontend's origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// duplicate message issue 
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinRoom", (username) => {
//     if (username) {
//       socket.join(username);
//       console.log(`${username} joined the room`);
//     }
//   });

//   socket.on("sendMessage", async ({ sender, recipient, content }) => {
//     try {
//       const message = new Message({ sender, recipient, content });
//       await message.save();

//       io.to(sender).emit("receiveMessage", message);
//       io.to(recipient).emit("receiveMessage", message);
//     } catch (error) {
//       console.error("Error handling message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", (username) => {
    if (username) {
      socket.join(username);
      console.log(`${username} joined the room`);
    }
  });

  socket.on("sendMessage", async ({ sender, recipient, content }) => {
    try {
      const message = new Message({ sender, recipient, content });
      await message.save();

      // Send the message only to the recipient
      io.to(recipient).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
