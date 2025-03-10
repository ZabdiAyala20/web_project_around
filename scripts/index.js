
import { Card } from './card.js';  

document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.querySelector('.profile__edit-button');
    const popup = document.querySelector('.popup');
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__about');
    const templateContainer = document.querySelector('#form-images');
    const container = document.querySelector('.images__add_form-container');
    const openImagesButton = document.querySelector('.profile__add-button');
    let formVisible = false;

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

    // Función para abrir el formulario de agregar imágenes
    openImagesButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (!formVisible) {
            const clone = templateContainer.content.cloneNode(true);
            container.appendChild(clone);
            formVisible = true;

            const form = container.querySelector('.add__image-button-form');
            const closeFormButton = container.querySelector('.close__add_button-images');

            closeFormButton.addEventListener('click', (evt) => {
                form.remove();
                formVisible = false;
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                agregarNuevaImagen(form);
                form.remove();
                formVisible = false;
            });
        }
    });

    // Función para agregar una nueva imagen (con Card)
    function agregarNuevaImagen(form) {
        const titleInput = form.querySelector('input[name="titulo"]').value.trim();
        const urlInput = form.querySelector('input[name="url"]').value.trim();
        
        const card = new Card(titleInput, urlInput, '#card__images'); 
        const cardMarkup = card.getCard(); // Obtén la tarjeta ya preparada
        container.appendChild(cardMarkup); 
    }

    // Función para eliminar una tarjeta con botón de basura
    document.addEventListener('click', (event) => {
        if (event.target.closest('.trash__button-image')) {
            event.target.closest('.card').remove();
        }
    });

    // Función para cerrar con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.classList.contains('popup_visible')) {
            popup.classList.remove('popup_visible');
            popup.innerHTML = '';
        }
    });

    const imagenesIniciales = [
        './images/rural_noche.jpg',
        './images/mar.jpg',
        './images/campo_amarillo.jpg',
        './images/pueblo_rural.jpg',
        './images/pueblo_de_agua.jpg'
    ];

    imagenesIniciales.forEach((src) => {
        const card = new Card('Título predeterminado', src, '#card__images');
        const cardMarkup = card.getCard();
        container.appendChild(cardMarkup); 
    });


    document.addEventListener('click', (event) => {
        if (event.target.closest('.card__like-button')) {
            event.target.closest('.card__like-button').classList.toggle('liked');
        }
    });
});


