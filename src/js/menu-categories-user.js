(function () {
    const btnMenuCategoriesUser = document.getElementById("btn-menu-categories-user");
    const menuCategoriesUser = document.querySelector(".container-menu-categories-user #menu-categories-user");

    btnMenuCategoriesUser?.addEventListener("click", function(){
      menuCategoriesUser.classList.toggle("visible")
    })

  })();