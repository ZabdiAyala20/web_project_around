const openFormButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formContainer = document.createElement('div');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const likeButtons = document.querySelectorAll('.card__like-button');

openFormButton.addEventListener('click', () => {
    formContainer.innerHTML = `
        <div class="popup__container">
            <button class="popup__close-button">✖️</button>
            <form class="popup__form">
                <h2 class="popup__title">Editar perfil</h2>
                <input type="text" name="name" class="popup__input" placeholder="Nombre">
                <input type="text" name="about" class="popup__input" placeholder="Acerca de mí">
                <button type="submit" class="popup__save-button" disabled>Guardar</button>
            </form>
        </div>
    `;
    popup.appendChild(formContainer);
    formContainer.querySelector('input[name="name"]').value = profileName.textContent.trim();
    formContainer.querySelector('input[name="about"]').value = profileAbout.textContent.trim();
    const nameInput = formContainer.querySelector('input[name="name"]');
    const aboutInput = formContainer.querySelector('input[name="about"]');
    const saveButton = formContainer.querySelector('.popup__save-button');

    const checkInputs = () => {
        if (nameInput.value.trim() && aboutInput.value.trim()) {
            saveButton.disabled = false;
        } else {
            saveButton.disabled = true;
        }
    };
    nameInput.addEventListener('input', checkInputs);
    aboutInput.addEventListener('input', checkInputs);

    popup.classList.add('popup_visible');
});

popup.addEventListener('click', (event) => {
    if (event.target === formContainer.querySelector('.popup__close-button')) {
        popup.classList.remove('popup_visible');
        formContainer.innerHTML = '';
    }
});

popup.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = formContainer.querySelector('input[name="name"]');
    const aboutInput = formContainer.querySelector('input[name="about"]');

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    popup.classList.remove('popup_visible');
    formContainer.innerHTML = '';
});

const templateContainer = document.querySelector('#form-images');
const container = document.querySelector('.images__add_form-container');
const openImagesButton = document.querySelector('.profile__add-button');

let formVisible = false;

openImagesButton.addEventListener('click', () => {
    if (!formVisible) {
        const clone = templateContainer.content.cloneNode(true);
        container.appendChild(clone);
        formVisible = true;

        const form = container.querySelector('.add__image-button-form');
        const closeFormButton = container.querySelector('.close__add_button-images');

        closeFormButton.addEventListener('click', () => {
            form.remove();
            formVisible = false;
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const titleInput = form.querySelector('input[name="titulo"]').value.trim();
            const urlInput = form.querySelector('input[name="url"]').value.trim();

            const cardTemplate = document.querySelector('#card__images');
            const cardClone = cardTemplate.content.cloneNode(true);

            cardClone.querySelector('.card__title').textContent = titleInput || 'Título predeterminado';

            if (urlInput) {
                const cardImage = cardClone.querySelector('.card__image');
                cardImage.src = urlInput;
                cardImage.alt = titleInput || 'Imagen sin título';
            }

            container.appendChild(cardClone);
            form.remove();
            formVisible = false;
        });
    }
});

document.addEventListener('click', (event) => {
    if (event.target.closest('.trash__button-image')) {
        const card = event.target.closest('.card');
        if (card) {
            card.remove();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.images__add_form-container');
    const cardTemplate = document.querySelector('#card__images');
    const cardClone = cardTemplate.content.cloneNode(true);
    cardClone.querySelector('.card__title').textContent = 'Imagen de inicio';
    const cardImage = cardClone.querySelector('.card__image');
    cardImage.src = './images/rural_noche.jpg';
    cardImage.alt = 'Imagen predeterminada';
    container.appendChild(cardClone);
});


document.addEventListener('click', (event) => {
    if (event.target.closest('.card__like-button')) {
        const likeButton = event.target.closest('.card__like-button');
        likeButton.classList.toggle('liked');
    }
});

