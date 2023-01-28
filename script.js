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

    const galleryImages = document.querySelectorAll("#gallery-image");
    let currentImageIndex = 0;

    function nextImage() {
        galleryImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        galleryImages[currentImageIndex].classList.add("active");
    }


    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextImage);

    setInterval(nextImage, 3000);
// back

    function backImage() {
        galleryImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex - 1) % galleryImages.length;
        galleryImages[currentImageIndex].classList.add("active");
    }


    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", backImage);

    //setInterval(nextImage, 3000);
    
}

const parallaxContainer = document.querySelector('.parallax-container');
const parallaxBackground = document.querySelector('.parallax-background');
const parallaxForeground = document.querySelector('.parallax-foreground');


// add event listener for scroll
parallaxContainer.addEventListener('scroll', e => {
  // calculate the scroll amount
  const scrollPercentage = (parallaxContainer.scrollTop + parallaxContainer.clientHeight) / parallaxContainer.scrollHeight;

  // update the background and foreground positions
  parallaxBackground.style.transform = `translateY(${-scrollPercentage * 100}%)`;
  parallaxForeground.style.transform = `translateY(${scrollPercentage * 50}%)`;
});