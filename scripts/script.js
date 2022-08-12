let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let formEdit = document.querySelector('.popup__cover');
let formCover = document.querySelector('.popup');
let formName = formEdit.querySelector('.form__name');
let formJob = formEdit.querySelector('.form__job');
let safeButton = formCover.querySelector('.form');
let closeButton = formEdit.querySelector('.popup__close-icon');
let elements = document.querySelector('.elements');
let likeButton = elements.querySelector('.element__like-button');

function openForm() {
    formCover.classList.add('popup__active');
}

function safeForm(evt) {
    evt.preventDefault();
    if (formName.value != '') {
        profileName.textContent = formName.value;
        formName.placeholder = formName.value;
    }
    if (formJob.value != '') {
        profileJob.textContent = formJob.value;
        formJob.placeholder = formJob.value;
    }
    formCover.classList.remove('popup__active');
}

function closeForm() {
    formCover.classList.remove('popup__active');
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

editButton.addEventListener('click', openForm);
safeButton.addEventListener('submit', safeForm);
closeButton.addEventListener('click', closeForm);
elements.addEventListener('click', like);