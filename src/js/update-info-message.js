(function () {
    const infoUpdatePersonal = document.getElementById("info_update_personal");
    const isPersonalUpdated = document.getElementById("personal_info_updated");

    console.log("si")
  
    if (isPersonalUpdated.innerHTML === "yes") {
      infoUpdatePersonal.style.display = "block";
      setTimeout(function () {
        infoUpdatePersonal.style.display = "none";
      }, 5000);
    }
  })();
  