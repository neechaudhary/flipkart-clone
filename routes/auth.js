const express= require("express");
const router= express.Router();
const { signup ,signin, requireSignin } = require("../controllers/auth");


router.post("/signup", signup);

router.post("/signin", signin);

//if user is logged in how can we navigate him to the protected route eg. profile
//we will use a middleware to check if user is logged in or not
// router.post("/profile", requireSignin, (req, res) => {
//     res.status(200).json({user: "profile"});
// });


module.exports= router;