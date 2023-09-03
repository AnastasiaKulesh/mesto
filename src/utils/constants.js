// Массив данных начальных карточек
export const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1643718249935-cb148dc74b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1594652071880-3484b086d143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    name: 'Великий Новгород',
    link: 'https://images.unsplash.com/photo-1636622407062-7b9ea2967a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80',
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552735855-557bdba3961a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80',
  },
  {
    name: 'Роза Хутор',
    link: 'https://images.unsplash.com/photo-1650622174543-7a2599f5e970?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1635538365672-95c0ea660111?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  },
];

// Конфиг для валидации
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSubmitSelector: '.popup__button-save',
  buttonInactiveClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__error_enabled',
};

const page = document.querySelector('.page');

// Редактирование профиля
const popupProfile = page.querySelector('.popup_type_editProfile');
export const popupFormEditProfile = popupProfile.querySelector(
  '[name="editProfileForm"]'
);
export const buttonEditProfile = page.querySelector('.profile__button-edit');

export const popupFormEditAvatar = page.querySelector('[name="editAvatar"]');
export const buttonEditAvatar = page.querySelector('.profile__image');

export const popupInfoInputName = popupFormEditProfile.querySelector('.popup__input_type_name');
export const popupInfoInputDescription = popupFormEditProfile.querySelector('.popup__input_type_description');

// Добавление карточки
const popupAddNewCard = page.querySelector('.popup_type_add-card');
export const popupFormAddCard =
  popupAddNewCard.querySelector('[name="addCard"]');
export const buttonAddNewCard = page.querySelector('.profile__button-add');

// Popup фотографии
const popupImage = page.querySelector('.popup-image');
