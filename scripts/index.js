const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd =  profile.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit_profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon_edit_profile');
const formEditProfile = popupEditProfile.querySelector('.form_edit_profile');
const formName = document.querySelector('.form__text_field_name');
const formJob = document.querySelector('.form__text_field_job');

const popupAddImage = document.querySelector('.popup_add_image');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close-icon_add_image');
const formAddImage = popupAddImage.querySelector('.form_add_image');
const formTitle = document.querySelector('.form__text_field_title');
const formLink = document.querySelector('.form__text_field_link');

const popupOpenImage = document.querySelector('.popup_open_image');
const buttonCloseOpenImage = document.querySelector('.popup__close-icon_open_image');
const popupPhoto = document.querySelector('.popup__photo');
const popupName = document.querySelector('.popup__name');

const elements = document.querySelector('.elements');

//массив, хранящий карточки
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  //выбираем конкретный span ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //тут добавляем ошибки
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.classList.add(parameters.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, parameters) => {
  //выбираем конкретный span ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //тут убираем ошибки
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
};

//проверка инпута на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//меняем класс у кнопки
const toggleButtonState = (inputList, buttonElement, parameters) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parameters.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }
  else {
    buttonElement.classList.remove(parameters.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

const checkInputValidity = (formElement, inputElement, parameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};

const setEventListeners = (formElement, parameters) => {
  //создаем массив из инпутов формы
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  console.log(buttonElement);
  //изменяем класс кнопки в зависимости от валидности формы
  toggleButtonState(inputList, buttonElement);
  //проверяем каждый импут на валидность и меняем кнопки в зависимости от этого
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};


const enableValidation = (parameters) => {
  //создаем массив форм
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  //вешаем на каждый инпут формы слушаетель
  formList.forEach((formElement) => {
    setEventListeners(formElement, parameters);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__text-error',
  errorClass: 'form__input-error_visible'
}); 





// Функция, которая создает карточку
const elementCreate = function(titleValue, linkValue) {
    const elementTemplate = document.querySelector('#element').content;
    const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

    const elementPhoto = elementElement.querySelector('.element__photo');
    const elementName = elementElement.querySelector('.element__name');

    elementPhoto.src = linkValue;
    elementPhoto.alt = titleValue;
    elementName.textContent = titleValue;

    const elementLikeButton = elementElement.querySelector('.element__like-button');
    elementLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
    });

    const elementDeleteButton = elementElement.querySelector('.element__delete-button');
    elementDeleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    });

    elementPhoto.addEventListener('click', (btn) => {
        popupPhoto.src = btn.target.src;
        popupPhoto.alt = btn.target.alt;
        popupName.textContent = btn.target.alt;
        openPopup(popupOpenImage);
    });

    return elementElement;
};

//добавляем карточки из массива на страницу
initialCards.forEach((item) => {
    elements.append(elementCreate(item.name, item.link));
});

//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_active');
    popup.classList.remove('popup_hidden');
};

//функция открытия попапа для редактирования профиля
function openPopupEditProfile() {
    openPopup(popupEditProfile);
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

//общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_active');
    popup.classList.add('popup_hidden');
};


//функция сохраненяет измененные данные в профиле
function handleSafeFormEdit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    closePopup(popupEditProfile);
};

//функция сохраняет новую карточку
function handleSafeFormAdd(evt) {
    evt.preventDefault();
    renderCard();
    closePopup(popupAddImage);
};

//функция создает новую карточку
function renderCard() {
    elements.prepend(elementCreate(formTitle.value, formLink.value));
}


//список слушателей
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', () => openPopup(popupAddImage));
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddImage.addEventListener('click', () => closePopup(popupAddImage));
formEditProfile.addEventListener('submit', handleSafeFormEdit);
formAddImage.addEventListener('submit', handleSafeFormAdd);
buttonCloseOpenImage.addEventListener('click', () => closePopup(popupOpenImage));