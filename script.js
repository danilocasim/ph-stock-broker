// header

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // toggle nav
    nav.classList.toggle("nav-active");

    // animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation =
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
      }
    });

    // burger animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

// carousel
const carouselContainer = document.querySelector(".carouselContainer");
const eachCarousel = document.querySelector(".eachCarousel").clientWidth;
const allEachCarousel = document.querySelectorAll(".eachCarousel");
const allIndicator = document.querySelectorAll(".indicator");

const slideCarousel = (index) => {
  for (let x = 0; x < allEachCarousel.length; x++) {
    if (x === index) {
      allEachCarousel[x].classList.add("eachCarouselBorder");
      allIndicator[x].classList.add("activeIndicator");
    } else {
      allEachCarousel[x].classList.remove("eachCarouselBorder");
      allIndicator[x].classList.remove("activeIndicator");
    }
  }
  carouselContainer.scrollLeft = index * (eachCarousel + 10);
  console.log(carouselContainer.scrollLeft);
};
