// Класс для валидации форм

export default class FormValidate {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonSubmitElement = this._formElement.querySelector(
      this._config.buttonSubmitSelector
    );
  }

  // Метод добавления отображения ошибки input
  _showError(inputElement, errorElement) {
    errorElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Метод удаления отображения ошибки input
  _hideError(inputElement, errorElement) {
    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Метод проверки валидности формы
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    if (!isInputValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }

  // Метод очистки ошибок и управление кнопкой при валидности формы
  resetValidate() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      this._hideError(inputElement, errorElement);
    });
  }

  // Функция блокировки кнопки
  _disableButton() {
    this._buttonSubmitElement.disabled = true;
    this._buttonSubmitElement.classList.add(this._config.buttonInactiveClass);
  }

  // Функция активности кнопки
  _enableButton() {
    this._buttonSubmitElement.disabled = false;
    this._buttonSubmitElement.classList.remove(this._config.buttonInactiveClass);
  }

  // Функция переключения блокировки кнопки submit
  _toggleButtonState() {
    const isActive = this._formElement.checkValidity();

    if (!isActive) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // Функция установки слушателей
  _setEventListener() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (!this._formElement.checkValidity()) return;
    });

    this._toggleButtonState();
  }

  // Поиск и перебор всех форм
  enableValidation() {
    this._setEventListener();
  }
}
