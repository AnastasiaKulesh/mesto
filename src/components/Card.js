// Класс создания карточки с текстом и ссылкой на изображение
export default class Card {
  constructor(
    { data, handleClick, handleLike, handleDelete },
    templateSelector
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._isLiked = false;
    this._owner = data.owner;
    this._handleClick = handleClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._templateSelector = templateSelector;
    this._userId = null;
    this._updateCountLikes = this._updateCountLikes.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  // Метод получения id карточки
  getId() {
    return (this._id = data._id);
  }

  // Метод обновления количества лайков на странице
  _updateCountLikes(currentLikes) {
    this._likesElement.textContent = String(currentLikes.likes.length);
  }

  // Метод для изменения отображения лайка при нажатии
  _toggleStateLike() {
    if (this._isLiked) {
      this._likeButtonElement.classList.add("card__button-like_active");
    } else {
      this._likeButtonElement.classList.remove("card__button-like_active");
    }
    this._isLiked = !this._isLiked;
  }

  // Метод для проверки установленного лайка
  _checkIsLiked(userId) {
    this._isLiked = this._likes.some((item) => {
      return item._id === userId;
    });

    this._toggleStateLike();
  }

  // Метод управления отображением лайка на странице и отправка на сервер
  _updateLike() {
    this._toggleStateLike();
    this._handleLike(
      this._id,
      this._likes,
      this._isLiked,
      this._updateCountLikes
    );
  }

  // Метод открытия popup с фотографией карточки
  _openCardPopup() {
    popupImageElementPhoto.src = this._link;
    popupImageElementPhoto.alt = this._name;
    popupImageNameElement.textContent = this._name;
    this._handleClick(popupImage);
  }

  // Метод удаления карточки
  _deleteCard(card) {
    card.remove();
  }

  // Метод создания карточки
  createCard(userId) {
    this._cardCloneTemplate = this._getTemplate();
    //this._cardElement = _cardCloneTemplate.querySelector('.card');
    this._nameElement = this._cardCloneTemplate.querySelector(".card__name");
    this._linkElement = this._cardCloneTemplate.querySelector(".card__image");
    this._likesElement = this._cardCloneTemplate.querySelector(".card__like-count");
    this._likeButtonElement = this._cardCloneTemplate.querySelector(".card__button-like");
    this._buttonDeleteElement = this._cardCloneTemplate.querySelector(".card__button-trash");

    this._nameElement.textContent = this._name;
    this._linkElement.src = this._link;
    this._linkElement.alt = this._name;
    if (this._likes)
      this._likesElement.textContent = String(this._likes.length);

    this._userId = userId;

    // Управление отображением  кнопки "удалить"
    (this._owner._id === this._userId)
      ? this._buttonDeleteElement.classList.add("card__button-trash_active")
      : this._buttonDeleteElement.classList.remove("card__button-trash_active");

    this._checkIsLiked(userId);

    // Слушатель кнопки лайка
    this._likeButtonElement.addEventListener("click", () => {
      this._updateLike();
    });

    // Слушатель кнопки удаления карточки
    this._buttonDeleteElement.addEventListener("click", () =>
      this._handleDelete(this._id, this._cardCloneTemplate)
    );

    // Слушатель кнопки открытия popup с фотографией карточки
    this._linkElement.addEventListener("click", () =>
      this._handleClick(this._name, this._link)
    );

    return this._cardCloneTemplate;
  }
}