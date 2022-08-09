let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let formEdit = document.querySelector('.form');
let formName = formEdit.querySelector('.form__name');
let formJob = formEdit.querySelector('.form__job');
let safeButton = formEdit.querySelector('.form__button');
let closeButton = formEdit.querySelector('.form__close-icon');
let header = document.querySelector('.header');
let elements = document.querySelector('.elements');
let likeButton = elements.querySelector('.element__like-button');
let footer = document.querySelector('.footer');

function openForm() {
    formEdit.style.display = "block";
    header.style.opacity = "0.5";
    profile.style.opacity = "0.5";
    elements.style.opacity = "0.5";
    footer.style.opacity = "0.5";
    editButton.classList.add('disabled');
    addButton.classList.add('disabled');
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
    header.style.opacity = "";
    profile.style.opacity = "";
    elements.style.opacity = "";
    footer.style.opacity = "";
    editButton.classList.remove('disabled');
    addButton.classList.remove('disabled');
}

function like() {
    likeButton.classList.add('active');
}

editButton.addEventListener('click', openForm);
safeButton.addEventListener('click', safeForm);
closeButton.addEventListener('click', closeForm);
likeButton.addEventListener('click', like);