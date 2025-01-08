console.log("Kanban JS loaded...");
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

  // Rendre toutes les cartes existantes déplaçables
  document.querySelectorAll(".card").forEach(makeCardDraggable);

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
    });
  });

  

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
    return card;
  }

  function resetModalInputs() {
    document.getElementById("cardTitle").value = "";
    document.getElementById("cardContent").value = "";
    document.getElementById("cardPriority").value = "low";
    document.getElementById("cardPosition").value = "last";
  }

  searchInput.addEventListener("input", () => {
    // fonction de recherche à implémenter
  });

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

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    var rows = document.querySelectorAll(".card");

    rows.forEach(function (row) {
      var heading = row.querySelector("h3");
      var content = row.querySelector("p");
      if (heading || content) {
        var text = heading.textContent.toLowerCase();
        var textContent = content.textContent.toLowerCase();
        if (text.includes(filter)||textContent.includes(filter)) {
          row.style.display = ""; 
        } else {
          row.style.display = "none";
        }
      }
    });
  });

    

  sortByPriorityBtn.addEventListener('click', () => {
    // ...
  });
});
