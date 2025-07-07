// Formulário de Agendamento
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Resetar mensagens de erro
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });

    // Validar campos
    let isValid = true;
    const nome = document.getElementById("name").value.trim();
    const telefone = document.getElementById("phone").value.trim();
    const servico = document.getElementById("service").value;
    const barbeiro = document.getElementById("barber").value;
    const data = document.getElementById("date").value;
    const horario = document.getElementById("time").value;

    // Validação do nome
    if (nome.length < 3 || !/^[A-Za-zÀ-ú ]+$/.test(nome)) {
      document.getElementById("name-error").textContent =
        "Por favor, insira um nome válido";
      isValid = false;
    }

    // Validação do telefone (usando a mesma regex do pattern)

    // Validação do serviço
    if (servico === "") {
      document.getElementById("service-error").textContent =
        "Por favor, selecione um serviço";
      isValid = false;
    }

    // Validação do barbeiro
    if (barbeiro === "") {
      document.getElementById("barber-error").textContent =
        "Por favor, selecione um barbeiro";
      isValid = false;
    }

    // Validação da data
    if (data === "") {
      document.getElementById("date-error").textContent =
        "Por favor, selecione uma data";
      isValid = false;
    } else {
      const selectedDate = new Date(data);
      selectedDate.setHours(0, 0, 0, 0); // Normaliza a hora para meia-noite
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normaliza a hora para meia-noite

      // Verifica se a data é anterior à data atual
      if (selectedDate < today) {
        const oneDateNow = new Date(today);
        oneDateNow.setDate(today.getDate() - 1); // diminui 1 dias
        oneDateNow.setHours(0, 0, 0, 0); // Normaliza a hora

        if (selectedDate < oneDateNow) {
          document.getElementById("date-error").textContent =
            "Não é possível agendar para datas passadas";
          isValid = false;
        }
      }
      // Verifica se a data é mais de 1 semana no futuro
      else if (selectedDate > today) {
        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7); // Adiciona 7 dias
        oneWeekFromNow.setHours(0, 0, 0, 0); // Normaliza a hora

        if (selectedDate > oneWeekFromNow) {
          document.getElementById("date-error").textContent =
            "Não é possível agendar com mais de 1 semana de antecedência";
          isValid = false;
        } else {
          document.getElementById("date-error").textContent = ""; // Data válida - limpa mensagem de erro
        }
      } else {
        document.getElementById("date-error").textContent = ""; // Data é hoje - limpa mensagem de erro
      }
    }

    // Validação do horário e dia da semana
    if (horario === "") {
      document.getElementById("time-error").textContent =
        "Por favor, selecione um horário";
      isValid = false;
    } else {
      const [hours, minutes] = horario.split(":").map(Number);
      const selectedDate = new Date(data);
      const dayOfWeek = selectedDate.getDay(); // 0=segunda, 6=domingo

      // Verifica se é domingo
      if (dayOfWeek === 6 && (hours > 12 || (hours === 12 && minutes > 0))) {
        document.getElementById("time-error").textContent =
          "Aos domingos só atendemos até 12h";
        isValid = false;
      }
      // Verifica se é sábado após 15h
      else if (
        dayOfWeek === 5 && (hours > 15 || (hours === 15 && minutes > 0))) {
        document.getElementById("time-error").textContent =
          "Aos sábados só atendemos até 15h";
        isValid = false;
      }
      // Verifica se o horário termina em 00 ou 30
      else if (minutes !== 0 && minutes !== 30) {
        document.getElementById("time-error").textContent =
          "Por favor, selecione um horário que termine em :00 ou :30";
        isValid = false;
      }
      // Verifica o horário de funcionamento padrão (seg-sex 08h-18h00)
      else if (hours < 8 || (hours === 18 && minutes > 0) || hours >= 19) {
        document.getElementById("time-error").textContent =
          "Horário fora do funcionamento (08:00 - 18:00)";
        isValid = false;
      }
    }
    // Se tudo estiver válido, enviar para o WhatsApp
    if (isValid) {
      // Captura o clique no botão Agendar
      document
        .getElementById("btnAgendar")
        .addEventListener("click", function (e) {
          e.preventDefault();

          // Obter os valores dos inputs do formulário
          const nome = document.getElementById("name").value;
          const telefone = document.getElementById("phone").value;
          const servico = document.getElementById("service").value;
          const barbeiro = document.getElementById("barber").value;
          const dataISO = document.getElementById("date").value;
          const horario = document.getElementById("time").value;
          const phone = "5521967363659"; // Seu número com DDI e DDD

          function formatarData(dataISO) {
            const [ano, mes, dia] = dataISO.split("-");
            return `${dia}/${mes}/${ano}`; // Formato DD/MM/AAAA
          }
          const dataFormatada = formatarData(dataISO);

          // Mensagem formatada com os dados do usuário
          const mensagem = `NOVO AGENDAMENTO
            
Olá ${barbeiro}, gostaria de agendar um horário na Modern Man Barber Shop.

Data: ${dataFormatada}  
Horário: ${horario}  
Serviço: ${servico}  
Barbeiro: ${barbeiro}

Cliente: ${nome}  
Contato: ${telefone}

*Por favor, confirme se este horário está disponível!*`;

            window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`,
            "_blank"
            );
            console.log(mensagem);
            // Limpa o formulário após o envio
            resetForm(document.getElementById("booking-form"));
            // Recarrega a página após o envio
            setTimeout(() => {
            window.location.reload();
            }, 500);
          });

      function resetForm(formElement) {
        // Resetar os valores
        formElement.reset();
      }
      // Limpar mensagens de erro
      document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
      });

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

      // Inicializar quando o DOM estiver pronto
      document.addEventListener("DOMContentLoaded", () => {
        setupWhatsAppIntegration();
      });
    }
  });
