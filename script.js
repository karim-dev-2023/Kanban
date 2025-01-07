console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");

  // Éventuellement, on écoute les événements
  addCardBtn.addEventListener("click", () => {
    // ...
  });

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

  sortByPriorityBtn.addEventListener("click", () => {
    // ...
  });
});
