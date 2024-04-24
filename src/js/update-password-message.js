(function () {
    const infoUpdatePassword = document.getElementById("info_update_password");
    const isPasswordUpdated = document.getElementById("password_info_updated");
  
    if (isPasswordUpdated.innerHTML === "yes") {
      infoUpdatePassword.style.display = "block";
      setTimeout(function () {
        infoUpdatePassword.style.display = "none";
      }, 5000);
    }
  })();
  