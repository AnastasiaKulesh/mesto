const page = document.querySelector('.page');
const popup = page.querySelector(".popup");
const popupForm = popup.querySelector('.popup__form');
const editButton = page.querySelector(".profile__button-edit");
const closeButton = popup.querySelector(".popup__button-close");
const saveButton = popupForm.querySelector(".popup__button-save");

let infoProfileName = page.querySelector('.profile__name');
let infoProfileDescription = document.querySelector('.profile__description');
let popupInfoInputName = popupForm.querySelector('.popup__field_name');
let popupInfoInputDescription = popupForm.querySelector('.popup__field_descriprion');

// Функция открытия popup
function openPopup(popup) {
  popupInfoInputName.value = infoProfileName.textContent;
  popupInfoInputDescription.value = infoProfileDescription.textContent; 
  popup.classList.add("popup_opened");
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция обработки введенных данных
function handleFormSubmit (event) {
  event.preventDefault();                                           
   
  infoProfileName.textContent = popupInfoInputName.value;
  infoProfileDescription.textContent = popupInfoInputDescription.value;

  closePopup(popup);
}

// Открытие popup по нажатию кнопки
editButton.addEventListener("click", () => openPopup(popup));

// Закрытие popup по нажатию кнопки
closeButton.addEventListener("click", () => closePopup(popup));

// Сохранение inputs и закрытие popup
popupForm.addEventListener('submit', handleFormSubmit); 