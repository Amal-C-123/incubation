const jwt = require("jsonwebtoken");


const adminVerify = (req, res, next) => {
  let authHeader = req.headers.token;
  if (authHeader) {
    // authHeader = authHeader.replaceAll('"', "")
    const token = authHeader.split(" ")[1];
    console.log(token)
    jwt.verify(token, process.env.JWT_ADMIN, (err, user) => {
      if (err) {
        console.log(err, "invalid token");
        res.status(403).json({ authenticationError: true });
      } else {
        next();
      }
    });
  }else{
    return res.status(401).json('not authenticated')
  }
};

const userVerify = (req, res, next) => {
    let authHeader = req.headers.token;
    if (authHeader) {
      // authHeader = authHeader.replaceAll('"', "")
      const token = authHeader.split(" ")[1];
      console.log(token)
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err, "invalid token");
          res.status(403).json({ authenticationError: true });
        } else {
          next();
        }
      });
    }else{
      return res.status(401).json('not authenticated')
    }
  };

module.exports = {
  adminVerify,
  userVerify
};
