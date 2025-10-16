// ================== SHOWCASE TABS ==================

// Função que exibe o conteúdo da aba clicada
function tabClicked(tab) {
  // Pega todos os conteúdos e remove a classe 'show'
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => content.classList.remove('show'));

  // Remove destaque de todos os botões
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));

  // Mostra o conteúdo correspondente ao botão clicado
  const contentId = tab.getAttribute('content-id');
  const content = document.getElementById(contentId);
  content.classList.add('show');

  // Marca o botão clicado como ativo
  tab.classList.add('active');
}

// Seleciona todos os botões e adiciona o evento de clique
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));


document.addEventListener("DOMContentLoaded", () => {

  
  // ======== ANIMAÇÃO DE SCROLL ========
  const elements = document.querySelectorAll('.scroll-reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

});
