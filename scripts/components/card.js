export class Card {
  constructor(title, url, templateId, handleCardClick) {
    this._title = title;
    this._url = url;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
  }

  getCard() {
    const template = document.querySelector(this._templateId);
    if (!template) {
      throw new Error(`No se encontró el template con el selector: ${this._templateId}`);
    }

    const cardClone = template.content.cloneNode(true);
    const cardElement = cardClone.querySelector('.card');

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');

    titleElement.textContent = this._title?.trim() || 'Sin título';
    imageElement.src = this._url || 'img/default.jpg';
    imageElement.alt = this._title || 'Imagen sin título';

    if (typeof this._handleCardClick === 'function') {
      imageElement.addEventListener('click', () => {
        this._handleCardClick({ src: this._url, alt: this._title });
      });
    }

    return cardElement;
  }
}
