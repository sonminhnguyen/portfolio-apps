const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(400).json({
      'message': 'access denied'
    });
  }
}

module.exports = authenticate