document.addEventListener("DOMContentLoaded", () => {
  // 1. Dados dos produtos
  const products = [
    {
      id: 1,
      title: "Pomada Modeladora Infinity 80g",
      price: "R$ 21,99",
      image: "img/pomada-infinity.png",
    },
    {
      id: 6,
      title: "Pasta Modeladora For Men 160g",
      price: "R$ 29,99",
      image: "img/pomada-malb.png",
    },
    {
      id: 2,
      title: "Shampoo Dom Pelo 250ml",
      price: "R$ 29,99",
      image: "img/shampoo-dom-pelo.jpeg",
    },
    {
      id: 3,
      title: "Gel Cola extra forte 300g",
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
      title: "Balm Dulux 120g",
      price: "R$ 29,99",
      image: "img/balm.jpeg",
    },
  ];

  // 2. Elementos do DOM
  const carouselGrid = document.querySelector(".carousel-grid");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  // 3. Função para calcular cards visíveis
  function calculateCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
  }

  // 4. Inserir produtos no grid
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <h3>${product.title}</h3>
      <p class="price">${product.price}</p>
    `;
    carouselGrid.appendChild(productCard);
  });

  // 5. Configuração inicial
  let cardsPerView = calculateCardsPerView();
  const productCards = document.querySelectorAll(".product-card");
  const cardStyle = getComputedStyle(productCards[0]);
  const cardWidth = productCards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  const gap = parseInt(getComputedStyle(carouselGrid).gap) || 20;
  const scrollAmount = cardWidth * cardsPerView + gap * (cardsPerView - 1);
  const totalSlides = Math.ceil(productCards.length / cardsPerView);

  // 6. Criar dots indicadores
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("carousel-indicator");
    dot.dataset.index = i;
    indicatorsContainer.appendChild(dot);
    
    dot.addEventListener("click", () => {
      const scrollPosition = i * (cardWidth * cardsPerView + gap * (cardsPerView - 1));
      carouselGrid.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    });
  }

  // 7. Atualizar dots ativos
  function updateActiveDot() {
    const scrollPosition = carouselGrid.scrollLeft;
    const activeIndex = Math.round(scrollPosition / (cardWidth * cardsPerView + gap * (cardsPerView - 1)));
    
    document.querySelectorAll(".carousel-indicator").forEach(dot => {
      const dotIndex = parseInt(dot.dataset.index);
      dot.classList.toggle("active", dotIndex === activeIndex);
      dot.setAttribute("aria-current", dotIndex === activeIndex);
    });

    // Atualizar visibilidade dos botões
    prevButton.style.visibility = scrollPosition <= 10 ? "hidden" : "visible";
    nextButton.style.visibility = scrollPosition >= carouselGrid.scrollWidth - carouselGrid.offsetWidth - 10 ? "hidden" : "visible";
  }

  // 8. Navegação por botões - VERSÃO 100% FUNCIONAL
  nextButton.addEventListener("click", () => {
    carouselGrid.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  prevButton.addEventListener("click", () => {
    carouselGrid.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });

  // 9. Event listeners
  carouselGrid.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateActiveDot);
  });

  window.addEventListener("resize", () => {
    const prevCardsPerView = cardsPerView;
    cardsPerView = calculateCardsPerView();
    
    if (prevCardsPerView !== cardsPerView) {
      const newScrollAmount = cardWidth * cardsPerView + gap * (cardsPerView - 1);
      scrollAmount = newScrollAmount;
      updateActiveDot();
    }
  });

  // 10. Inicialização
  updateActiveDot();
  prevButton.style.visibility = "hidden"; // Esconde o botão anterior inicialmente
});