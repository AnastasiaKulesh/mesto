const page = document.querySelector('.page');
const popup = page.querySelector(".popup");
const popupForm = popup.querySelector('.popup__container');
const editButton = page.querySelector(".profile__button-edit");
const closeButton = popupForm.querySelector(".popup__button-close");

const infoProfileName = page.querySelector('.profile__name');
const infoProfileDescription = document.querySelector('.profile__description');

const popupInfoInputName = popupForm.querySelector('.popup__field-name');
const popupInfoInputDescription = popupForm.querySelector('.popup__field-descriprion');

/* console.log(infoProfileDescription);
console.log(popupInfoInputDescription); */

// Запись в popup текущих данных пользователя
popupInfoInputName.value = infoProfileName.textContent;
popupInfoInputDescription.value = infoProfileDescription.textContent;

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }

// Открытие/закрытие popup по нажатию кнопки
editButton.addEventListener("click", () => openPopup(popup));
closeButton.addEventListener("click", () => closePopup(popup));
