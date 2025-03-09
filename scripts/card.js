// card.js
export class Card {
    constructor(title, imageUrl, cardTemplateSelector) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.cardTemplateSelector = cardTemplateSelector;
    }


    #getCardMarkup() {
        const cardTemplate = document.querySelector(this.cardTemplateSelector);
        const cardClone = cardTemplate.content.cloneNode(true);
        const cardTitle = cardClone.querySelector('.card__title');
        const cardImage = cardClone.querySelector('.card__image');
        
        cardTitle.textContent = this.title || 'Título predeterminado';
        cardImage.src = this.imageUrl || './images/default.jpg';
        cardImage.alt = this.title || 'Imagen sin título';

        return cardClone;
    }

    // Método privado para manejar el evento de like
    #handleLikeButtonClick(event) {
        event.target.classList.toggle('liked');
    }

    // Método privado para manejar el evento de eliminación
    #handleDeleteButtonClick(event) {
        event.target.closest('.card').remove();
    }

    // Método público para devolver una tarjeta completamente funcional
    getCard() {
        const cardMarkup = this.#getCardMarkup();
        const likeButton = cardMarkup.querySelector('.card__like-button');
        const deleteButton = cardMarkup.querySelector('.trash__button-image');

        // Añadir listeners de eventos
        likeButton.addEventListener('click', this.#handleLikeButtonClick);
        deleteButton.addEventListener('click', this.#handleDeleteButtonClick);

        return cardMarkup;
    }
}




