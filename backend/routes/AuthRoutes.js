const express = require("express");
const router = express.Router();

// user routes  to create account  and login  

const { createUser, loginUser } = require("../controllers/StudentController");


// Importing auth as a default import
const auth = require("../middleware/auth");

router.post("/user/create", createUser); // Add leading slash '/'
router.post("/user/login", loginUser); // Add leading slash '/'


module.exports.AuthRoutes = router;
