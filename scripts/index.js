import FormValidate from './FormValidate.js';
import { Card } from './Card.js';


const formEditProfileValidate = new FormValidate(config, popupFormEditProfile);
const formAddCardValidate = new FormValidate(config, popupFormAddCard);

formEditProfileValidate.enableValidation();
formAddCardValidate.enableValidation();


// Функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");

  // Добавление слушателя для закрытия popup через Esc
  document.addEventListener("keydown", closePopupEsc);
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");

  // Добавление слушателя для закрытия popup через Esc
  document.removeEventListener("keydown", closePopupEsc);
}

// Добавление слушателя для закрытия popup через Overlay и buttonClose для каждого из popup
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

// Функция закрытия popup через Esc
function closePopupEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Функция закрытия popup через overlay
function closePopupOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

// Функция открытия для редактирования popupProfile
function openProfilePopup() {
  fillInputFormProfile();
  openPopup(popupProfile);
  formEditProfileValidate.resetValidate();
}

// Функция заполнения полей формы данными текущего пользователя
function fillInputFormProfile() {
  popupInfoInputName.value = infoProfileName.textContent;
  popupInfoInputDescription.value = infoProfileDescription.textContent;
}

// Функция обработки введенных данных пользователя
function handleProfileFormSubmit(event) {
  event.preventDefault();

  infoProfileName.textContent = popupInfoInputName.value;
  infoProfileDescription.textContent = popupInfoInputDescription.value;

  closePopup(popupProfile);
}

// Функция открытия popupAddCard
function openAddNewCardPopup() {
  openPopup(popupAddNewCard);
  popupFormAddCard.reset();
  formAddCardValidate.resetValidate();
}

// Функция обработки введенных данных новой карточки
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();

  const popupAddNewCardInputInfo = {
    name: popupAddNewCardInputName.value,
    link: popupAddNewCardInputLink.value,
  };

  const card = new Card(popupAddNewCardInputInfo, openPopup, "#card-template").createCard();

  addCard(cardsList, card, "prepend");
  closePopup(popupAddNewCard);
  popupFormAddCard.reset();
  formAddCardValidate.resetValidate();
}

// Функция добавление карточки
function addCard (listContainer, element, position = 'prepend') {
  switch (position) {
    case 'prepend':
      listContainer.prepend(element);
      break;
    case 'append':
      listContainer.append(element);
  }
}

initialCards.forEach(function (item) {
  const card = new Card(item, openPopup, '#card-template').createCard();
  addCard(cardsList, card, 'append');
});


// Открытие popupProfile по нажатию кнопки
buttonEditProfile.addEventListener("click", openProfilePopup);

// Сохранение inputs в форме и закрытие popupProfile
popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Открытие popup Добавления карточки по нажатию кнопки
buttonAddNewCard.addEventListener("click", openAddNewCardPopup);

// Сохранение inputs и закрытие popup Добавления карточки
popupFormAddCard.addEventListener("submit", handleAddNewCardFormSubmit);
