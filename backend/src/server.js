import express from "express";
import { db, connectDB } from "./db.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    res.json(article);
  }
  if (!article) {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("article").updateOne(
    { name },
    {
      $inc: { upvote: 1 },
    }
  );

  const article = await db.collection("article").findOne({ name });

  if (article) {
    res.send(`article ${name} has now ${article.upvote} upvote!!!`);
  } else {
    res.send("article not found !!!");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection("article").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );
  const info = await db.collection("article").findOne({ name });

  if (info) {
    res.json(info);
  } else {
    res.send("article not found !!!");
  }
});

connectDB(() => {
  console.log("200");
  app.listen(8000, () => {
    console.log("server is listening on port 8000");
  });
});
