export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.submitButton = formElement.querySelector(this.config.submitButtonSelector);
        this.inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
    }
    // Método privado para comprobar si el campo es válido
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._showInputError(inputElement, '');
        }
        
    }
    // Método privado para mostrar un error en el campo
    _showInputError(inputElement, errorMessage = '') {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }
    }
    
    // Método privado para comprobar si el formulario es válido
    _toggleSubmitButton() {
        const hasInvalidInput = this.inputList.some(input => !input.validity.valid);
        if (this.submitButton) {
            this.submitButton.disabled = hasInvalidInput;
        }
    }
    
    // Método privado para añadir los escuchadores de eventos a los campos
    _setEventListeners() {
        this.inputList.forEach(input => {
            input.addEventListener('input', (event) => {
                this._checkInputValidity(event.target);
                this._toggleSubmitButton();
            });
        });
    }
    // Método público para activar la validación del formulario
    enableValidation() {
        this._setEventListeners();
    }
}