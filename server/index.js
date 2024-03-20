import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Book Store");
});

//Save a new book
app.post("/books", async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const publishYear = req.body.publishYear;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: `Please send all required fields: title, author, publishYear`,
      });
    }
    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Upate a book
app.put("/books/:id", async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const publishYear = req.body.publishYear;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: `Please send all required fields: title, author, publishYear`,
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: `Book was not found` });
    }

    return res.status(200).send({ mesage: `Book updated successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: message });
  }
});

//Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: `Book was not found` });
    }

    return res.status(200).send({ mesage: `Book deleted successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.mesage });
  }
});

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log(`App connected to the database.`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
