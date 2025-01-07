console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');

  // Éventuellement, on écoute les événements
  addCardBtn.addEventListener('click', () => {
    // Fonctionnalité pour ajouter une carte (à implémenter)
  });

  searchInput.addEventListener('input', () => {
    // Fonctionnalité pour la recherche (à implémenter)
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // Fonctionnalité pour trier par priorité (à implémenter)
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteCardBtn")) {
      const card = event.target.closest(".card");
      if (card) {
        card.remove();
      }
    }
  });
});
