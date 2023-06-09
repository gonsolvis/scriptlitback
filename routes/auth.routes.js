const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  
  if (email === "" || password === "" || name === "" || lastname === "" || username === "" || nativelanguage === "" ) {
    res.status(400).json({ message: "Please complete all the fields" });
    return;
  }

  
/*   */

  
/*   const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  } */

  User.findOne({ email })
    .then((foundUser) => {
     
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

     

      /* const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt); */

      return User.create({ email/* , password: hashedPassword */, name, lastname, username, nativelanguage });
    })
    .then((createdUser) => {
     
      const { email, name, _id,  lastname, username, nativelanguage} = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id,  lastname, username, nativelanguage };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        
        const { _id, email, name } = foundUser;

        
        const payload = { _id, email, name, lastname, username, nativelanguage };
    /*    
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        }); */

       
       /*  res.status(200).json({ authToken: authToken }); */
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});


/* router.get("/verify", isAuthenticated, (req, res, next) => {
 
  res.status(200).json(req.payload);
}); */

 // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data

module.exports = router;
