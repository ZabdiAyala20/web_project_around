  // PopupWithConfirmation.js
  import {Popup} from './popup.js';
  
  export  class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
      super(popupSelector);
      this._handleConfirm = handleConfirm;
      this._confirmButton = this._popup.querySelector('.popup__confirm-button');
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._confirmButton.addEventListener('click', () => {
        this._handleConfirm();
      });
    }
  
    open(cardId) {
      super.open();
      this._cardId = cardId;
    }
  
    close() {
      super.close();
      this._cardId = null;
    }
  }
  