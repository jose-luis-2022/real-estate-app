const categories = require("../seed/templates/Categories");
const prices = require("../seed/templates/Prices");
const Estate = require("../models/Estate");
const isSeller = require("../helpers/isSeller");
const { Sequelize } = require("sequelize");

const home = async(req, res) => {
    const { user } = req;
    const estates = await Estate.findAll();

    const estatesRecent = estates.slice().sort((a,b) => b.createdAt - a.createdAt).slice(0,6)

    return res. render("pages/home",{
        page: "Home",
        user: user,
        categories,
        prices,
        estates: estatesRecent,
        csrfToken: req.csrfToken()

    })
};

const category = async(req, res) => {

    const { user } = req;
    const { id } = req.params;

    const category = categories.find(category => category.id.toString() === id.toString())

    const estates = await Estate.findAll({where: {category: category.name}})

    return res.render("pages/category", {
        page: `${category.name}s for sale`,
        estates,
        csrfToken: req.csrfToken(),
        user: user,
        category: category.id
    });
};

const showEstateGeneral = async(req, res) => {
    const { id } = req.params;

  const estateValid = await Estate.findByPk(id);

  if (!estateValid || !estateValid.published) {
    return res.redirect("/404");
  }

  res.render("pages/show-estate", {
    page: estateValid.title,
    estate: estateValid,
    csrfToken: req.csrfToken(),
    user: req.user,
    isSeller: isSeller(req.user?.id, estateValid.userId),
  });
};

const search = async(req, res) => {
  const { user } = req;
  const { term } = req.body;

  if(!term.trim()){
      return res.redirect("back")
  };

  const estates = await Estate.findAll({
      where: {
          title: {
              [Sequelize.Op.like] : "%" + term + "%"
          }
      }
  });

  res.render("pages/search",{
      page: "Results",
      estates,
      csrfToken: req.csrfToken(),
      user: user
  })
};

const notFound = async(req, res) => {
    const { user } = req;
    res.render("pages/not-found", {
        page: "Not Found",
        csrfToken: req.csrfToken(),
        user: user
    })
}



module.exports = { home, category, showEstateGeneral, search, notFound };