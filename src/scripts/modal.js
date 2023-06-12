/* Desenvolva sua lógica aqui */

function showModal(){
    const button = document.querySelector(".header__button");
    const modalContainer = document.querySelector(".dialog__controller");
    const closeButton = document.querySelector(".header-dialog__button");

    button.addEventListener("click", () => {
        modalContainer.showModal();
    })

    closeButton.addEventListener("click", () => {
        modalContainer.close();
    });
}

showModal();