// Função que exibe o conteúdo da aba clicada
const tabClicked = (tab) => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  const contents = document.querySelectorAll('.content');
  contents.forEach(content => content.classList.remove('show'));

  const contentId = tab.getAttribute('content-id');
  const content = document.getElementById(contentId);
  content.classList.add('show');
};

// Pega todas as abas
const tabs = document.querySelectorAll('.tab-btn');

// Adiciona evento de clique
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

// Ativa a aba inicial
const currentActiveTab = document.querySelector('.tab-btn.active');
if (currentActiveTab) tabClicked(currentActiveTab);


