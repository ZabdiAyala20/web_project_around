export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.submitButton = formElement.querySelector(this.config.submitButtonSelector);
        this.inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
    }
    // Método privado para comprobar si el campo es válido
    #checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this.#showInputError(inputElement);
        } else {
            this.#showInputError(inputElement, inputElement.validationMessage);
        }
    }
    // Método privado para mostrar un error en el campo
    #showInputError(inputElement, errorMessage = '') {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
    }
    // Método privado para comprobar si el formulario es válido
    #toggleSubmitButton() {
        const hasInvalidInput = this.inputList.some(input => !input.validity.valid);
        this.submitButton.disabled = hasInvalidInput;
    }
    // Método privado para añadir los escuchadores de eventos a los campos
    #setEventListeners() {
        this.inputList.forEach(input => {
            input.addEventListener('input', (event) => {
                this.#checkInputValidity(event.target);
                this.#toggleSubmitButton();
            });
        });
    }
    // Método público para activar la validación del formulario
    enableValidation() {
        this.#setEventListeners();
    }
}