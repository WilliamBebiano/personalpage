window.onload = function () {
  // Digitando o Texto de apresentacao 
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

   
    // Adicionando funcionabilidades ao NavBar
    const menuBtn = document.getElementById("menu-btn");
    const menuTab = document.getElementById("menu-tab");
    menuBtn.addEventListener("click", function () {
        menuTab.classList.toggle("active");
    });

    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        const tab = document.getElementById(tabId);
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(function(tab) {
          tab.style.display = 'none';
        });
        tab.style.display = 'block';
      });
    });
       // Adicionando movimento a galeria de imagens 
    // BTn Next 
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

  	// BTn back

    function backImage() {
        galleryImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex - 1) % galleryImages.length;
        galleryImages[currentImageIndex].classList.add("active");
    }


    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", backImage);

    //setInterval(nextImage, 3000);

    // Scroll Interativo 

    const rolar = document.querySelector("#rolar-pag")
    rolar.addEventListener("click", function() {
     window.scrollTo(0,600)
})
    
    const rolar1 = document.querySelector("#rolar-pag1")
    rolar1.addEventListener("click", function() {
     window.scrollTo(0,600)
})

    
}

// Efeito Parallax no BG dos Projetos 
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

