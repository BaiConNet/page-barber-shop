document.addEventListener("DOMContentLoaded", function () {
  // Menu Mobile
  const menuBtn = document.querySelector(".menu-mobile");
  const navUl = document.querySelector("nav ul");

  menuBtn.addEventListener("click", function () {
    navUl.classList.toggle("show");
  });

  //  Efeito de hover na imagem da logo
  const logoImg = document.querySelector(".logo-img");
  if (logoImg) {
    logoImg.addEventListener("mouseenter", () => {
      logoImg.style.transform = "rotate(15deg)";
      logoImg.style.transition = "transform 0.3s ease";
    });

    logoImg.addEventListener("mouseleave", () => {
      logoImg.style.transform = "rotate(0)";
    });
  }

  // Scroll suave para links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      navUl.classList.remove("show");

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
