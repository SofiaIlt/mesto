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

//функция закрытия попапа при нажатии на esc
function closePopupEscapeButton(evt) {
  if (evt.keyCode == 27) {
    if (popupEditProfile.classList.contains('popup_active')) {
      closePopup(popupEditProfile);
    }
    else if (popupAddImage.classList.contains('popup_active')) {
      closePopup(popupAddImage);
    }
    else if (popupOpenImage.classList.contains('popup_active')) {
      closePopup(popupOpenImage);
    }
  };
}

//функция закрытия попапа при нажатии на оверлей
function closePopupOverlayClick(evt, popup) {
  if(evt.target.closest('.popup__cover') === null){
    closePopup(popup);
  }
}

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

document.addEventListener('keydown', closePopupEscapeButton);

popupEditProfile.addEventListener('click', function(evt) {
  closePopupOverlayClick(evt, popupEditProfile);
});
popupAddImage.addEventListener('click', function(evt) {
  closePopupOverlayClick(evt, popupAddImage);
});
popupOpenImage.addEventListener('click', function(evt) {
  closePopupOverlayClick(evt, popupOpenImage);
});