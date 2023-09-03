// Класс для popup, содержащий только кнопку подтверждения

import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleSubmit;
    }

    handleFormSubmit(func) {
        this._handleSubmit = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleSubmit();
        });
    }
}