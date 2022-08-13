let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let editButton = profile.querySelector('.profile__edit-button');
let formEdit = document.querySelector('.popup__cover');
let popup = document.querySelector('.popup');
let formName = formEdit.querySelector('.form__text_field-name');
let formJob = formEdit.querySelector('.form__text_field-job');
let form = popup.querySelector('.form');
let closeButton = formEdit.querySelector('.popup__close-icon');
let elements = document.querySelector('.elements');

function openPopup() {
    popup.classList.add('popup_active');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function safeForm(evt) {
    evt.preventDefault();
    if (formName.value != '') {
        profileName.textContent = formName.value;
    }
    if (formJob.value != '') {
        profileJob.textContent = formJob.value;
    }
    closePopup();
}

function closePopup() {
    popup.classList.remove('popup_active');
}

function like(btn) {
    if (btn.target.classList.contains('element__like-button')) {
        if (btn.target.classList.contains('element__like-button_active')) {
            btn.target.classList.remove('element__like-button_active');
        }
        else {
            btn.target.classList.add('element__like-button_active');
        }
    }
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', safeForm);
closeButton.addEventListener('click', closePopup);
elements.addEventListener('click', like);