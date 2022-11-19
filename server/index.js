const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./Schema/schema");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

app.use(express.static("client"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.listen(port, console.log(`Server is running on port: ${port}`));
