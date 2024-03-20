import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
const MONGODB_USER = process.env.MONGO_USERNAME;
const MONGODB_PWD = process.env.MONGO_PWD;

export const MONGODBURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PWD}@book-store-cluster.m0twi6m.mongodb.net/book_store?retryWrites=true&w=majority&appName=Book-Store-Cluster`;
