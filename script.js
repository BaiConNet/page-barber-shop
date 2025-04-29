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

  // Formulário de Agendamento
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulação de envio
      const formData = new FormData(this);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log("Dados do agendamento:", data);

      // Feedback para o usuário
      alert(
        "Agendamento realizado com sucesso! Entraremos em contato para confirmação."
      );
      this.reset();
    });
  }

  // Formulário de Newsletter
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      console.log("Email cadastrado:", email);

      // Feedback para o usuário
      alert("Obrigado por assinar nossa newsletter!");
      this.reset();
    });
  }

  // Botões de compra de produtos
  const buyButtons = document.querySelectorAll(".btn-add");

  buyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector(".price").textContent;

      console.log(
        `Produto adicionado ao carrinho: ${productName} - ${productPrice}`
      );

      // Feedback para o usuário
      alert(`${productName} adicionado ao carrinho!`);
    });
  });

  // Validação de data no formulário de agendamento
  const dateInput = document.getElementById("date");

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Animação ao rolar a página
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .product-card, .team-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Define opacidade inicial e efeito para os elementos
  document
    .querySelectorAll(".service-card, .product-card, .team-card")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Executa uma vez ao carregar a página
  // Integração com WhatsApp
  function setupWhatsAppIntegration() {
    // Botão flutuante
    const whatsappBtn = document.createElement("a");
    whatsappBtn.href =
      "https://wa.me/5521989698002?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20na%20Modern%20Man%20Barber%20Shop";
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.target = "_blank";
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);

    // Todos os ícones do WhatsApp na página
    document.querySelectorAll(".fa-whatsapp").forEach((icon) => {
      if (!icon.closest(".whatsapp-float")) {
        icon.addEventListener("click", (e) => {
          e.preventDefault();
          const phone = "5521989698002"; // Seu número com DDI e DDD
          const defaultMessage =
            "Olá, gostaria de agendar um horário na Modern Man Barber Shop";
          window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`,
            "_blank"
          );
        });
      }
    });
  }

  // Chame a função quando o DOM estiver carregado
  document.addEventListener("DOMContentLoaded", setupWhatsAppIntegration);
});
