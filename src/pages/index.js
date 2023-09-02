import '../vendor/normalize.css';
import './index.css';

import FormValidate from '../components/FormValidate.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'; 
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { 
  Api,
  api
} from '../components/Api.js';
import {
  initialCards,
  config,
  popupFormEditProfile,
  popupFormAddCard,
  buttonEditProfile,
  buttonAddNewCard,
  popupInfoInputName,
  popupInfoInputDescription
} from '../utils/constants.js'

// Экземпляры классов для валидации форм
const formEditProfileValidate = new FormValidate(config, popupFormEditProfile);
const formAddCardValidate = new FormValidate(config, popupFormAddCard);

formEditProfileValidate.enableValidation();
formAddCardValidate.enableValidation();

// Экземпляры классов для popup с формами ввода
const popupAddCardForm = new PopupWithForm(".popup_type_add-card", handleAddNewCardFormSubmit);
const popupEditProfileForm = new PopupWithForm(".popup_type_editProfile", handleEditProfileFormSubmit);

popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();

// Экземпляр класса для popup с фотографией карточки
const popupCardImage = new PopupWithImage(".popup-image");
popupCardImage.setEventListeners();


// Экземпляр класса для данных пользователя
const userInfo = new UserInfo({ 
  nameSelector: '.profile__name', 
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar' 
})


// Функция открытия popup с фотографией карточки
function handleCardClick(name, link) {
  popupCardImage.open(link, name);
}

// Функция добавления карточки
function createCard(dataCard, position = 'prepend') {
  const card = new Card({
    data: dataCard, 
    handleClick: handleCardClick},
    '#card-template').createCard();
cardLists.addItem(card, position);
}

// Функция submit для добавления карточек
function handleAddNewCardFormSubmit(dataCard) {
  // createCard(dataCard, "prepend");
  api.postNewCard(dataCard)
    .then(() => createCard(dataCard, "prepend"))
  popupAddCardForm.close();
}

// Функция submit для изменения данных пользователя
function handleEditProfileFormSubmit(inputData) {
  const data = {name: inputData['card-name'], info: inputData.info};
  api.patchUser(data)
    .then(() => userInfo.setUserInfo(data));
  popupEditProfileForm.close();
}

// Функция открытия popupAddCard
function handleOpenPopupAddNewCard() {
  popupAddCardForm.open();
  formAddCardValidate.resetValidate();  
}

// Функция открытия для редактирования popupProfile
function handleOpenProfilePopup() {
  const { name, info} = userInfo.getUserInfo();
  popupInfoInputName.value = name;
  popupInfoInputDescription.value = info;
  popupEditProfileForm.open();
  formEditProfileValidate.resetValidate();
}


// Открытие popupProfile по нажатию кнопки
buttonEditProfile.addEventListener("click", handleOpenProfilePopup);

// Открытие popup Добавления карточки по нажатию кнопки
buttonAddNewCard.addEventListener("click", handleOpenPopupAddNewCard);


let cardsArray = [];
let cardLists;

// Получение данных с сервера
api.getUser().then((data) => {
  const { name, about, avatar} = data;
  userInfo.setUserInfo({ name, info: about});
  userInfo.setUserAvatar(avatar)
})
.catch((err) => console.log(err));

api.getInitialCards().then((data) => {
  cardsArray = data.map((item) => {
    const {_id, name, link, likes, owner} = item;
    return {
      name, link, likes
    }
  })
})
.catch((err) => {
  // В случае ошибки отрисовать начальный массив карточек
  cardsArray = initialCards;
  console.log(err);
})
.finally(() => {
  // Добавление начальных карточек
  cardLists = new Section({ 
    items: cardsArray, 
    renderer: (element) => {
      createCard(element, 'append');
    }
  },
  '.cards-grid__list');

  cardLists.renderItems();
});


// fetch('https://mesto.nomoreparties.co/v1/cohort-73/cards', {
//   method: 'GET',
//   headers: {
//     authorization: 'b407476d-bacf-462b-96a7-4f805139a2ff'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 
  
// fetch('https://nomoreparties.co/v1/cohort-73/users/me', {
//   method: 'GET',
//   headers: {
//     authorization: 'b407476d-bacf-462b-96a7-4f805139a2ff'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 