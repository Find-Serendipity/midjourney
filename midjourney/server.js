require("dotenv").config();
const PORT = process.env.PORT || 3000;

// install and use Express
const express = require("express");
const server = express();

// generate and server.use an Express Router for the API
const apiRouter = require("./api");
server.use("/api", apiRouter);

// install and use Morgan
const morgan = require("morgan");
server.use(morgan("dev"));

// log morgan on body
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

// install and use body-parser
const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//Parse the headers to see if there is a token on the user ID
// requires getUserById
// requires jsonwebtoken

const { getUserById } = require("./db/users");
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  //if no authorization provided, do next
  if (!auth) {
    next();
  }
  // else if auth header contains Bearer
  // create a token for the user
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    //if token provided, create a deconstructed id using the token and jwt secret
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // if the user id is provided by jwt
    if (id) {
      // on validation from a login request, getUserById with the verified jwt id
      // set the logged-in user to be the user
      // then do next
      const user = await getUserById(id);
      req.user = { id: user.id, username: user.username };
      next();
    }
    // else do next
    else {
      next();
    }
  } // else do next
  else {
    next();
  }
});

// listen to the port
server.listen(PORT, () => {
  console.log(`Your server's number is ${PORT}, thanks for dining with us.`);
});
