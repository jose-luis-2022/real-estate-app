const categories = require("../seed/templates/Categories");
const prices = require("../seed/templates/Prices");
const isSeller = require("../helpers/isSeller");
const dateFormat = require("../helpers/dateFormat");
const { check, validationResult } = require("express-validator");
const Estate = require("../models/Estate");
const Message = require("../models/Message");
const cloudinary = require("../middlewares/cloudinaryConfig");
const path = require("path");

const myEstatesPage = async (req, res) => {
  const { page: currentPage } = req.query;
  const expression = /^[0-9]$/;

  if (!expression.test(currentPage)) {
    res.redirect("/page/my-estates?page=1");
  }

  try {
    const { id } = req.user;
    const border = 5;
    const offset = currentPage * border - border;

    const estates = await Estate.findAll({
      limit: border,
      offset,
      where: { userId: id },
    });

    const totalEstates = await Estate.count({ where: { userId: id } });

    res.render("pages/estates/my-estates", {
      page: "My estates",
      numberPages: Math.ceil(totalEstates / border),
      currentPage: Number(currentPage),
      totalEstates,
      offset,
      border,
      estates,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.log(error);
  }
};

const createEstatePage = async (req, res) => {
  res.render("pages/estates/create-estate", {
    page: "Create estate",
    csrfToken: req.csrfToken(),
    categories: categories,
    prices: prices,
    data: {},
  });
};

const createEstate = async (req, res) => {
  await check("title")
    .notEmpty()
    .withMessage("The Announcement's title is required")
    .run(req);
  await check("description")
    .notEmpty()
    .withMessage("The description is required")
    .isLength({ max: 250 })
    .withMessage("The description is very long")
    .run(req);
  await check("category").notEmpty().withMessage("Select a category").run(req);
  await check("price").notEmpty().withMessage("Select a price range").run(req);
  await check("rooms")
    .isNumeric()
    .withMessage("Select the number of rooms")
    .run(req);
  await check("parking_lots")
    .isNumeric()
    .withMessage("Select the number of parking lots")
    .run(req);
  await check("bathrooms")
    .isNumeric()
    .withMessage("Select the number of bathrooms")
    .run(req);
  await check("latitude")
    .isNumeric()
    .withMessage("Locate the estate on the map")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("pages/estates/create-estate", {
      page: "Create estate",
      errors: validation.array(),
      categories: categories,
      prices: prices,
      data: req.body,
      csrfToken: req.csrfToken(),
    });
  }

  const {
    title,
    description,
    category,
    price,
    rooms,
    parking_lots,
    bathrooms,
    street,
    latitude,
    longitude,
  } = req.body;

  const { id: userId } = req.user;

  try {
    await Estate.create({
      title,
      description,
      category,
      price,
      rooms,
      parking: parking_lots,
      bathrooms,
      street,
      lat: latitude,
      lng: longitude,
      userId,
      img: "",
      img_url: "",
    });

    return res.redirect("/page/my-estates");
  } catch (error) {
    console.log(error);
  }
};

const addImageEstatePage = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (req.user.id.toString() !== estateValid.userId.toString()) {
    return res.redirect("/page/my-estates");
  }

  res.render("pages/estates/add-img-estate", {
    page: "Add image estate",
    estate: estateValid,
    csrfToken: req.csrfToken(),
  });
};

const addImageEstate = async (req, res, next) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (estateValid.published) {
    return res.redirect("/page/my-estates");
  }

  if (req.user.id.toString() !== estateValid.userId.toString()) {
    return res.redirect("/page/my-estates");
  }

  cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "realestates/estates",
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

      estateValid.img_url = result.secure_url;
      estateValid.img = req.file.filename;
      estateValid.published = true;

      await estateValid.save();
    }
  );

  next();
};

const editEstatePage = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (estateValid.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/page/my-estates");
  }

  res.render("pages/estates/edit-estate", {
    page: "Edit estate",
    csrfToken: req.csrfToken(),
    categories: categories,
    prices: prices,
    data: estateValid,
  });
};

const editEstate = async (req, res) => {
  await check("title")
    .notEmpty()
    .withMessage("The Announcement's title is required")
    .run(req);
  await check("description")
    .notEmpty()
    .withMessage("The description is required")
    .isLength({ max: 250 })
    .withMessage("The description is very long")
    .run(req);
  await check("category").notEmpty().withMessage("Select a category").run(req);
  await check("price").notEmpty().withMessage("Select a price range").run(req);
  await check("rooms")
    .isNumeric()
    .withMessage("Select the number of rooms")
    .run(req);
  await check("parking_lots")
    .isNumeric()
    .withMessage("Select the number of parking lots")
    .run(req);
  await check("bathrooms")
    .isNumeric()
    .withMessage("Select the number of bathrooms")
    .run(req);
  await check("latitude")
    .isNumeric()
    .withMessage("Locate the estate on the map")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render("pages/estates/edit-estate", {
      page: "Edit estate",
      errors: validation.array(),
      categories: categories,
      prices: prices,
      data: req.body,
      csrfToken: req.csrfToken(),
    });
  }

  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (estateValid.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/page/my-estates");
  }

  const {
    title,
    description,
    category,
    price,
    rooms,
    parking_lots,
    bathrooms,
    street,
    latitude,
    longitude,
  } = req.body;

  try {
    estateValid.set({
      title,
      description,
      category,
      price,
      rooms,
      parking: parking_lots,
      bathrooms,
      street,
      lat: latitude,
      lng: longitude,
      userId: estateValid.userId,
      img: estateValid.img,
      img_url: estateValid.img_url,
    });

    await estateValid.save();

    return res.redirect("/page/my-estates");
  } catch (error) {
    console.log(error);
  }
};

const deleteEstate = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (estateValid.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/page/my-estates");
  }

  const messagesEstate = await Message.findAll({where: {estateId: estateValid.id}});

  cloudinary.uploader.destroy(`realestates/estates/${estateValid.img}`);

  messagesEstate.forEach(message => message.destroy());

  await estateValid.destroy();


  res.redirect("/page/my-estates");
};

const changeState = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/page/my-estates");
  }

  if (estateValid.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/page/my-estates");
  }

  estateValid.published = !estateValid.published;

  await estateValid.save();

  res.json({
    result: "ok",
  });
};

const showEstate = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid || !estateValid.published) {
    return res.redirect("/404");
  }

  res.render("pages/estates/show-estate", {
    page: estateValid.title,
    estate: estateValid,
    csrfToken: req.csrfToken(),
    user: req.user,
    isSeller: isSeller(req.user?.id, estateValid.userId),
  });
};

const sendMessage = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/404");
  }

  const estate = estateValid;

  await check("message")
    .notEmpty()
    .withMessage("The message cannot be empty")
    .run(req);
  await check("message")
    .isLength({ min: 10 })
    .withMessage("The message cannot be short")
    .run(req);

  let validation = validationResult(req);

  if (!validation.isEmpty()) {
    res.render("pages/show-estate", {
      page: estate.title,
      errors: validation.array(),
      estate,
      csrfToken: req.csrfToken(),
      user: req.user,
      isSeller: isSeller(req.user?.id, estate.userId),
    });
  }

  if (validation.isEmpty()) {
    const { message } = req.body;
    const { id: estateId } = req.params;
    const { fullname: userName, email: userEmail } = req.user;

    estateValid.totalMessages = estateValid.totalMessages + 1;

    await Message.create({
      message,
      estateId,
      userName,
      userEmail
    });

    await estateValid.save();

    res.render("pages/show-estate", {
      page: estate.title,
      estate,
      csrfToken: req.csrfToken(),
      user: req.user,
      isSeller: isSeller(req.user?.id, estate.userId),
      isSent: true,
    });
  }
};

const watchMessages = async (req, res) => {
  const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid) {
    return res.redirect("/404");
  }

  const messagesEstate = await Message.findAll({ where: { estateId: id } });

  if (estateValid.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/page/404");
  }

  res.render("pages/estates/messages-estate", {
    page: "Messages",
    messages: messagesEstate,
    dateFormat,
  });
};

module.exports = {
  myEstatesPage,
  createEstatePage,
  createEstate,
  addImageEstatePage,
  addImageEstate,
  editEstatePage,
  editEstate,
  deleteEstate,
  changeState,
  showEstate,
  sendMessage,
  watchMessages,
};
