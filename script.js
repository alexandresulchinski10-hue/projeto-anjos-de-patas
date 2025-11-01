document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    
    if (!form) return;

    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isFormValid = true;
        const allRequiredInputs = form.querySelectorAll('[required]');

        clearAllErrors(form);

        allRequiredInputs.forEach(input => {
            if (!input.checkValidity()) {
                isFormValid = false;
                showError(input, input.validationMessage);
            } else {
                input.style.borderColor = '#48bb78';
            }
        });

        if (isFormValid) {
            console.log('Formulário válido! Enviando...');
            window.location.href = '#feedback-modal';
        } else {
            console.log('Formulário com erros. Corrija os campos destacados.');
        }
    });

    function showError(inputElement, message) {
        inputElement.style.borderColor = '#e53e3e';

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        inputElement.insertAdjacentElement('afterend', errorElement);
    }

    function clearAllErrors(formElement) {
        const existingErrors = formElement.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        const allInputs = formElement.querySelectorAll('[required]');
        allInputs.forEach(input => input.style.borderColor = '');
    }
});