const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { registerValidation, loginValidation } = require("../models/validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  
  const checker = await User.findOne({ email });
  if (checker) return req.flash("error", "Email is already Exist"), res.redirect("/login");
  
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  
  const data = new User({
    name,
    email,
    password: hashPassword,
  });
  const result = await data.save();
  res.redirect("/login");
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return req.flash("error", "User not found"), res.redirect("/login");

  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck)
    return req.flash("error", "password was wrong"), res.redirect("/login");

  req.session.loggedIn = true;
  req.session.userName = user.name;
  req.flash("success", "Successfully Login"), res.redirect("/");
});

module.exports = router;
