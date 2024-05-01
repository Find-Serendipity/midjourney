const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/", (req, res) => {
  res.send("/api");
});

const imagesRouter = require("./images");
apiRouter.use("/images", imagesRouter);

const tagsRouter = require("./tags");
apiRouter.use("/tags", tagsRouter);

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = { apiRouter, imagesRouter, tagsRouter, usersRouter };
