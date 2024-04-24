const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const emails = require("../helpers/emails");
const generateId = require("../helpers/tokenId");
const cloudinary = require("../middlewares/cloudinaryConfig");
const path = require("path");

const profilePage = async (req, res) => {
  const { user } = req;

  const currentUser = await User.findOne({ where: { id: user.id } });

  return res.render("pages/profile/profile", {
    page: "Profile",
    errorsPassword: "",
    errorsPersonalInformation: "",
    errorsEmail: "",
    updatedPassword: "",
    updatedPersonal: "",
    userData: currentUser,
    csrfToken: req.csrfToken(),
  });
};

const updateInfoPage = async (req, res) => {
  const { user } = req;

  return res.render("pages/profile/personal-info", {
    page: "Update personal info",
    userData: user,
    previousData: {},
    errors: "",
    updated: "",
    csrfToken: req.csrfToken(),
  });
};

const updateInfo = async (req, res) => {
  const { user } = req;

  const { fullname, phone_number } = req.body;

  const currentUser = await User.findOne({ where: { id: user.id } });

  await check("fullname")
    .notEmpty()
    .withMessage("The full name cannot be empty")
    .run(req);
  await check("phone_number")
    .notEmpty()
    .withMessage("The phone number cannot be empty")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("pages/profile/personal-info", {
      page: "Update personal info",
      userData: user,
      previousData: {
        fullname: fullname,
        phone_number: phone_number,
      },
      errors: validation.array(),
      updated: "",
      csrfToken: req.csrfToken(),
    });
  }

  currentUser.fullname = fullname;
  currentUser.phone = phone_number;

  await currentUser.save();

  return res.render("pages/profile/personal-info", {
    page: "Update personal info",
    userData: user,
    previousData: {},
    errors: "",
    updated: "yes",
    csrfToken: req.csrfToken(),
  });
};

const updateEmailPage = async (req, res) => {
  const { user } = req;

  res.render("pages/profile/email", {
    page: "Update email",
    userData: user,
    errors: "",
    previousData: {},
    csrfToken: req.csrfToken(),
  });
};

const updateEmail = async (req, res) => {
  const { user } = req;

  const { new_email } = req.body;

  const userRegistered = await User.findOne({ where: { email: new_email } });

  const currentUser = await User.findOne({ where: { id: user.id } });

  await check("new_email")
    .notEmpty()
    .withMessage("The new email cannot be empty")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("pages/profile/email", {
      page: "PUpdate email",
      userData: user,
      previousData: {
        email: new_email
      },
      errors: validation.array(),
      csrfToken: req.csrfToken(),
    });
  }

  if (userRegistered) {
    const error = [
      {
        msg: "This email already belongs to a Real Estates account",
      },
    ];

    return res.render("pages/profile/email", {
      page: "Update email",
      userData: user,
      previousData: {
        email: new_email
      },
      errors: error,
      csrfToken: req.csrfToken(),
    });
  }

  currentUser.email = new_email;
  currentUser.confirm = null;
  currentUser.token = generateId();

  await currentUser.save();

  emails.updatedEmail({
    fullname: currentUser.fullname,
    email: currentUser.email,
    token: currentUser.token,
  });

  res.clearCookie("_token").status(200);

  return res.render("pages/profile/templates/email-success-message", {
    page: "Email updated",
    csrfToken: req.csrfToken(),
  });
};

const updatePasswordPage = async (req, res) => {
  const { user } = req;

  return res.render("pages/profile/password", {
    page: "Update password",
    userData: user,
    errors: "",
    updated: "",
    csrfToken: req.csrfToken(),
  });
};

const updatePassword = async (req, res) => {
  const { user } = req;

  const { current_password, new_password } = req.body;

  const currentUser = await User.findOne({ where: { id: user.id } });

  const mathCurrentPassword = await bcrypt.compare(
    current_password,
    currentUser.password
  );

  if (mathCurrentPassword) {
    await check("new_password")
      .isLength({ min: 6 })
      .withMessage("The password must have 6 characters")
      .run(req);
    await check("repeat_password")
      .equals(new_password)
      .withMessage("The passwords are not equals")
      .run(req);

    let validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render("pages/profile/password", {
        page: "Update password",
        userData: user,
        errors: validation.array(),
        updated: "",
        csrfToken: req.csrfToken(),
      });
    }
  } else {
    const error = [
      {
        msg: "There's something wrong with the current password",
      },
    ];

    return res.render("pages/profile/password", {
      page: "Update password",
      userData: user,
      errors: error,
      updated: "",
      csrfToken: req.csrfToken(),
    });
  }

  const salt = await bcrypt.genSalt(10);
  currentUser.password = await bcrypt.hash(new_password, salt);

  await currentUser.save();

  emails.updatedPassword({
    fullname: currentUser.fullname,
    email: currentUser.email
  })

  return res.render("pages/profile/password", {
    page: "Update password",
    userData: user,
    errors: "",
    updated: "yes",
    csrfToken: req.csrfToken(),
  });
};

const addImageUserPage = async(req, res) => {
  const { user } = req;

  res.render("pages/profile/add-image-user", {
    page: `User Image`,
    userData: user,
    csrfToken: req.csrfToken(),
  });
};

const addImageUser = async(req, res, next) => {
  const { user } = req;

  const currentUser = await User.findOne({ where: { id: user.id } });

  cloudinary.uploader.destroy(`realestates/users/${currentUser.img}`)

  cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "realestates/users",
      public_id: req.file.filename,
      resource_type: "image",
    },
    async function (err, result) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      currentUser.img = req.file.filename;
      currentUser.img_url = result.secure_url;

      await currentUser.save();
    }
  );

  next();
};

module.exports = {
  profilePage,
  updateInfoPage,
  updateInfo,
  updateEmailPage,
  updateEmail,
  updatePasswordPage,
  updatePassword,
  addImageUserPage,
  addImageUser
};
