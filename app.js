document.documentElement.classList.add("js");

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
} else {
  console.warn("Nav hide elements missing", {
    navToggle,
    navbar,
    navShow,
    scrollProgress
  });
}

if (navShow && navbar && scrollProgress) {
  navShow.addEventListener("click", function () {
    console.log("show nav clicked");

    navbar.classList.remove("hidden");
    navShow.classList.remove("visible");
    scrollProgress.classList.remove("nav-hidden");
  });
} else {
  console.warn("Nav show elements missing", {
    navShow,
    navbar,
    scrollProgress
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

const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");

const expandButtons = document.querySelectorAll(".expand-image-btn");
const clickableImages = document.querySelectorAll(".image-expand-card img");

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("visible");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

expandButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const card = button.closest(".image-expand-card");
    if (!card) return;

    const image = card.querySelector("img");
    openLightbox(image);
  });
});

clickableImages.forEach(function (image) {
  image.addEventListener("click", function () {
    openLightbox(image);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    closeLightbox();
  });
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

updateScrollProgress();
updateBackToTop();
