let current = 0;

const sections = document.querySelectorAll("section");
const container = document.getElementById("container");
const links = document.querySelectorAll(".nav-link");
const contents = document.querySelectorAll(".fade-up");

let isScrolling = false;

function updateNav() {
  links.forEach(link => link.classList.remove("active"));
  links[current]?.classList.add("active");
}

function animateSection(index) {
  contents.forEach(el => el.classList.remove("active"));

  setTimeout(() => {
    sections[index].querySelector(".fade-up")?.classList.add("active");
  }, 200);
}

function goToSection(index) {
  current = index;
  container.style.transform = `translateY(-${current * 100}vh)`;
  updateNav();
  animateSection(current);
}

function handleScroll(direction) {
  if (isScrolling) return;

  isScrolling = true;

  if (direction === "down") {
    current = Math.min(current + 1, sections.length - 1);
  } else {
    current = Math.max(current - 1, 0);
  }

  goToSection(current);

  setTimeout(() => {
    isScrolling = false;
  }, 900);
}

window.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) < 50) return;

  if (e.deltaY > 0) handleScroll("down");
  else handleScroll("up");
});

links.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    goToSection(index);
  });
});