const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on " + process.env.PORT || 3000);
});

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/reviews/new", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newReview = await pool.query(
      "INSERT INTO reviews (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    if (newReview.rows.length !== 1) {
      return res.status(500).json("Unable to create new Review");
    }
    return res.status(200).json("Review Added");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

app.get("/reviews/all", async (req, res) => {
  try {
    const allReviews = await pool.query(
      "SELECT * FROM reviews ORDER BY created_at DESC"
    );
    res.status(200).json(allReviews.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

app.put("/reviews/:id", async (req, res) => {
  try {
    const { title, id, content } = req.body;

    const updateReviews = await pool.query(
      "UPDATE reviews SET title = $1 , content = $2 WHERE review_id = $3",
      [title, content, id]
    );
    res.status(200).json("Review Edited");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM reviews WHERE review_id = $1",
      [id]
    );
    console.log(response);
    if (!response.rowCount) {
      return res.status(500).json("Could not Delete the data");
    }
    return res.status(200).json("Review Deleted Successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});
