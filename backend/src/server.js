import express from "express";
import fs from "fs";
import admin from "firebase-admin";
import { db, connectDB } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credential.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Middleware to verify Firebase authentication tokens
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch {
      return res.sendStatus(400); // Bad Request if token is invalid
    }
  }

  req.user = req.user || {};
  next();
});

// Get article details and determine if the user can upvote
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404); // Article not found
  }
});

// Middleware to check if the user is authenticated
app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401); // Unauthorized if no user is found
  }
});

// Upvote an article
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
      await db.collection("article").updateOne(
        { name },
        {
          $inc: { upvote: 1 },
          $push: { upvoteIds: uid },
        }
      );
    }

    const updatedArticle = await db.collection("article").findOne({ name });
    res.json(updatedArticle);
  } else {
    res.status(404).send("Article not found!"); // Article not found
  }
});

// app.post('/api/article/:name', async (req. res) => {
//   const { name } = await
// })

// Add a comment to an article
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    await db.collection("article").updateOne(
      { name },
      {
        $push: { comments: { postedBy: email, text } },
      }
    );
    const updatedArticle = await db.collection("article").findOne({ name });
    res.json(updatedArticle);
  } else {
    res.status(404).send("Article not found!"); // Article not found
  }
});

const PORT = process.env.PORT || 8000;

// Connect to DB and start server
connectDB(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log("Server is listening on PORT " + PORT);
  });
});
