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
    toggleButtonState(inputList, buttonElement, parameters);
    //проверяем каждый инпут на валидность и меняем кнопки в зависимости от этого
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