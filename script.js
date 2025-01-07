console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");

  // Fonction pour ajouter un bouton "x" à chaque carte existante
  const addDeleteButtonToCards = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (!card.querySelector(".deleteCardBtn")) {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("deleteCardBtn");
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.background = "#e74c3c";
        deleteBtn.style.color = "#fff";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "3px";
        deleteBtn.style.padding = "5px";
        deleteBtn.style.cursor = "pointer";

        card.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
          card.remove(); 
        });
      }
    });
  };

  // Ajout des boutons "x" pour les cartes existantes au chargement
  addDeleteButtonToCards();

  // Exemple d'écouteurs pour d'autres fonctionnalités (si besoin)
  addCardBtn.addEventListener("click", () => {
    // Fonctionnalité pour ajouter une carte (à implémenter)
  });

  searchInput.addEventListener("input", () => {
    // Fonctionnalité pour la recherche (à implémenter)
  });

  sortByPriorityBtn.addEventListener("click", () => {
    // Fonctionnalité pour trier par priorité (à implémenter)
  });
});
