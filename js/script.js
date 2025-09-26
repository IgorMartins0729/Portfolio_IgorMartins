function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');

  // Esconde todos os conteúdos
  tabs.forEach(tab => {
    tab.classList.add('hidden');
  });

  // Remove destaque dos botões
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Mostra a aba clicada
  document.getElementById(tabId).classList.remove('hidden');

  // Ativa o botão clicado
  const clickedButton = Array.from(buttons).find(btn =>
    btn.getAttribute('onclick')?.includes(tabId)
  );

  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}