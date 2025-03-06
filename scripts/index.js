
import { Card } from './card.js';
import { initializeProfileForm } from './utils.js';
import { FormValidator } from '..scripts/formvalidator.js';

document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__about');
    const popup = document.querySelector('.popup');
    const container = document.querySelector('.images__add_form-container');
    
    initializeProfileForm(profileName, profileAbout, popup);

    const imagenesIniciales = [
        './images/rural_noche.jpg',
        './images/mar.jpg',
        './images/campo_amarillo.jpg',
        './images/pueblo_rural.jpg',
        './images/pueblo_de_agua.jpg'
    ];
    
    imagenesIniciales.forEach((src) => {
        const cardTemplate = document.querySelector('#card__images');
        const cardClone = cardTemplate.content.cloneNode(true);
        const cardImage = cardClone.querySelector('.card__image');
        cardImage.src = src;
        cardImage.alt = 'Imagen predeterminada';
        container.appendChild(cardClone);
    });

    // Agregar imagen desde formulario
    const form = document.querySelector('#form__add_image');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nuevaCard = new Card(form);
        nuevaCard.agregarNuevaImagen(container);
        form.reset();
    });
   
});
