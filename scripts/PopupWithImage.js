import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._popupImage = this._popupElement.querySelector(".popup-image__image");
        this._PopupImageName = this._popupElement.querySelector(".popup-image__name");
    }

    open( linkElement, nameElement) {
        this._popupImage.src = linkElement;
        this._popupImage.alt = nameElement;
        this._PopupImageName.textContent = nameElement;
        super.open();
    }
}