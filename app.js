const progressBar = document.querySelector(".scroll-progress-bar");
const scrollProgress = document.querySelector(".scroll-progress");

const backToTop = document.querySelector(".back-to-top");

const navbar = document.querySelector("#navbar");
const navToggle = document.querySelector("#navToggle");
const navShow = document.querySelector("#navShow");

function updateScrollProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent =
    documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercent}%`;
}

function updateBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateBackToTop();
});

window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

if (navbar && navToggle && navShow && scrollProgress) {
  navToggle.addEventListener("click", () => {
    navbar.classList.add("hidden");
    navShow.classList.add("visible");
    scrollProgress.classList.add("nav-hidden");
  });

  navShow.addEventListener("click", () => {
    navbar.classList.remove("hidden");
    navShow.classList.remove("visible");
    scrollProgress.classList.remove("nav-hidden");
  });
}

const revealItems = document.querySelectorAll(".reveal-from-right");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
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

revealItems.forEach(item => {
  revealObserver.observe(item);
});
