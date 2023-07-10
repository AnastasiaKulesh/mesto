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
 popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')){
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

// Функция удаления карточки
function deleteCard(cardData) {
  cardData.remove();
}

// Функция создание карточки из массива данных
function createCard(cardData) {
  const cardCloneTemplate = cardTemplate.cloneNode(true);
  const cardElement = cardCloneTemplate.querySelector(".card");
  const nameElement = cardElement.querySelector(".card__name");
  const linkElement = cardElement.querySelector(".card__image");
  const likeButtonElement = cardElement.querySelector(".card__button-like");
  const buttonDeleteElement = cardElement.querySelector(".card__button-trash");

  nameElement.textContent = cardData.name;
  linkElement.src = cardData.link;
  linkElement.alt = cardData.name;

  // Добавить лайк
  likeButtonElement.addEventListener("click", function (event) {
    event.target.classList.toggle("card__button-like_active");
  });

  // Удалить карточку
  buttonDeleteElement.addEventListener("click", () => deleteCard(cardElement));

  // Открыть popup с фотографией карточки
  linkElement.addEventListener("click", () => {
    popupImageElementPhoto.src = cardData.link;
    popupImageElementPhoto.alt = cardData.name;
    popupImageNameElement.textContent = cardData.name;
    openPopup(popupImage);
  });

  return cardCloneTemplate;
}

// Функция обработки введенных данных новой карточки
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();

  const popupAddNewCardInputInfo = {
    name: popupAddNewCardInputName.value,
    link: popupAddNewCardInputLink.value,
  };
  const card = createCard(popupAddNewCardInputInfo);

  addCard(card, "prepend");

  closePopup(popupAddNewCard);
  popupFormAddCard.reset();
}

// Функция добавление карточки
function addCard(element, position = "prepend") {
  switch (position) {
    case "prepend":
      cardsList.prepend(element);
      break;
    case "append":
      cardsList.append(element);
  }
}




// Добавление начальных карточек
initialCards.forEach(function (item) {
  const card = createCard(item);
  addCard(card, "append");
});

// Открытие popupProfile по нажатию кнопки
buttonEditProfile.addEventListener("click", openProfilePopup);

// Сохранение inputs в форме и закрытие popupProfile
popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Открытие popup Добавления карточки по нажатию кнопки
buttonAddNewCard.addEventListener("click", () => {
  disableButton(buttonSubmitAddCard, config);
  openPopup(popupAddNewCard);
});

// Сохранение inputs и закрытие popup Добавления карточки
popupFormAddCard.addEventListener("submit", handleAddNewCardFormSubmit);