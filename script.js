document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const columns = document.querySelectorAll(".column");

  cards.forEach(card => {
    card.setAttribute("draggable", true);

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.dataset.id);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  columns.forEach(column => {
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
});
