import '../vendor/normalize.css';
import './index.css';

import FormValidate from '../components/FormValidate.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'; 
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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
  popupFormEditAvatar,
  buttonEditProfile,
  buttonAddNewCard,
  popupInfoInputName,
  popupInfoInputDescription,
  buttonEditAvatar
} from '../utils/constants.js'

// Экземпляры классов для валидации форм
const formEditProfileValidate = new FormValidate(config, popupFormEditProfile);
const formEditAvatarValidate = new FormValidate(config, popupFormEditAvatar);
const formAddCardValidate = new FormValidate(config, popupFormAddCard);

formEditProfileValidate.enableValidation();
formEditAvatarValidate.enableValidation();
formAddCardValidate.enableValidation();

// Экземпляры классов для popup с формами ввода
// Popup добавления карточки
const popupAddCardForm = new PopupWithForm('.popup_type_add-card', handleAddNewCardFormSubmit);
// Popup редактирования профиля
const popupEditProfileForm = new PopupWithForm('.popup_type_editProfile', handleEditProfileFormSubmit);
// Popup удаления карточки 
const popupDeleteCard = new PopupWithSubmit('.popup_type_delete-card');
// Popup изменения данных профиля
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', handleEditAvatarFormSubmit)

popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

// Экземпляр класса для popup с фотографией карточки
const popupCardImage = new PopupWithImage('.popup-image');
popupCardImage.setEventListeners();


// Экземпляр класса для данных пользователя
const userInfo = new UserInfo({ 
  nameSelector: '.profile__name', 
  infoSelector: '.profile__description',
  avatarSelector: '.profile__image' 
})


// Функция открытия popup с фотографией карточки
function handleCardClick(name, link) {
  popupCardImage.open(link, name);
}

// Функция добавления карточки
function createCard(dataCard, position = 'prepend') {;
  const card = new Card({
    data: dataCard, 
    handleClick: handleCardClick,
    handleLike: changeLike,
    handleDelete: handleCardDelete
  },
    '#card-template').createCard(userInfo.getUserId());
  
    cardLists.addItem(card, position);
}

// Функция submit для добавления карточек
function handleAddNewCardFormSubmit(dataCard) {
  popupAddCardForm.renderLoad(true, 'Сохранение...');

  api.postNewCard(dataCard)
    .then((res) => {
      createCard(res, 'prepend');
      popupAddCardForm.close();
    })
    .catch((err) => console.log(`ERROR: ${err}`))
    .finally(() => {
      popupAddCardForm.renderLoad(false);
    });
}

// Функция submit для изменения данных пользователя
function handleEditProfileFormSubmit(inputData) {
  popupEditProfileForm.renderLoad(true, 'Сохранение...');
  const data = {name: inputData['card-name'], info: inputData.info};
  api.patchUser(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEditProfileForm.close();
    })
    .catch((err) => console.log(`ERROR: ${err}`))
    .finally(() => {
      popupEditProfileForm.renderLoad(false);
    });
}

// Функция submit для изменения аватара пользователя
function handleEditAvatarFormSubmit(inputData) {
  popupEditAvatar.renderLoad(true, 'Сохранение...')
  api.patchEditAvatar(inputData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(`ERROR: ${err}`))
    .finally(() => {
      popupEditAvatar.renderLoad(false);
    });
}

// Функция submit для удаления карточки
function handleCardDelete(cardId, cardTemplate) {
  popupDeleteCard.open();
  popupDeleteCard.handleFormSubmit(() => {
    popupDeleteCard.renderLoad(true, 'Удаление...');
    api.deleteCard(cardId, cardTemplate)
      .then(() => {
        cardTemplate.remove();
        popupDeleteCard.close();
      })
      .catch((err) => console.log(`ERROR: ${err}`))
      .finally(() => {
        popupDeleteCard.renderLoad(false);
      });
  })
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

// Функция открытия для редактирования popupAvatar
function handleOpenAvatarPopup() {
  popupEditAvatar.open();
  formEditAvatarValidate.resetValidate();
}

// Функция добавления лайка карточки
function changeLike(id, isLiked, checkIsLiked) { 
  api.switchLikeCard(id, isLiked) 
    .then((res) => checkIsLiked(res))
    .catch((err) => console.log(`ERROR: ${err}`));
}


// Открытие popupProfile по нажатию кнопки
buttonEditProfile.addEventListener('click', handleOpenProfilePopup);

// Открытие popup Добавления карточки по нажатию кнопки
buttonAddNewCard.addEventListener('click', handleOpenPopupAddNewCard);

// Открытие popup Редактирования аватара по нажатию кнопки
buttonEditAvatar.addEventListener('click', handleOpenAvatarPopup);


let cardsArray = [];
let cardLists;

// Получение данных с сервера
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    //Данные пользователя
    const {_id, name, about, avatar} = userData;
    userInfo.setUserInfo({ name, info: about});
    userInfo.setUserAvatar(avatar);
    userInfo.setUserId(_id);

    // Данные карточек
    cardsArray = cards.map((item) => {
      const {_id, name, link, likes, owner} = item;
      return {
        _id, name, link, likes, owner
      }
    })
  })
  .catch((err) => {
    // В случае ошибки отрисовать начальный массив карточек
    cardsArray = initialCards;
    console.log(`ERROR: ${err}`);
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