import { Popup } from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Se corrige el selector para obtener la imagen, no el contenedor.
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open({ src, alt }) {
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = alt;
    super.open();
  }
}

export default PopupWithImage;

