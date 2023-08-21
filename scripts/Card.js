import { openPopup } from './index.js';

// Класс создания карточки с текстом и ссылкой на изображение
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardTemplate;
  }
  
  // Функция добавление карточки
  _addCard(element, position = 'prepend') {
    switch (position) {
      case 'prepend':
        cardsList.prepend(element);
        break;
      case 'append':
        cardsList.append(element);
    }
  }

  _deleteCard(element) {
    element.remove();
  }

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
  
    // Добавить лайк
    this._likeButtonElement.addEventListener('click', function (event) {
      event.target.classList.toggle('card__button-like_active');
    });

    // Удалить карточку
    this._buttonDeleteElement.addEventListener('click', () => this._cardCloneTemplate.remove());
  
    // Открыть popup с фотографией карточки
    this._linkElement.addEventListener('click', () => {
      popupImageElementPhoto.src = this._link;
      popupImageElementPhoto.alt = this._name;
      popupImageNameElement.textContent = this._name;
      openPopup(popupImage);
    });
  
    return  this._cardCloneTemplate;
  }
}

// Функция добавление карточки
export function addCard (listContainer, element, position = 'prepend') {
  switch (position) {
    case 'prepend':
      listContainer.prepend(element);
      break;
    case 'append':
      listContainer.append(element);
  }
}


initialCards.forEach(function (item) {
  // const card = createCard(item);
  const card = new Card(item, '#card-template').createCard();
  // addCard(card, 'append');
  addCard(cardsList, card, 'append');
});

