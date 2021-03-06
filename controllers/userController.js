const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
  const isMobile = req.device.type === "phone" || req.device.type === "tablet";

  res.render("login", { title: "Login", isMobile });
};

exports.registerForm = (req, res) => {
  const isMobile = req.device.type === "phone" || req.device.type === "tablet";

  res.render("register", { title: "Register", isMobile });
};

exports.validateRegister = async (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name!").notEmpty();
  req.checkBody("email", "That Email is not valid").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password cannot be empty!").notEmpty();
  req
    .checkBody("password-confirm", "Confirm Password cannot be empty!")
    .notEmpty();
  req
    .checkBody("password-confirm", "Your passwords do not match!")
    .equals(req.body.password);

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    req.flash("error", `${req.body.email} is already registered`);
    return res.redirect("back");
  }
  const errors = req.validationErrors();
  if (errors && user) {
    req.flash("error", errors.map(err => err.msg));
    res.render("register", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    admin: false
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.account = (req, res) => {
  const isMobile = req.device.type === "phone" || req.device.type === "tablet";

  res.render("account", { title: "Login", isMobile });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: "query" }
  );
  req.flash("success", "Your account has been updated!");
  res.redirect("back");
};
