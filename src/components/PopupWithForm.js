// Класс для popup, содержащий формы ввода
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this._buttonSubmit = this._popupElement.querySelector('.popup__button-save');
        this._textButtonSubmit = this._buttonSubmit.textContent;
    }   

    // Метод для обработки данных полей формы
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }

    // Метод отображения загрузки данных
    renderLoad(isLoad, loadText = 'Сохранение...') {
        if (isLoad) {
            this._buttonSubmit.textContent = loadText;
        } else {
            this._buttonSubmit.textContent = this._textButtonSubmit;
        }
    }

    // Метод добавления слушателей
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._handleSubmitForm(this._getInputValues());
        });
    }

    // Метод закрытия popup
    close() {
        super.close();
        this._formElement.reset();
    }
}