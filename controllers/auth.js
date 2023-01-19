const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: "User already registered"
        });
        const {firstName, lastName, email, password } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString()  //random username .toString() is used to convert it into string
        });
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }
            if(data){
                return res.status(201).json({
                    message: "User created",
                    User: data
                });
            }
        });
    });
}

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({error});
        if(user){
            //authenticate is available in userSchema.methods, it will authenticate the password
            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
                const {_id, firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {_id, firstName, lastName, email, role, fullName}
                });
            }else{
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }
        }else{
            return res.status(400).json({message: "Something went wrong, please check your email."});
        }
    });
}

//middleware to check if user is logged in or not
exports.requireSignin = (req, res, next) => {
    
    //when we send the token in the header we send it as "Bearer token
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //decode the token and provide user information eg. id and role 
    const user = jwt.verify(token, process.env.JWT_SECRET,);

    //attach user with the request
    req.user = user;
    next();
}