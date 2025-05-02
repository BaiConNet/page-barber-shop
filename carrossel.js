document.addEventListener("DOMContentLoaded", function () {
  // Dados dos produtos (pode ser substituído por uma chamada API)
  const products = [
    {
      id: 1,
      title: "Pomada Modeladora Infinity 80g",
      price: "R$ 21,99",
      image: "img/pomade-modeling.jpeg",
    },
    {
      id: 2,
      title: "Shampoo Dom Pelo 250ml",
      price: "R$ 29,99",
      image: "img/shampoo-dom-pelo.jpeg",
    },
    {
      id: 3,
      title: "Gel Cola extra forte 300g ",
      price: "R$ 21,99",
      image: "img/gel-cola.jpeg",
    },
    {
      id: 4,
      title: "Minoxidil Dom Pelo 120ml",
      price: "R$ 39,99",
      image: "img/minoxidil.jpeg",
    },
    {
      id: 5,
      title: "Balm Dulux 120g ",
      price: "R$ 29,99",
      image: "img/balm.jpeg",
    },
    {
      id: 6,
      title: "Pasta Modeladora For Men 160g",
      price: "R$ 29,99",
      image: "img/pasta-modeladora.jpeg",
    },
  ];

  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const nav = document.querySelector(".carousel-nav");

  let currentIndex = 0;
  let cardsPerView = calculateCardsPerView();

  // Criar cards de produtos
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">${product.price}</p>
        `;
    track.appendChild(productCard);

    // Criar indicadores de navegação
    const indicator = document.createElement("button");
    indicator.className = "carousel-indicator";
    indicator.dataset.index = index;
    nav.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".carousel-indicator");
  const productCards = document.querySelectorAll(".product-card");
  const totalSlides = Math.ceil(products.length);

  // Inicializar carrossel
  updateCarousel();

  // Event listeners
  prevButton.addEventListener("click", () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
    updateCarousel();
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      currentIndex = parseInt(indicator.dataset.index);
      updateCarousel();
    });
  });

  // Atualizar carrossel quando a janela for redimensionada
  window.addEventListener("resize", () => {
    cardsPerView = calculateCardsPerView();
    updateCarousel();
  });

  // Funções auxiliares
  function calculateCardsPerView() {
    const width = window.innerWidth;
    if (width >= 992) return 4;
    if (width >= 768) return 3;
    if (width >= 576) return 2;
    return 1;
  }

  function updateCarousel() {
    const offset = -currentIndex * (100 / cardsPerView);
    track.style.transform = `translateX(${offset}%)`;

    // Atualizar indicadores ativos
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });

    // Esconder botão anterior se estiver no primeiro slide
    prevButton.style.display = currentIndex === 0 ? "none" : "block";

    // O botão próximo sempre ficará visível, mas desabilitado no último slide
    nextButton.disabled = currentIndex >= totalSlides - 0;
  }
});
