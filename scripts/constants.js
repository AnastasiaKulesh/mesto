const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');

// Редактирование профиля
const popupProfile = page.querySelector('.popup_type_editProfile');
const popupFormEditProfile = popupProfile.querySelector('[name="editProfileForm"]');
const buttonEditProfile = page.querySelector('.profile__button-edit');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');

const infoProfileName = page.querySelector('.profile__name');
const infoProfileDescription = document.querySelector('.profile__description');
const popupInfoInputName = popupFormEditProfile.querySelector('.popup__input_type_name');
const popupInfoInputDescription = popupFormEditProfile.querySelector('.popup__input_type_description');

// Template карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards-grid__list');

// Добавление карточки
const popupAddNewCard = page.querySelector('.popup_type_add-card');
const popupFormAddCard = popupAddNewCard.querySelector('[name="addCard"]');
const popupAddNewCardInputName = popupFormAddCard.querySelector('.popup__input_type_name');
const popupAddNewCardInputLink = popupFormAddCard.querySelector('.popup__input_type_description');
const buttonAddNewCard = page.querySelector('.profile__button-add');
const buttonCloseAddCard = popupAddNewCard.querySelector('.popup__button-close');
const buttonSubmitAddCard = popupAddNewCard.querySelector('.popup__button-save');

// Popup фотографии
const popupImage = page.querySelector('.popup-image');
const popupImageElementPhoto = popupImage.querySelector('.popup-image__image');
const popupImageNameElement = popupImage.querySelector('.popup-image__name');
const buttonClosePopupImage = popupImage.querySelector('.popup__button-close');