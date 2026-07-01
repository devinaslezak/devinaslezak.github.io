console.log("app.js is running");

const progressBar = document.querySelector(".scroll-progress-bar");
const scrollProgress = document.querySelector(".scroll-progress");

const backToTop = document.querySelector(".back-to-top");

const navbar = document.querySelector("#navbar");
const navToggle = document.querySelector("#navToggle");
const navShow = document.querySelector("#navShow");

console.log({
  progressBar,
  scrollProgress,
  backToTop,
  navbar,
  navToggle,
  navShow
});

function updateScrollProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (documentHeight <= 0) {
    progressBar.style.width = "0%";
    return;
  }

  const scrollPercent = (scrollTop / documentHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
}

function updateBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

window.addEventListener("scroll", function () {
  updateScrollProgress();
  updateBackToTop();
});

window.addEventListener("resize", updateScrollProgress);

if (navToggle && navbar && navShow && scrollProgress) {
  navToggle.addEventListener("click", function () {
    console.log("hide nav clicked");

    navbar.classList.add("hidden");
    navShow.classList.add("visible");
    scrollProgress.classList.add("nav-hidden");
  });
}

if (navShow && navbar && navToggle && scrollProgress) {
  navShow.addEventListener("click", function () {
    console.log("show nav clicked");

    navbar.classList.remove("hidden");
    navShow.classList.remove("visible");
    scrollProgress.classList.remove("nav-hidden");
  });
}

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const revealItems = document.querySelectorAll(".reveal-from-right");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}

updateScrollProgress();
updateBackToTop();

const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");

const clickableImages = document.querySelectorAll(".project-visuals img, .intro-image img");

clickableImages.forEach(function (image) {
  image.addEventListener("click", function () {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("visible");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
