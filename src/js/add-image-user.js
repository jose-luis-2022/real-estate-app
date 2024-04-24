const { Dropzone } = require("dropzone");

const token = document.querySelector("meta[name='csrf-token']").getAttribute("content")

Dropzone.options.imgs = {
    dictDefaultMessage: "Upload user's image here",
    acceptedFiles: ".png, .jpg, .jpeg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    headers: {
        "CSRF-Token": token
    },
    paramName: "img",
    init: function(){
        const dropzone = this;
        const publishBtn = document.querySelector("#publish");
        publishBtn.addEventListener("click", function() {
            dropzone.processQueue()
        });

        dropzone.on("queuecomplete", function() {
            
            if(dropzone.getActiveFiles().length == 0){
                setTimeout(function(){
                    document.getElementById("info_load_msg").style.display = "block";
                },1100)
                setTimeout(function(){
                    window.location.href = "/page/profile";
                }, 2500)    
            }
        })
    },
};