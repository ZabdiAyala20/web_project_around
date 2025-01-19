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

//funcion para agregar imagenes 

const templateContainer = document.querySelector('#form-images'); 
const container = document.querySelector('.images__add_form-container'); 
const openImagesButton = document.querySelector('.profile__add-button'); 
let formVisible = false;

// Evento para mostrar el formulario
openImagesButton.addEventListener('click', () => {
    if (!formVisible) {
        const clone = templateContainer.content.cloneNode(true); 
        container.appendChild(clone); 
        formVisible = true; 

        const instructions = document.querySelector('.instructions');
        instructions.setAttribute('hidden', true);
       
        const closeFormButton = container.querySelector('.close__add_button-images'); 
        const form = container.querySelector('.add__image-button-form');
        
        closeFormButton.addEventListener('click', () => {
            form.remove(); 
            formVisible = false; 
        });

       
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const titleInput = form.querySelector('input[name="titulo"]').value; // Obtener el título
            const urlInput = form.querySelector('input[name="url"]').value; // Obtener la URL de la imagen

           
            const cardTemplate = document.querySelector('#card__images'); 
            const cardClone = cardTemplate.content.cloneNode(true); 
            const cardTitle = cardClone.querySelector('.card__title'); 
            const cardImage = document.createElement('img'); 
            cardImage.className = 'card__image'; 
            cardImage.src = urlInput; 
            cardImage.alt = titleInput; 
            cardTitle.textContent = titleInput; 

       
            cardClone.querySelector('.card').prepend(cardImage);
            container.appendChild(cardClone); 

          
            form.remove(); 
            formVisible = false; 
        });
    }
});

