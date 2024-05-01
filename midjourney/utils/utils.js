const requireAdmin = (req, res, next) => {
  if (req.body.admin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = { requireAdmin };
