(function () {
    const btnMenuGeneral = document.getElementById("btn-menu-general");
    const menuGeneral = document.querySelector(".container-menu-general #menu-general");

    btnMenuGeneral.addEventListener("click", function(){
      menuGeneral.classList.toggle("visible")
    })

  })();