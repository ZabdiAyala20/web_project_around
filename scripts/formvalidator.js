export class FormValidator {
    constructor(nameInput, aboutInput, saveButton) {
        this.nameInput = nameInput;
        this.aboutInput = aboutInput;
        this.saveButton = saveButton;
    }

    validateForm() {
        const checkInputs = () => {
            const isDisabled = this.nameInput.value.trim().length < 2 || this.aboutInput.value.trim().length < 2;
            this.saveButton.disabled = isDisabled;
        };

        this.nameInput.addEventListener('input', checkInputs);
        this.aboutInput.addEventListener('input', checkInputs);
        checkInputs(); // Llamamos la función al inicio para validar el estado inicial
    }
}

