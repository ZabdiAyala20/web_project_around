import { Card } from './components/card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import Popup from "./Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";

document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.querySelector('.profile__edit-button');
    const popup = document.querySelector('.popup');
    const popupOverlay = document.querySelector('.popup__overlay'); 
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__about');
    const templateContainer = document.querySelector('#form-images');
    const container = document.querySelector('.images__add_form-container');
    const openImagesButton = document.querySelector('.profile__add-button');
    let formVisible = false;

    // 🔹 Instancia del popup de imágenes
    const imagePopup = new PopupWithImage('.popup_type_image');

    function handleCardClick(url, title) {
        imagePopup.open({ src: url, alt: title });
    }

    function openPopup() {
        const popupTemplate = document.querySelector('#popup-template').content.cloneNode(true);
        popup.innerHTML = ''; 
        popup.appendChild(popupTemplate);
        popup.classList.add('popup_visible');
        popupOverlay.style.display = 'block'; 

        const nameInput = popup.querySelector('input[name="name"]');
        const aboutInput = popup.querySelector('input[name="about"]');
        const saveButton = popup.querySelector('.popup__save-button');

        nameInput.value = profileName.textContent.trim();
        aboutInput.value = profileAbout.textContent.trim();

        const form = popup.querySelector('.popup__form');
        const validator = new FormValidator({
            inputSelector: 'input',
            submitButtonSelector: '.popup__save-button'
        }, form);
        
        validator.enableValidation();

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            profileName.textContent = nameInput.value;
            profileAbout.textContent = aboutInput.value;
            closePopup();
        });
    }

    function closePopup() {
        popup.classList.remove('popup_visible');
        popupOverlay.style.display = 'none'; 
        popup.innerHTML = ''; 
    }

    openFormButton.addEventListener('click', (event) => {
        event.preventDefault();
        openPopup();
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__overlay')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.classList.contains('popup_visible')) {
            closePopup();
        }
    });

    openImagesButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (!formVisible) {
            const clone = templateContainer.content.cloneNode(true);
            container.appendChild(clone);
            formVisible = true;

            const form = container.querySelector('.add__image-button-form');
            const closeFormButton = form.querySelector('.close__add_button-images');

            closeFormButton.addEventListener('click', () => {
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

    function addNewImage(form) {
        const titleInput = form.querySelector('input[name="titulo"]').value.trim();
        const urlInput = form.querySelector('input[name="url"]').value.trim();
        
        if (titleInput === '' || urlInput === '') {
            alert("Los campos no pueden estar vacíos.");
            return;
        }

        const card = new Card(titleInput, urlInput, '#card__images', handleCardClick);
        const cardMarkup = card.getCard();
        document.querySelector('.content').prepend(cardMarkup);
    }

    // 🔹 Array de imágenes iniciales con títulos
    const initialImages = [
        { title: "Rural de noche", url: './images/rural_noche.jpg' },
        { title: "Mar", url: './images/mar.jpg' },
        { title: "Campo amarillo", url: './images/campo_amarillo.jpg' },
        { title: "Pueblo rural", url: './images/pueblo_rural.jpg' },
        { title: "Pueblo de agua", url: './images/pueblo_de_agua.jpg' }
    ];

    initialImages.forEach(({ title, url }) => {
        const card = new Card(title, url, '#card__images', handleCardClick);
        const cardMarkup = card.getCard();
        document.querySelector('.images__add_form-container').appendChild(cardMarkup);
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('.trash__button-image')) {
            event.target.closest('.card').remove();
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('.card__like-button')) {
            event.target.closest('.card__like-button').classList.toggle('liked');
        }
    });
});