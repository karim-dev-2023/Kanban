document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".column");
  let cardId = 5; // Commencer à 5 car nous avons déjà 4 cartes dans l'HTML

  // Fonction pour rendre une carte déplaçable
  function makeCardDraggable(card) {
    card.setAttribute("draggable", true);

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.id);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  }

  // Fonction pour ajouter un bouton de suppression à une carte
  function addDeleteButton(card) {
    if (!card.querySelector(".deleteCardBtn")) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.classList.add("deleteCardBtn");

      // Ajouter un gestionnaire d'événement pour supprimer la carte
      deleteBtn.addEventListener("click", () => {
        card.remove();
        saveToLocalStorage(); // Sauvegarder l'état après suppression
      });

      card.appendChild(deleteBtn); // Ajouter le bouton à la carte
    }
  }

  // Rendre toutes les cartes existantes déplaçables et leur ajouter un bouton "x"
  document.querySelectorAll(".card").forEach((card) => {
    makeCardDraggable(card);
    addDeleteButton(card);
  });

  // Configuration des colonnes pour le drop
  columns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    column.addEventListener("drop", (event) => {
      event.preventDefault();
      const cardId = event.dataTransfer.getData("text/plain");
      const card = document.querySelector(`.card[data-id='${cardId}']`);
      const newStatus = column.getAttribute("data-status");
      column.appendChild(card);
      card.dataset.status = newStatus;
      saveToLocalStorage(); // Sauvegarder l'état après déplacement
    });
  });

  console.log("Kanban JS loaded...");

  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const modal = document.getElementById("addCardModal");
  const closeModal = document.getElementById("closeModal");
  const submitCard = document.getElementById("submitCard");

  if (!addCardBtn || !modal || !closeModal || !submitCard) {
    console.error("Un ou plusieurs éléments HTML manquants");
    return;
  }

  addCardBtn.addEventListener("click", () => {
    console.log("Bouton 'Ajouter une carte' cliqué");
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    console.log("Fermeture du modal");
    modal.style.display = "none";
  });

  // Fermer la modale si on clique en dehors
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      console.log("Clique en dehors de la modale, fermeture.");
      modal.style.display = "none";
    }
  });

  submitCard.addEventListener("click", () => {
    console.log("Bouton 'Ajouter' cliqué");
    const title = document.getElementById("cardTitle").value;
    const content = document.getElementById("cardContent").value;
    const priority = document.getElementById("cardPriority").value;
    const position = document.getElementById("cardPosition").value;

    console.log("Valeurs saisies:", { title, content, priority, position });

    if (title && content) {
      const newCard = createCard(title, content, priority);
      const todoColumn = document.querySelector('.column[data-status="todo"]');

      if (!todoColumn) {
        console.error("Colonne 'To Do' non trouvée");
        return;
      }

      const existingCards = todoColumn.querySelectorAll(".card");

      // Ajouter la carte selon la position choisie
      if (existingCards.length === 0) {
        // S'il n'y a pas de cartes existantes, ajouter simplement à la fin
        todoColumn.appendChild(newCard);
      } else {
        switch (position) {
          case "first":
            todoColumn.insertBefore(newCard, existingCards[0]);
            break;
          case "last":
            todoColumn.appendChild(newCard);
            break;
          case "middle":
            const middleIndex = Math.floor(existingCards.length / 2);
            todoColumn.insertBefore(newCard, existingCards[middleIndex]);
            break;
        }
      }

      console.log("Nouvelle carte ajoutée");
      modal.style.display = "none";
      resetModalInputs();
      saveToLocalStorage(); // Sauvegarder l'état après ajout
    } else {
      console.log("Titre ou contenu manquant");
    }
  });

  function createCard(title, content, priority) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = cardId++;
    card.dataset.priority = priority;
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
    `;
    makeCardDraggable(card); // Rendre la nouvelle carte déplaçable
    addDeleteButton(card);   // Ajouter le bouton "x" pour supprimer la carte
    return card;
  }

  function resetModalInputs() {
    document.getElementById("cardTitle").value = "";
    document.getElementById("cardContent").value = "";
    document.getElementById("cardPriority").value = "low";
    document.getElementById("cardPosition").value = "last";
  }

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    document.querySelectorAll(".card").forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const content = card.querySelector("p").textContent.toLowerCase();
      if (title.includes(searchValue) || content.includes(searchValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Fonction pour trier les cartes par priorité
  sortByPriorityBtn.addEventListener("click", () => {
    columns.forEach((column) => {
      const cards = Array.from(column.querySelectorAll(".card"));
      cards.sort((a, b) => {
        const priorities = { low: 1, medium: 2, high: 3 };
        return priorities[b.dataset.priority] - priorities[a.dataset.priority];
      });
      cards.forEach((card) => column.appendChild(card));
    });
    saveToLocalStorage(); // Sauvegarder après tri
  });

  // Fonction pour sauvegarder l'état dans localStorage
  function saveToLocalStorage() {
    const columns = document.querySelectorAll(".column");
    const kanbanData = [];

    columns.forEach((column) => {
      const columnStatus = column.getAttribute("data-status");
      const cards = column.querySelectorAll(".card");

      const columnCards = Array.from(cards).map((card) => ({
        id: card.dataset.id,
        title: card.querySelector("h3").textContent,
        content: card.querySelector("p").textContent,
        priority: card.dataset.priority,
        status: columnStatus,
      }));

      kanbanData.push(...columnCards);
    });

    localStorage.setItem("kanbanData", JSON.stringify(kanbanData));
  }

  // Fonction pour restaurer l'état depuis localStorage
  function loadFromLocalStorage() {
    const kanbanData = JSON.parse(localStorage.getItem("kanbanData"));

    if (kanbanData) {
      // Réinitialiser les colonnes pour éviter les doublons
      document.querySelectorAll(".column").forEach((column) => {
        column.querySelectorAll(".card").forEach((card) => card.remove());
      });

      kanbanData.forEach((cardData) => {
        const column = document.querySelector(`.column[data-status="${cardData.status}"]`);
        const card = createCard(cardData.title, cardData.content, cardData.priority);
        card.dataset.id = cardData.id;
        column.appendChild(card);
      });
    }
  }

  loadFromLocalStorage();
});
