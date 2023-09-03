// Класс для popup, содержащий только кнопку подтверждения

import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._buttonSubmit = this._popupElement.querySelector('.popup__button-save');
        this._textButtonSubmit = this._buttonSubmit.textContent;
        this._handleSubmit;
    }

    handleFormSubmit(func) {
        this._handleSubmit = func;
    }

    // Метод отображения загрузки данных
    renderLoad(isLoad, loadText = 'Сохранение...') {
        if (isLoad) {
            this._buttonSubmit.textContent = loadText;
        } else {
            this._buttonSubmit.textContent = this._textButtonSubmit;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleSubmit();
        });
    }
}