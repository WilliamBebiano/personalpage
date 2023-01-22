window.onload = function () {
    const text = document.getElementById("typing").innerText;
    document.getElementById("typing").innerText = "";

    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    setTimeout(type, 2000);
}

window.onload = function () {
    var galleryImages = document.querySelectorAll(".gallery-image");
    var currentImageIndex = 0;

    function nextImage() {
        galleryImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        galleryImages[currentImageIndex].classList.add("active");
    }


    var nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextImage);

    setInterval(nextImage, 3000);
}
