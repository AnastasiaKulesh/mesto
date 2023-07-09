const page = document.querySelector('.page');

// Редактирование профиля
const popupProfile = page.querySelector('.popup_type_editProfile');
const popupFormEditProfile = popupProfile.querySelector('[name="editProfileForm"]');
const buttonEditProfile = page.querySelector('.profile__button-edit');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');

const infoProfileName = page.querySelector('.profile__name');
const infoProfileDescription = document.querySelector('.profile__description');
const popupInfoInputName = popupFormEditProfile.querySelector('.popup__input_type_name');
const popupInfoInputDescription = popupFormEditProfile.querySelector('.popup__input_type_descriprion');

// Template карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards-grid__list');

// Добавление карточки
const popupAddNewCard = page.querySelector('.popup_type_add-card');
const popupFormAddCard = popupAddNewCard.querySelector('[name="addCard"]');
const popupAddNewCardInputName = popupFormAddCard.querySelector('.popup__input_type_name');
const popupAddNewCardInputLink = popupFormAddCard.querySelector('.popup__input_type_descriprion');
const buttonAddNewCard = page.querySelector('.profile__button-add');
const buttonCloseAddCard = popupAddNewCard.querySelector('.popup__button-close');

// Popup фотографии
const popupImage = page.querySelector('.popup-image');
const popupImageElementPhoto = popupImage.querySelector('.popup-image__image');
const popupImageNameElement = popupImage.querySelector('.popup-image__name');
const buttonClosePopupImage = popupImage.querySelector('.popup__button-close');




// Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция закрытия popup через Esc
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Функция закрытия popup через overlay
function closePopupOverlay(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

// Функция открытия для редактирования popupProfile
function openProfilePopup() {
  fillInputFormProfile();
  openPopup(popupProfile);
}

// Функция заполнения полей формы данными текущего пользователя
function fillInputFormProfile() {
  popupInfoInputName.value = infoProfileName.textContent;
  popupInfoInputDescription.value = infoProfileDescription.textContent;
}

// Функция обработки введенных данных пользователя
function handleProfileFormSubmit (event) {
  event.preventDefault();
   
  infoProfileName.textContent = popupInfoInputName.value;
  infoProfileDescription.textContent = popupInfoInputDescription.value;

  closePopup(popupProfile);
}

// Функция удаления карточки
function deleteCard(cardData) {
  cardData.remove();
}

// Функция создание карточки из массива данных
function createCard(cardData) {
  const cardCloneTemplate = cardTemplate.cloneNode(true);
  const cardElement = cardCloneTemplate.querySelector('.card');
  const nameElement = cardElement.querySelector('.card__name');
  const linkElement = cardElement.querySelector('.card__image');
  const likeButtomElement = cardElement.querySelector('.card__button-like');
  const buttonDeleteElement = cardElement.querySelector('.card__button-trash');

  nameElement.textContent = cardData.name;
  linkElement.src = cardData.link;
  linkElement.alt = cardData.name;

  // Добавить лайк
  likeButtomElement.addEventListener('click', function(event) {
    event.target.classList.toggle('card__button-like_active');
  });

  // Удалить карточку
  buttonDeleteElement.addEventListener('click', () => deleteCard(cardElement));

  // Открыть popup с фотографией карточки
  linkElement.addEventListener('click', () => {
    popupImageElementPhoto.src = cardData.link;
    popupImageElementPhoto.alt = cardData.name;
    popupImageNameElement.textContent = cardData.name;
    openPopup(popupImage);
  });

  return cardCloneTemplate;
}

// Функция обработки введенных данных новой карточки
function handleAddNewCardFormSubmit (event) {
  event.preventDefault();

  const popupAddNewCardInputInfo = {name: popupAddNewCardInputName.value, link: popupAddNewCardInputLink.value};
  const card = createCard(popupAddNewCardInputInfo);
  
  addCard(card, 'prepend');

  closePopup(popupAddNewCard);
  popupFormAddCard.reset();
}

// Функция добавление карточки
function addCard(element, position = 'prepend') {
  switch (position) {
    case 'prepend':
      cardsList.prepend(element);
      break;
    case 'append':
      cardsList.append(element);
  }
}




// Добавление начальных карточек
initialCards.forEach(function(item) {
  const card = createCard(item);
  addCard(card, 'append');
});

// Открытие popupProfile по нажатию кнопки
buttonEditProfile.addEventListener('click', openProfilePopup);

// Закрытие popupProfile по нажатию кнопки
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

// Сохранение inputs в форме и закрытие popupProfile
popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Открытие popup Добавления карточки по нажатию кнопки
buttonAddNewCard.addEventListener('click', () => openPopup(popupAddNewCard));

// Закрытие popup Добавления карточки по нажатию кнопки
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddNewCard));

// Сохранение inputs и закрытие popup Добавления карточки
popupFormAddCard.addEventListener('submit', handleAddNewCardFormSubmit);

// Закрыть popup с фотографией
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));

// Слушатель для закрытия popup через Esc
document.addEventListener('keydown', closePopupEsc);

// Слушатель для закрытия popup через Overlay
document.addEventListener('mousedown', closePopupOverlay);