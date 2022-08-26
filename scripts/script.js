let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let editButton = profile.querySelector('.profile__edit-button');
let addButton =  profile.querySelector('.profile__add-button');

let elements = document.querySelector('.elements');

let page = document.querySelector('.page');

let popupEditProfile = document.querySelector('.popup_edit_profile');
let formEditProfile = popupEditProfile.querySelector('.form_edit_profile');
let formName = document.querySelector('.form__text_field_name');
let formJob = document.querySelector('.form__text_field_job');
let closeButtonEditProfile = popupEditProfile.querySelector('.popup__close-icon_edit_profile');

let popupAddImage = document.querySelector('.popup_add_image');
let formAddImage = popupAddImage.querySelector('.form_add_image');
let closeButtonAddImage = popupAddImage.querySelector('.popup__close-icon_add_image');
let formTitle = document.querySelector('.form__text_field_title');
let formLink = document.querySelector('.form__text_field_link');

let elementPhoto = document.querySelectorAll('.element__photo');
let elementName = document.querySelectorAll('.element__name');

const elementTemplate = document.querySelector('#element').content;
const popupOpenImageTemplate = document.querySelector('#popup__open_image').content;

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

for (let i = 0; i < elementPhoto.length; i += 1) {
    elementPhoto[i].src = initialCards[i].link;
    elementPhoto[i].alt = initialCards[i].name;
    elementName[i].textContent = initialCards[i].name;
}

function openPopupEdit() {
    popupEditProfile.classList.add('popup_active');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
    popupEditProfile.classList.remove('popup_hidden');
}

function openPopupAdd() {
    popupAddImage.classList.add('popup_active');
    popupAddImage.classList.remove('popup_hidden');
}

function safeFormEdit(evt) {
    evt.preventDefault();
    if (formName.value != '') {
        profileName.textContent = formName.value;
    }
    if (formJob.value != '') {
        profileJob.textContent = formJob.value;
    }
    closePopupEdit();
}

function safeFormAdd(evt) {
    evt.preventDefault();
    const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
    if (formLink.value != '' && formTitle.value != '') {
        elementElement.querySelector('.element__photo').src = formLink.value;
        elementElement.querySelector('.element__photo').alt = formTitle.value;
        elementElement.querySelector('.element__name').textContent = formTitle.value;
        elements.prepend(elementElement);
    }
    closePopupAdd();
}

function closePopupEdit() {
    popupEditProfile.classList.remove('popup_active');
    popupEditProfile.classList.add('popup_hidden');
}

function closePopupAdd() {
    popupAddImage.classList.remove('popup_active');
    popupAddImage.classList.add('popup_hidden');
}

function likeOrDeleteOrOpenImage(btn) {
    if (btn.target.classList.contains('element__like-button')) {
        btn.target.classList.toggle('element__like-button_active');
    }
    if (btn.target.classList.contains('element__delete-button')) {
        btn.target.parentElement.remove();
    }
    if (btn.target.classList.contains('element__photo')) {
        const popupOpenImageElement = popupOpenImageTemplate.querySelector('.popup__open_image').cloneNode(true);
        popupOpenImageElement.querySelector('.popup__photo').src = btn.target.src;
        popupOpenImageElement.querySelector('.popup__name').textContent = btn.target.alt;
        page.append(popupOpenImageElement);
        let popupOpenImage = document.querySelector('.popup__open_image');
        setTimeout(()=>{
            popupOpenImage.classList.add('popup_active');
        },1);
        let closeButtonOpenImage = document.querySelector('.popup__close-icon_open_image');
        closeButtonOpenImage.addEventListener('click', () => {
            popupOpenImage.classList.remove('popup_active');
            popupOpenImage.classList.add('popup_hidden');
            setTimeout(()=>{
                popupOpenImage.remove();
            },1000)
        });
    }
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formEditProfile.addEventListener('submit', safeFormEdit);
formAddImage.addEventListener('submit', safeFormAdd);
closeButtonEditProfile.addEventListener('click', closePopupEdit);
closeButtonAddImage.addEventListener('click', closePopupAdd);
elements.addEventListener('click', likeOrDeleteOrOpenImage);