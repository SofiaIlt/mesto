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

const page = document.querySelector('.page');

const popupOpenImageTemplate = document.querySelector('#popup__open_image').content;

const elements = document.querySelector('.elements');

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
        evt.target.parentElement.remove();
    });

    const photoPreview = elementElement.querySelector('.element__photo');
    photoPreview.addEventListener('click', (btn) => {
        const popupOpenImageElement = popupOpenImageTemplate.querySelector('.popup__open_image').cloneNode(true);
        popupOpenImageElement.querySelector('.popup__photo').src = btn.target.src;
        popupOpenImageElement.querySelector('.popup__name').textContent = btn.target.alt;
        page.append(popupOpenImageElement);
        const popupOpenImage = document.querySelector('.popup__open_image');
        setTimeout(()=>{
            handleOpenPopup(popupOpenImage);
        },1);
        const buttonCloseOpenImage = document.querySelector('.popup__close-icon_open_image');
        buttonCloseOpenImage.addEventListener('click', () => {
            handleClosePopup(popupOpenImage);
            setTimeout(()=>{
                popupOpenImage.remove();
            },1000);
        });
    });

    return elementElement;
};

initialCards.forEach((item) => {
    elements.append(elementCreate(item.name, item.link));
});

function handleOpenPopup(popup) {
    popup.classList.add('popup_active');
    popup.classList.remove('popup_hidden');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
};

function handleClosePopup(popup) {
    popup.classList.remove('popup_active');
    popup.classList.add('popup_hidden');
};

function handleSafeFormEdit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    handleClosePopup(popupEditProfile);
};

function handleSafeFormAdd(evt) {
    evt.preventDefault();
    elements.prepend(elementCreate(formTitle.value, formLink.value));
    handleClosePopup(popupAddImage);
};
  
function handlePreviewPicture (data) {
    // устанавливаем название, подпись и альтернативный текст карточки
    // открываем модальное окно универсальной функций openPopup(popup)
        
};


buttonEdit.addEventListener('click', () => handleOpenPopup(popupEditProfile));
buttonAdd.addEventListener('click', () => handleOpenPopup(popupAddImage));
buttonCloseEditProfile.addEventListener('click', () => handleClosePopup(popupEditProfile));
buttonCloseAddImage.addEventListener('click', () => handleClosePopup(popupAddImage));
formEditProfile.addEventListener('submit', handleSafeFormEdit);
formAddImage.addEventListener('submit', handleSafeFormAdd);