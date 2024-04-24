const bcrypt = require("bcrypt");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const generateId = require("../helpers/tokenId");
const generateToken = require("../helpers/token");
const emails = require("../helpers/emails");

const signInPage = async (req, res) => {
  res.render("auth/signin", {
    page: "Sign in",
    csrfToken: req.csrfToken(),
  });
};

const signIn = async (req, res) => {
  await check("email")
    .notEmpty()
    .withMessage("The email is not valid")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("The password cannot be empty")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("auth/signin", {
      page: "Sign in",
      errors: validation.array(),
      csrfToken: req.csrfToken(),
    });
  }

  const { email, password } = req.body;

  const verifyUserExists = await User.findOne({ where: { email } });

  if (!verifyUserExists) {
    return res.render("auth/signin", {
      page: "Sign in",
      errors: [
        {
          msg: "No registered user is found, please check the email and password entered",
        },
      ],
      csrfToken: req.csrfToken(),
    });
  }

  if (!verifyUserExists.confirm) {
    return res.render("auth/signin", {
      page: "Sign in",
      errors: [
        {
          msg: "Your account has not been confirmed",
        },
      ],
      csrfToken: req.csrfToken(),
    });
  }

  if (!verifyUserExists.checkPassword(password)) {
    return res.render("auth/signin", {
      page: "Sign in",
      errors: [
        {
          msg: "No registered user is found, please check the email and password entered",
        },
      ],
      csrfToken: req.csrfToken(),
    });
  }

  const token = generateToken({
    id: verifyUserExists.id,
    fullname: verifyUserExists.fullname,
  });

  return res.cookie("_token", token, {
    httpOnly: true,
  }).redirect("/page/my-estates");
};

const signUpPage = async (req, res) => {
  res.render("auth/signup", {
    page: "Sign up",
    csrfToken: req.csrfToken(),
  });
};

const signUp = async (req, res) => {
  await check("fullname")
    .notEmpty()
    .withMessage("The full name cannot be empty")
    .run(req);
  await check("email")
    .notEmpty()
    .withMessage("The email is not valid")
    .run(req);
  await check("phone_number")
    .notEmpty()
    .withMessage("The phone number cannot be empty")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("The password must have 6 characters")
    .run(req);
  await check("password_repeat")
    .equals(req.body.password)
    .withMessage("The passwords are not equals")
    .run(req);

  let validation = validationResult(req);

  const { fullname, email, phone_number, password } = req.body;

  if (!validation.isEmpty()) {
    return res.render("auth/signup", {
      page: "Sign up",
      errors: validation.array(),
      currentData: {
        fullname,
        email,
        phone: phone_number,
      },
      userRegistered: false,
      csrfToken: req.csrfToken(),
    });
  }

  const verifyUserExists = await User.findOne({ where: { email: email } });

  if (verifyUserExists) {
    return res.render("auth/signup", {
      page: "Sign up",
      errors: [
        {
          msg: "This user is already registered",
        },
      ],
      currentData: {
        fullname,
        email,
        phone: phone_number,
      },
      userRegistered: true,
      csrfToken: req.csrfToken(),
    });
  }

  const newUser = await User.create({
    fullname,
    email,
    phone: phone_number,
    img: "",
    img_url: "",
    password,
    token: generateId(),
  });

  emails.signUpUser({
    fullname: newUser.fullname,
    email: newUser.email,
    token: newUser.token,
  });

  return res.render("auth/templates/confirm-account-message", {
    page: "Confirm account",
    user: newUser.fullname,
    message:
      "A confirmation message has been sent to your email, please check it to get the instructions to enable your account",
  });
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  const verifyUserExists = await User.findOne({ where: { token } });

  if (!verifyUserExists) {
    return res.render("auth/confirm-account", {
      page: "Error confirming account",
      message: "There was an error confirming your account, try again",
      error: true,
    });
  }

  verifyUserExists.token = null;
  verifyUserExists.confirm = true;

  await verifyUserExists.save();

  return res.render("auth/confirm-account", {
    page: "Confirmed account",
    message: "Your account confirmation process was successful",
    error: false,
  });
};

const forgotPasswordPage = async (req, res) => {
  res.render("auth/forgot-password", {
    page: "Forgot password",
    csrfToken: req.csrfToken(),
  });
};

const forgotPassword = async (req, res) => {
  await check("email")
    .notEmpty()
    .withMessage("The email is not valid")
    .run(req);

  let validation = validationResult(req);

  const { email } = req.body;

  if (!validation.isEmpty()) {
    return res.render("auth/forgot-password", {
      page: "Forgot password",
      errors: validation.array(),
      csrfToken: req.csrfToken(),
    });
  }

  const verifyUserExists = await User.findOne({ where: { email: email } });

  if (!verifyUserExists) {
    return res.render("auth/forgot-password", {
      page: "Forgot password",
      errors: [
        {
          msg: "This user is not registered",
        },
      ],
      csrfToken: req.csrfToken(),
    });
  }

  verifyUserExists.token = generateId();
  await verifyUserExists.save();

  emails.forgotPasswordUser({
    fullname: verifyUserExists.fullname,
    email: verifyUserExists.email,
    token: verifyUserExists.token,
  });

  return res.render("auth/templates/reset-password-message", {
    page: "Reset password",
    user: verifyUserExists.fullname,
    message:
      "The instructions for resetting your password were sent to your email, please review it",
    success: false,
  });
};

const resetPasswordPage = async (req, res) => {
  const { token } = req.params;

  const verifyUserExists = await User.findOne({ where: { token } });

  if (!verifyUserExists) {
    return res.render("auth/templates/reset-password-error", {
      page: "Error resetting the password",
      message:
        "There was an error resetting your account password, please try again",
    });
  }

  return res.render("auth/reset-password", {
    page: "Reset password",
    token: token,
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;

  const userRegistered = await User.findOne({ where: { token } });

  await check("password")
    .isLength({ min: 6 })
    .withMessage("The password must have 6 characters")
    .run(req);
  await check("password_repeat")
    .equals(req.body.password)
    .withMessage("The passwords are not equals")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("auth/reset-password", {
      page: "Reset password",
      errors: validation.array(),
      token: token,
      csrfToken: req.csrfToken(),
    });
  }

  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  userRegistered.password = await bcrypt.hash(password, salt);
  userRegistered.token = null;

  await userRegistered.save();

  emails.passwordReseted({
    fullname: userRegistered.fullname,
    email: userRegistered.email,
  });

  return res.render("auth/templates/reset-password-message", {
    page: "Password reseted",
    user: userRegistered.fullname,
    message: "The password of your account was reseted successfully",
    success: true,
  });
};

const logOut = async(req, res) => {
  return res.clearCookie("_token").status(200).redirect("/auth/sign-in");
};

module.exports = {
  signInPage,
  signIn,
  signUpPage,
  signUp,
  forgotPasswordPage,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
  confirmAccount,
  logOut
};
