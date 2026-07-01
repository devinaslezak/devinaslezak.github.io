const progressBar = document.querySelector(".scroll-progress-bar");

window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / documentHeight) * 100;

  progressBar.style.width = `${scrollPercent}%`;
});

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
