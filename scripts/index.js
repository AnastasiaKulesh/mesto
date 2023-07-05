const page = document.querySelector('.page');
const popup = page.querySelector('.popup');

// Редактирование профиля
const popup1 = page.querySelector('.popup_type_editProfile');
const popupFormEditProfile = popup1.querySelector('[name="editProfileForm"]');
const editButton = page.querySelector('.profile__button-edit');
const closeButton = popup1.querySelector('.popup__button-close');
const saveButton = popupFormEditProfile.querySelector('.popup__button-save');

let infoProfileName = page.querySelector('.profile__name');
let infoProfileDescription = document.querySelector('.profile__description');
let popupInfoInputName = popupFormEditProfile.querySelector('.popup__field_type_name');
let popupInfoInputDescription = popupFormEditProfile.querySelector('.popup__field_type_descriprion');

// Добавление карточки
const popup2 = page.querySelector('.popup_type_add-card');
const popupFormAddCard = popup2.querySelector('[name="addCard"]');
const addButton = page.querySelector('.profile__button-add');
const closeButtonAddCard = popup2.querySelector('.popup__button-close');
const saveButtonAddCard = popupFormAddCard.querySelector('.popup__button-save');

// Функция открытия popup
function openPopup(popup) {
  popupInfoInputName.value = infoProfileName.textContent;
  popupInfoInputDescription.value = infoProfileDescription.textContent; 
  popup.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция обработки введенных данных
function handleFormSubmit (event) {
  event.preventDefault();                                           
   
  infoProfileName.textContent = popupInfoInputName.value;
  infoProfileDescription.textContent = popupInfoInputDescription.value;

  closePopup(popup);
}

// Открытие popup по нажатию кнопки
editButton.addEventListener('click', () => openPopup(popup1));

// Закрытие popup по нажатию кнопки
closeButton.addEventListener('click', () => closePopup(popup1));

// Сохранение inputs и закрытие popup
popupFormEditProfile.addEventListener('submit', handleFormSubmit); 

// Массив данных начальных карточек
const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1643718249935-cb148dc74b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1594652071880-3484b086d143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Великий Новгород',
    link: 'https://images.unsplash.com/photo-1636622407062-7b9ea2967a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552735855-557bdba3961a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80'
  },
  {
    name: 'Роза Хутор',
    link: 'https://images.unsplash.com/photo-1650622174543-7a2599f5e970?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1635538365672-95c0ea660111?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards-grid__list');

// Загрузка начальных карточек
function renderCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const nameElement = cardElement.querySelector('.card__name');
  const linkElement = cardElement.querySelector('.card__image');

  nameElement.textContent = name;
  linkElement.src = link;
  linkElement.alt = name;
  
  cardsList.append(cardElement);
}

// Добавление начальных карточек
initialCards.forEach(function(item) {
  renderCard(item.name, item.link)
});


// Открытие popup Добавления карточки по нажатию кнопки
addButton.addEventListener('click', () => openPopup(popup2));

// Закрытие popup Добавления карточки по нажатию кнопки
closeButtonAddCard.addEventListener('click', () => closePopup(popup2));