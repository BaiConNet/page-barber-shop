// Dados dos produtos (pode ser substituído por uma chamada API)
const products = [
  {
    id: 1,
    title: "Pomada Infinity 80g",
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
    title: "Pomada For Men 160g",
    price: "R$ 29,99",
    image: "img/pasta-modeladora.jpeg",
  },
];

// Elementos do DOM
const track = document.querySelector(".carousel-track");
const nav = document.querySelector(".carousel-nav");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Variáveis de estado
let currentIndex = 0;
let cardsPerView = calculateCardsPerView();
let totalSlides = Math.ceil(products.length / cardsPerView);

// Função para calcular quantos cards mostrar baseado no tamanho da tela
function calculateCardsPerView() {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 992) return 3;
  if (window.innerWidth < 1200) return 4;
  return 5;
}

// Criar cards de produtos
function createProductCards() {
  track.innerHTML = "";
  nav.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
                     <div class="image-container">
                         <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                     </div>
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
}

// Inicializar o carrossel
createProductCards();
const indicators = document.querySelectorAll(".carousel-indicator");
const productCards = document.querySelectorAll(".product-card");

// Atualizar o carrossel quando a janela for redimensionada
window.addEventListener("resize", () => {
  cardsPerView = calculateCardsPerView();
  totalSlides = Math.ceil(products.length / cardsPerView);
  currentIndex = Math.min(currentIndex, totalSlides - 1);
  updateCarousel();
});

// Atualizar a exibição do carrossel - CORREÇÃO: cálculo preciso da largura
function updateCarousel() {
  if (productCards.length === 0) return;

  const cardStyle = window.getComputedStyle(productCards[0]);
  const cardWidth =
    productCards[0].offsetWidth +
    parseFloat(cardStyle.marginLeft) +
    parseFloat(cardStyle.marginRight);

  track.style.transform = `translateX(-${
    currentIndex * cardWidth * cardsPerView
  }px)`;

  // Atualizar indicadores ativos
  indicators.forEach((indicator, i) => {
    const slideIndex = Math.floor(i / cardsPerView);
    indicator.classList.toggle("active", slideIndex === currentIndex);
  });
}

// Navegação por indicadores
function setupIndicators() {
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.dataset.index);
      currentIndex = Math.floor(index / cardsPerView);
      updateCarousel();
    });
  });
}

// Botões anterior/próximo - CORREÇÃO: função corrigida
function setupNavigationButtons() {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });
}

// Inicializar eventos
setupIndicators();
setupNavigationButtons();
updateCarousel();
