
export class Card {
    constructor(form) {
        this.title = form.querySelector('input[name="titulo"]').value.trim();
        this.url = form.querySelector('input[name="url"]').value.trim();
    }
    agregarNuevaImagen(container) {
        const cardTemplate = document.querySelector('#card__images');
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector('.card__title').textContent = this.title || 'Título predeterminado';
        if (this.url) {
            const cardImage = cardClone.querySelector('.card__image');
            cardImage.src = this.url;
            cardImage.alt = this.title || 'Imagen sin título';
        }
        container.appendChild(cardClone);
    }
}

