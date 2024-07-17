const express = require("express");

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;

app.use(express.json());

//http://localhost:8081/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and runing :-)",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root doesn't exists",
  });
});

app.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});
