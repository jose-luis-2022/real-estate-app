(function () {
    const changeState = document.querySelectorAll(".change-state");
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  
    changeState.forEach((btn) => {
      btn.addEventListener("click", changeEstateState);
    });
  
    async function changeEstateState(event) {
      const { estateId: id } = event.target.dataset;
  
      try {
        const url = `/page/estate/${id}`;
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
              "CSRF-Token": token
          }
        });
  
        const result = await response.json(); 
  
        if (result) {
          if(event.target.classList.contains("bg-yellow-200")){
            event.target.classList.add("bg-green-400", "text-green-900");
            event.target.classList.remove("bg-yellow-200", "text-gray-900");
            event.target.textContent = "Published"
          } else {
            event.target.classList.remove("bg-green-400", "text-green-900");
            event.target.classList.add("bg-yellow-200", "text-gray-900");
            event.target.textContent = "Not published"
          }
        }
  
      } catch (error) {
          console.log(error)
      }
    }
  })();
  