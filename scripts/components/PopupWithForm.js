import Popup from "../components/popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector("form");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const inputs = [...this._form.querySelectorAll("input")];
        const formValues = {};
        inputs.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setInputValues(data) {
        const inputs = [...this._form.querySelectorAll("input")];
        inputs.forEach(input => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
