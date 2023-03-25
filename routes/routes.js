const router = require("express").Router();

router.get("/", loggedIn, (req, res) => {
  res.render("index", {
    userName: req.session.userName,
    error_msg: req.flash("error"),
    success_msg: req.flash("success"),
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn == true) {
    res.redirect("/");
  } else {
    res.render("login", {
      error_msg: req.flash("error"),
      success_msg: req.flash("success"),
    });
  }
});

router.get("/sign", (req, res) => {
  if (req.session.loggedIn === true) {
    res.redirect("/");
  } else {
    res.render("sign", {
      error_msg: req.flash("error"),
      success_msg: req.flash("success"),
    });
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn === true) {
    req.session.loggedIn = false;
    req.session;
  }
  res.redirect("/login");
});

function loggedIn(req, res, next) {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
