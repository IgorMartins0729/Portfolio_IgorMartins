// ================== SHOWCASE TABS ==================
// Função chamada quando uma aba (tab) é clicada
function tabClicked(tab) {
  
  // Seleciona todos os conteúdos das abas e remove a classe 'show'
  // Isso garante que só o conteúdo da aba clicada ficará visível
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => content.classList.remove('show'));

  // Remove a classe 'active' de todos os botões de abas
  // Assim apenas o botão selecionado fica com destaque
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));

  // Descobre qual conteúdo deve ser exibido pegando o atributo 'content-id' do botão
  const contentId = tab.getAttribute('content-id');
  const content = document.getElementById(contentId);

  // Mostra o conteúdo correspondente adicionando a classe 'show'
  content.classList.add('show');

  // Marca o botão clicado como ativo (visual selecionado)
  tab.classList.add('active');
}

// Adiciona o evento de clique a todos os botões de aba (tab-btn)
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));


// ================== SCROLL ANIMATION ==================
document.addEventListener("DOMContentLoaded", () => {
  
  // Seleciona todos os elementos que vão ter a animação
  const elements = document.querySelectorAll('.scroll-reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight; // Altura da janela do navegador

    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top; // Posição do elemento na tela

      // Se o elemento entrou no campo de visão do usuário, exibe com animação
      if (elementTop < windowHeight - 100) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible'); // Remove quando sai da tela (opcional)
      }
    });
  }

  // Chama a função quando o usuário rolar a página
  window.addEventListener('scroll', revealOnScroll);

  // Executa uma vez ao carregar para animar itens já visíveis
  revealOnScroll();
});


// ------- POP UP ----------
// Abre o modal correspondente
document.querySelectorAll(".btn-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "flex";
  });
});

// Fecha ao clicar no X
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

// Fecha ao clicar fora do modal
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
