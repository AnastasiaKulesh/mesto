const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    buttonSubmitSelector: ".popup__button-save",
    buttonInactiveClass: "popup__button-save_disabled",
    inputErrorClass: "popup__error_enabled",
};




// Функция добавления отображения ошибки input
function showError(inputElement, errorElement, config) {
    errorElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Функция удаления отображения ошибки input
function hideError(inputElement, errorElement, config) {
    errorElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Функция проверки валидности формы
function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }
}

// Функция блокировки кнопки 
function disableButton(buttonElement, config) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.buttonInactiveClass);
}

// Функция активности кнопки
function enableButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.buttonInactiveClass);
}

// Функция переключения блокировки кнопки submit
function toggleButtonState(buttonElement, isActive, config) {
    if (!isActive) {
        disableButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}

// Функция установки слушателей
function setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonSubmitElement = formElement.querySelector(config.buttonSubmitSelector);

    toggleButtonState(buttonSubmitElement, formElement.checkValidity(), config);

    [...inputList].forEach(function(inputElement) {
        console.log('inputElement.validity: ', inputElement.validity);
        inputElement.addEventListener('input', function() {
            toggleButtonState(buttonSubmitElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        })
    })

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!formElement.checkValidity()) return;
        
        console.log('Форма отправлена');
    })
}

// Поиск и перебор всех форм
function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);

    [...formsList].forEach(function (formElement) {
      setEventListener(formElement, config);
    });
};




// Вызов формы
enableValidation(config);