import { validateForm } from './formvalidator.js';

export function initializeProfileForm(profileName, profileAbout, popup) {
    const openFormButton = document.querySelector('.profile__edit-button');
    openFormButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        popup.innerHTML = `
            <div class="popup__container">
                <button class="popup__close-button">✖️</button>
                <form class="popup__form">
                    <h2 class="popup__title">Editar perfil</h2>
                    <input type="text" name="name" class="popup__input" placeholder="Nombre" minlength="2" maxlength="30">
                    <input type="text" name="about" class="popup__input" placeholder="Acerca de mí" minlength="2" maxlength="30">
                    <button type="submit" class="popup__save-button" disabled>Guardar</button>
                </form>
            </div>`;
        popup.classList.add('popup_visible');
        const nameInput = popup.querySelector('input[name="name"]');
        const aboutInput = popup.querySelector('input[name="about"]');
        const saveButton = popup.querySelector('.popup__save-button');
        nameInput.value = profileName.textContent.trim();
        aboutInput.value = profileAbout.textContent.trim();
        validateForm(nameInput, aboutInput, saveButton);
        popup.querySelector('.popup__close-button').addEventListener('click', () => {
            popup.classList.remove('popup_visible');
            popup.innerHTML = '';
        });
        popup.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault();
            profileName.textContent = nameInput.value;
            profileAbout.textContent = aboutInput.value;
            popup.classList.remove('popup_visible');
            popup.innerHTML = '';
        });
    });
}