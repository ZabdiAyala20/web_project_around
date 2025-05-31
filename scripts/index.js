import { Card } from './components/card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { Popup } from './components/popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
  });

  const editPopup = document.querySelector('.popup_type_edit');
  const editButton = document.querySelector('.profile__edit-button');

  editButton.addEventListener('click', () => {
    editPopup.classList.add('popup_opened');
  });

  const popupWithImage = new PopupWithImage('.popup_type_image');
  popupWithImage.setEventListeners();

  function handleCardClick({ src, alt }) {
    popupWithImage.open({ src, alt });
  }

  function createCard(title, url, templateId = '#card__images') {
    const card = new Card(title, url, templateId, handleCardClick);
    return card.getCard();
  }

  const section = new Section({
    renderer: (item) => {
      const card = createCard(item.name, item.link, '#card__images');
      section.addItem(card);
    }
  }, '.cards__list');

  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    headers: {
      authorization: "b3c28384-40c7-4662-9598-a18e9b848d0e"
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(cards => {
      section.renderItems(cards);
    })
    .catch(err => console.error(err));

  const localSection = new Section({
    items: [
      { title: "Rural de noche", url: '../images/rural_noche.jpg' },
      { title: "Mar", url: '../images/mar.jpg' },
      { title: "Campo amarillo", url: '../images/campo_amarillo.jpg' },
      { title: "Pueblo rural", url: '../images/pueblo_rural.jpg' },
      { title: "Pueblo de agua", url: '../images/pueblo_de_agua.jpg' }
    ],
    renderer: ({ title, url }) => {
      const card = createCard(title, url);
      localSection.addItem(card);
    }
  }, '.images__add_form-container');

  localSection.renderItems();

  // FORMULARIO DE PERFIL
  const openFormButton = document.querySelector('.profile__edit-button');
  const popup = document.querySelector('.popup');
  const popupOverlay = document.querySelector('.popup__overlay');
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');

  function openPopup() {
    const popupTemplate = document.querySelector('#popup-template').content.cloneNode(true);
    popup.innerHTML = '';
    popup.appendChild(popupTemplate);
    popup.classList.add('popup_visible');
    popupOverlay.style.display = 'block';

    const nameInput = popup.querySelector('input[name="name"]');
    const aboutInput = popup.querySelector('input[name="about"]');

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

  openFormButton.addEventListener('click', openPopup);

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

  // FORMULARIO PARA AÑADIR IMAGEN
  const openImagesButton = document.querySelector('.profile__add-button');
  const templateContainer = document.querySelector('#form-images');
  const container = document.querySelector('.images__add_form-container');
  let formVisible = false;

  openImagesButton.addEventListener('click', () => {
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
        const titleInput = form.querySelector('input[name="titulo"]').value.trim();
        const urlInput = form.querySelector('input[name="url"]').value.trim();

        if (!titleInput || !urlInput) {
          alert("Los campos no pueden estar vacíos.");
          return;
        }

        api.addCard({ name: titleInput, link: urlInput })
          .then((newCardData) => {
            const card = createCard(newCardData.name, newCardData.link);
            localSection.addItem(card);
            form.remove();
            formVisible = false;
          })
          .catch((err) => {
            console.error("Error al guardar la tarjeta en el servidor:", err);
            alert("Ocurrió un error al guardar la tarjeta. Intenta de nuevo.");
          });
      });
    }
  });

  // ELIMINAR IMAGEN
  document.addEventListener('click', (event) => {
    if (event.target.closest('.trash__button-image')) {
      event.target.closest('.card').remove();
    }
  });

  // LIKE
  document.addEventListener('click', (event) => {
    if (event.target.closest('.card__like-button')) {
      event.target.closest('.card__like-button').classList.toggle('liked');
    }
  });
});

// MINIATURAS
document.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.thumb');
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popupImg');
  const popupText = document.getElementById('popupText');
  const closeBtn = document.getElementById('closeBtn');

  thumbnails.forEach(img => {
    img.addEventListener('click', () => {
      popupImg.src = img.src;
      popupText.textContent = img.alt;
      popup.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  console.log('Página cargada y lista para interactuar.');
});
