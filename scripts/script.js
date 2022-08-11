let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let formEdit = document.querySelector('.popup__cover');
let formCover = document.querySelector('.popup');
let formName = formEdit.querySelector('input[name="form__name"]');
let formJob = formEdit.querySelector('input[name="form__job"]');
let safeButton = formEdit.querySelector('.form__button');
let closeButton = formEdit.querySelector('.popup__close-icon');
let header = document.querySelector('.header');
let elements = document.querySelector('.elements');
let likeButton = elements.querySelector('.element__like-button');
let footer = document.querySelector('.footer');

function openForm() {
    formEdit.style.display = "flex";
    formCover.style.display = "block";
}

function safeForm() {
    if (formName.value != '') {
        profileName.textContent = formName.value;
    }
    if (formJob.value != '') {
        profileJob.textContent = formJob.value;
    }
}

function closeForm() {
    formEdit.style.display = "none";
    formCover.style.display = "none";
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
safeButton.addEventListener('click', safeForm);
closeButton.addEventListener('click', closeForm);
elements.addEventListener('click', like);