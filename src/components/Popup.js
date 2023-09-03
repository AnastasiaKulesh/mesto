export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // Метод закрытия popup через Esc
    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    // Метод закрытия popup
    close() {
        this._popupElement.classList.remove("popup_opened");
        
        // Снятие слушателя для закрытия popup через Esc
        document.removeEventListener("keydown", this._handleEscClose);
    }

    // Метод открытия popup
    open() {
        this._popupElement.classList.add("popup_opened");

        // Добавление слушателя для закрытия popup через Esc
        document.addEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__button-close")) {
                this.close();
            }
        });
    }
}