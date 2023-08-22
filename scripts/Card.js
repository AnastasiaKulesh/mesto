// Класс создания карточки с текстом и ссылкой на изображение
export class Card {
  constructor(data, openPopup, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._openPopup = openPopup;
    this._templateSelector = templateSelector;
  }
  
  
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardTemplate;
  }
  

  // Метод удаления карточки
  _deleteCard() {
    this._cardCloneTemplate.remove();
  }

  // Метод добавления лайка
  _toggleLike() {
      this._likeButtonElement.classList.toggle('card__button-like_active');
    }

  // Метод открытия popup с фотографией карточки
  _openCardPopup() {
    popupImageElementPhoto.src = this._link;
    popupImageElementPhoto.alt = this._name;
    popupImageNameElement.textContent = this._name;
    this._openPopup(popupImage);
  }

  // Метод создания карточки
  createCard() {
    this._cardCloneTemplate = this._getTemplate();
    //this._cardElement = _cardCloneTemplate.querySelector('.card');
    this._nameElement = this._cardCloneTemplate.querySelector('.card__name');
    this._linkElement =  this._cardCloneTemplate.querySelector('.card__image');
    this._likeButtonElement =  this._cardCloneTemplate.querySelector('.card__button-like');
    this._buttonDeleteElement =  this._cardCloneTemplate.querySelector('.card__button-trash');
  
    this._nameElement.textContent = this._name;
    this._linkElement.src = this._link;
    this._linkElement.alt = this._name;
  
    // Слушатель кнопки лайка
    this._likeButtonElement.addEventListener('click', () => this._toggleLike());

    // Слушатель кнопки удаления карточки
    this._buttonDeleteElement.addEventListener('click', () => this._deleteCard());
  
    // Слушатель кнопки открытия popup с фотографией карточки
    this._linkElement.addEventListener('click', () => this._openCardPopup());
  
    return  this._cardCloneTemplate;
  }
}