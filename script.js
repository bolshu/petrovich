'use strict';

var TIMEOUT = 10000;
var Load = {
  url: 'http://test.kluatr.ru/api/user/data',
  method: 'GET'
};
var Auth = {
  url: 'http://test.kluatr.ru/api/user/login',
  method: 'POST'
};

var wrapper = document.querySelector('.wrapper');
var errorBlock = document.querySelector('.error');
var form = wrapper.querySelector('.form');

var profile = wrapper.querySelector('.profile');
var profileName = profile.querySelector('.profile__name');
var profileStats = profile.querySelector('.profile__stats');
var profileBonuses = profile.querySelector('.profile__bonuses');
var profileDataButton = profile.querySelector('.profile__data-button');

var getRequest = function(onSuccess, onError, url, method, data) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT;

  xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function() {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function() {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.open(method, url);
  xhr.send(data || null);
};

var onError = function(errorMessage) {
  errorBlock.classList.add('error--visible');
  errorBlock.textContent = errorMessage;
};

var onFormSubmit = function(evt) {
  evt.preventDefault();
  var formData = new FormData(form);

  var onSuccess = function(response) {
    errorBlock.classList.remove('error--visible');
    errorBlock.textContent = '';

    form.classList.add('form--hidden');
    profile.classList.add('profile--visible');
    profileName.textContent = response.data.name;
  };

  getRequest(onSuccess, onError, Auth.url, Auth.method, formData);
};
form.addEventListener('submit', onFormSubmit);

var onProfileDataButtonClick = function(evt) {
  evt.preventDefault();

  var onSuccess = function(response) {
    profileStats.classList.add('profile__stats--visible');
    profileBonuses.textContent = response.data.bonus;
    profileDataButton.removeEventListener('click', onProfileDataButtonClick);
  };

  getRequest(onSuccess, onError, Load.url, Load.method);
};
profileDataButton.addEventListener('click', onProfileDataButtonClick);
