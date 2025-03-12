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
        const template = document.querySelector('#popup-template');
        const popupClone = template.content.cloneNode(true);
    
        popup.innerHTML = '';
        popup.appendChild(popupClone);
        popup.classList.add('popup_visible');


        const nameInput = popup.querySelector('input[name="name"]');
        const aboutInput = popup.querySelector('input[name="about"]');
        const saveButton = popup.querySelector('.popup__save-button');
    
        nameInput.value = profileName.textContent.trim();
        aboutInput.value = profileAbout.textContent.trim();
    
        // Llamamos a la función de validación (debes asegurarte de que está definida)
        validateForm(nameInput, aboutInput, saveButton);
    
        // Botón para cerrar el popup
        popup.querySelector('.popup__close-button').addEventListener('click', () => {
            popup.classList.remove('popup_visible');
            popup.innerHTML = '';
        });
    
        // Evento para guardar los cambios del formulario
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
                addNewImage(form);
                form.remove();
                formVisible = false;
            });
        }
    });

    // Función para agregar una nueva imagen (con Card)
    function addNewImage(form) {
        const titleInput = form.querySelector('input[name="titulo"]').value.trim();
        const urlInput = form.querySelector('input[name="url"]').value.trim();
        
        const card = new Card(titleInput, urlInput, '#card__images'); 
        const cardMarkup = card.getCard(); 
        container.prepend(cardMarkup); 
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