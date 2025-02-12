    function validateForm(nameInput, aboutInput, saveButton) {
    const checkInputs = () => {
        const isDisabled = nameInput.value.trim().length < 2 || aboutInput.value.trim().length < 2;
        saveButton.disabled = isDisabled;
    };

    nameInput.addEventListener('input', checkInputs);
    aboutInput.addEventListener('input', checkInputs);

    checkInputs();
}
