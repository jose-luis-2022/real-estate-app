(function () {
    const btnMenuNotUser = document.getElementById("btn-menu-not-user");
    const menuNotUser = document.querySelector(".container-menu-not-user #menu-not-user");

    btnMenuNotUser?.addEventListener("click", function(){
      menuNotUser.classList.toggle("visible")
    })

  })();