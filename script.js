console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');
  const modal = document.getElementById('addCardModal');
  const closeModal = document.getElementById('closeModal');
  const submitCard = document.getElementById('submitCard');

  if (!addCardBtn || !modal || !closeModal || !submitCard) {
    console.error("Un ou plusieurs éléments HTML manquants");
    return;
  }

  let cardId = loadCardId();
  loadCards();

  addCardBtn.addEventListener('click', () => {
    console.log("Bouton 'Ajouter une carte' cliqué");
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    console.log("Fermeture du modal");
    modal.style.display = 'none';
  });

  submitCard.addEventListener('click', () => {
    console.log("Bouton 'Ajouter' cliqué");
    const title = document.getElementById('cardTitle').value;
    const content = document.getElementById('cardContent').value;
    const priority = document.getElementById('cardPriority').value;
    const position = document.getElementById('cardPosition').value;

    console.log("Valeurs saisies:", { title, content, priority, position });

    if (title && content) {
      const newCard = createCard(title, content, priority);
      const todoColumn = document.querySelector('.column[data-status="todo"]');
      
      if (!todoColumn) {
        console.error("Colonne 'To Do' non trouvée");
        return;
      }

      // Ajouter la carte selon la position choisie
      switch(position) {
        case 'first':
          todoColumn.insertBefore(newCard, todoColumn.querySelector('.card'));
          break;
        case 'last':
          todoColumn.appendChild(newCard);
          break;
        case 'middle':
          const cards = todoColumn.querySelectorAll('.card');
          const middleIndex = Math.floor(cards.length / 2);
          todoColumn.insertBefore(newCard, cards[middleIndex]);
          break;
      }

      console.log("Nouvelle carte ajoutée");
      saveCards();
      modal.style.display = 'none';
      resetModalInputs();
    } else {
      console.log("Titre ou contenu manquant");
    }
  });

  function createCard(title, content, priority, id = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = id || cardId++;
    card.dataset.priority = priority;
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
    `;
    return card;
  }

  function resetModalInputs() {
    document.getElementById('cardTitle').value = '';
    document.getElementById('cardContent').value = '';
    document.getElementById('cardPriority').value = 'low';
    document.getElementById('cardPosition').value = 'last';
  }

  function saveCards() {
    const columns = document.querySelectorAll('.column');
    const boardData = {};
    columns.forEach(column => {
      const status = column.dataset.status;
      boardData[status] = Array.from(column.querySelectorAll('.card')).map(card => ({
        id: card.dataset.id,
        title: card.querySelector('h3').textContent,
        content: card.querySelector('p').textContent,
        priority: card.dataset.priority
      }));
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(boardData));
    localStorage.setItem('cardId', cardId.toString());
  }

  function loadCards() {
    const boardData = JSON.parse(localStorage.getItem('kanbanBoard'));
    if (boardData) {
      Object.entries(boardData).forEach(([status, cards]) => {
        const column = document.querySelector(`.column[data-status="${status}"]`);
        cards.forEach(cardData => {
          const card = createCard(cardData.title, cardData.content, cardData.priority, cardData.id);
          column.appendChild(card);
        });
      });
    }
  }

  function loadCardId() {
    const savedCardId = localStorage.getItem('cardId');
    return savedCardId ? parseInt(savedCardId) : 5;
  }

  searchInput.addEventListener('input', () => {
    // fonction de recherche à implémenter
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // fonction de tri par priorité à implémenter
  });
});
