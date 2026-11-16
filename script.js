
document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');

    if (!form) return;

    // Máscara para o CPF
    const cpfInput = form.querySelector('#cpf');

    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '').slice(0, 11);

            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            this.value = value;
        });
    }

    // Máscara para o telefone
    const telefoneInput = form.querySelector('#telefone');

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '').slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d+)/, '($1) $2');
            }

            this.value = value;
        });
    }

    // Máscara para o CEP
    const cepInput = form.querySelector('#cep');

    if (cepInput) {
        cepInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '').slice(0, 8);

            value = value.replace(/(\d{5})(\d)/, '$1-$2');

            this.value = value;
        });
    }

    // Configuração da validação do formulário
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

    // Exibição das mensagens de erro
    function showError(inputElement, message) {
        inputElement.style.borderColor = '#e53e3e';

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        inputElement.insertAdjacentElement('afterend', errorElement);
    }

    // Limpeza das mensagens de erro
    function clearAllErrors(formElement) {
        const existingErrors = formElement.querySelectorAll('.error-message');

        existingErrors.forEach(error => error.remove());

        const allInputs = formElement.querySelectorAll('[required]');

        allInputs.forEach(input => input.style.borderColor = '');
    }
});
