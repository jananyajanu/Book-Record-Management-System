const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and runing :-)",
    data: "hey",
  });
});

/**
 * Route: /users
 * Method : Get
 * Description:Get all ursers
 * Access:Public
 * Parameters:None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method : Get
 * Description:Get urser by id
 * Access:Public
 * Parameters:id
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params; //parameter:params
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user Does't exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user Found",
    data: user,
  });
});

/**
 * Route: /users/
 * Method : POST
 * Description:Creating urser
 * Access:Public
 * Parameters:None
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "user added Suceesfully",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method : PUT
 * Descriptiotion:Updating urser by id
 * Access:Public
 * Parameters:ID
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user Does't exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
});

/**
 * Route: /users/:id
 * Method : DELETE
 * Descriptiotion:Deleting urser by id
 * Access:Public
 * Parameters:ID
 */
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user Does't exist !!",
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root doesn't exists",
  });
});

app.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});
