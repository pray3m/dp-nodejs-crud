const express = require("express");
const { books, sequelize } = require("./model/index");
const { QueryTypes } = require("sequelize");

const app = express();

// db connection
require("./model/index");

// set the view engine to ejs
app.set("view engine", "ejs");

// serve static files from the `public` folder
app.use(express.static("public/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ping route
app.get("/ping", (req, res) => {
  res.send("pong ");
});

// Get all books
app.get("/", async (req, res) => {
  const allBooks = await books.findAll();
  res.render("allBooks", { books: allBooks });
});

// Add new book
app.get("/addBook", (req, res) => {
  res.render("addBook", {});
});

app.post("/add-book", async (req, res) => {
  const { title, price, description, author, image } = req.body;

  const newBook = await books.create({
    title,
    price,
    description,
    author,
    image,
  });

  res.redirect("/");
});

// // Single book
// app.get("/book/:id", async (req, res) => {
//   const { id } = req.params;

//   const book = await books.findByPk(id);

//   res.render("book", { book });
// });

// Edit book
app.get("/editBook/:id", async (req, res) => {
  const { id } = req.params;

  const book = await books.findByPk(id);

  res.render("editBook", { book });
});

app.post("/editBook/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, description, author, image } = req.body;

  const book = await books.findByPk(id);

  book.title = title;
  book.price = price;
  book.description = description;
  book.author = author;
  book.image = image;

  await book.save();

  res.redirect("/");
});


//  Server listening
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
