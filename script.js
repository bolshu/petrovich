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

var getRequest = function(onSuccess, onError, url, method, data) {
  var xhr = new XMLHttpRequest();
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

var form = document.querySelector('form');

var onFormSubmit = function(evt) {
  evt.preventDefault();
  var formData = new FormData(form);

  var onSuccess = function(response) {
    console.log(response);
  };

  var onError = function(errorMessage) {
    console.log(errorMessage);
  };

  getRequest(onSuccess, onError, Auth.url, Auth.method, formData);
};

form.addEventListener('submit', onFormSubmit);
