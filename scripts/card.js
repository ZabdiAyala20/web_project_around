
export class Card {
    constructor(title, url, templateId) {
        this.title = title;
        this.url = url;
        this.templateId = templateId;
    }

    getCard() {
        const cardTemplate = document.querySelector(this.templateId);
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector('.card__title').textContent = this.title || 'Título predeterminado';
        if (this.url) {
            const cardImage = cardClone.querySelector('.card__image');
            cardImage.src = this.url;
            cardImage.alt = this.title || 'Imagen sin título';
        }
        return cardClone;
    }
}




