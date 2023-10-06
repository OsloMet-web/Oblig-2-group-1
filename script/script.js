
//Modal
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal]");

openButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].showModal();
  });
});

closeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].close();
  });
});

modals.forEach(modal => {
  modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
});



/*❗
  Create logic to read filesystem.txt file to get content 
*/
/*❗
  Create logic to put content inside of id output in same format as example article
*/
