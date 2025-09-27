function showTab(tabId) { 
  // Seleciona todos os elementos que possuem a classe 'tab-content'
  // Esses elementos são o conteúdo de cada aba
  const tabs = document.querySelectorAll('.tab-content');

  // Seleciona todos os elementos que possuem a classe 'tab-button'
  // Esses elementos são os botões que trocam as abas
  const buttons = document.querySelectorAll('.tab-button');

  // ===============================
  // 1️⃣ Esconde todos os conteúdos
  // ===============================
  tabs.forEach(tab => {
    // Adiciona a classe 'hidden' em cada aba, fazendo ela desaparecer
    tab.classList.add('hidden');
  });

  // ===============================
  // 2️⃣ Remove destaque de todos os botões
  // ===============================
  buttons.forEach(btn => {
    // Remove a classe 'active' de cada botão
    // 'active' é a classe que indica qual botão está selecionado
    btn.classList.remove('active');
  });

  // ===============================
  // 3️⃣ Mostra o conteúdo da aba clicada
  // ===============================
  // Seleciona o elemento que tem o id igual a 'tabId' e remove a classe 'hidden'
  // Assim, apenas essa aba fica visível
  document.getElementById(tabId).classList.remove('hidden');

  // ===============================
  // 4️⃣ Ativa o botão correspondente à aba clicada
  // ===============================
  // Converte a NodeList 'buttons' para um array e procura o botão
  // que possui um 'onclick' que contém o 'tabId'
  const clickedButton = Array.from(buttons).find(btn =>
    btn.getAttribute('onclick')?.includes(tabId)
  );

  // Se encontrar o botão correto, adiciona a classe 'active'
  // Isso faz o botão ficar destacado como selecionado
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}
