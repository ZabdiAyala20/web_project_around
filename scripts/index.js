import { Card } from './components/card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { Popup } from './components/popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b3c28384-40c7-4662-9598-a18e9b848d0e",
    "Content-Type": "application/json"
  }
});

const deletedCardIds = JSON.parse(localStorage.getItem('deletedCardIds')) || [];

function guardarTarjetaLocalmente(id) {
  if (!deletedCardIds.includes(id)) {
    deletedCardIds.push(id);
    localStorage.setItem('deletedCardIds', JSON.stringify(deletedCardIds));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
  });

  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');

  const savedProfile = JSON.parse(localStorage.getItem('profileData'));

  if (savedProfile) {
    userInfo.setUserInfo({
      name: savedProfile.name,
      about: savedProfile.about,
      avatar: ''
    });
  } else {
    api.getUserInfo()
      .then(userData => {
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar
        });
        localStorage.setItem('profileData', JSON.stringify({
          name: userData.name,
          about: userData.about
        }));
      })
      .catch(err => console.error("Error al cargar los datos del usuario:", err));
  }

  const popupWithImage = new PopupWithImage('.popup_type_image');
  popupWithImage.setEventListeners();

  function handleCardClick({ src, alt }) {
    popupWithImage.open({ src, alt });
  }

  function handleDelete(cardElement, cardId) {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(() => {
        console.warn("No se pudo eliminar del servidor, guardando localmente.");
        guardarTarjetaLocalmente(cardId);
        cardElement.remove();
      });
  }

  function createCard(title, url, templateId = '#card__images', cardId = null) {
    const card = new Card(
      title,
      url,
      templateId,
      handleCardClick,
      cardId,
      handleDelete
    );
    return card.getCard();
  }

  const section = new Section({
    renderer: (item) => {
      const card = createCard(item.name, item.link, '#card__images', item._id);
      section.addItem(card);
    }
  }, '.cards__list');

  // Renderizar tarjetas solo si no están en localStorage
  api.getInitialCards()
    .then(cards => {
      const tarjetasFiltradas = cards.filter(card => !deletedCardIds.includes(card._id));
      section.renderItems(tarjetasFiltradas);
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

  // Popup Editar Perfil
  const openFormButton = document.querySelector('.profile__edit-button');

  function openPopup() {
    const popup = document.querySelector('.popup_type_edit');
    const popupOverlay = popup.querySelector('.popup__overlay');
    const nameInput = popup.querySelector('input[name="name"]');
    const aboutInput = popup.querySelector('input[name="about"]');
    const form = popup.querySelector('.popup__form');

    nameInput.value = profileName.textContent.trim();
    aboutInput.value = profileAbout.textContent.trim();

    popup.classList.add('popup_opened');
    popupOverlay.style.display = 'block';

    const validator = new FormValidator({
      inputSelector: 'input',
      submitButtonSelector: '.popup__save-button'
    }, form);
    validator.enableValidation();

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const about = aboutInput.value.trim();

      profileName.textContent = name;
      profileAbout.textContent = about;

      localStorage.setItem('profileData', JSON.stringify({ name, about }));
      closePopup(popup);
    }, { once: true });
  }

  function closePopup(popup) {
    const overlay = popup.querySelector('.popup__overlay');
    popup.classList.remove('popup_opened');
    overlay.style.display = 'none';
  }

  openFormButton.addEventListener('click', openPopup);

  document.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup__close-button') ||
      event.target.classList.contains('popup__overlay')
    ) {
      const popup = event.target.closest('.popup');
      if (popup) closePopup(popup);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      if (popup) closePopup(popup);
    }
  });

  // Formulario agregar imagen
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
            const card = createCard(newCardData.name, newCardData.link, '#card__images', newCardData._id);
            section.addItem(card);
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

  // Botón like
  document.addEventListener('click', (event) => {
    if (event.target.closest('.card__like-button')) {
      event.target.closest('.card__like-button').classList.toggle('liked');
    }
  });
});
