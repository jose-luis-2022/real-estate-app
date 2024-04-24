(function () {
    const btnMenu = document.getElementById("btn-menu");
    const menu = document.querySelector(".container-menu #menu");

    btnMenu.addEventListener("click", function(){
      menu.classList.toggle("visible")
    })

  })();