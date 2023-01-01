const titleImg = document.querySelector(".marauders_title");
const subtitleImg = document.querySelector(".marauders_subtitle");
const mainImg = document.querySelector(".marauders_main");
const leftFoot = document.querySelector(".left_foot");
const rightFoot = document.querySelector(".right_foot");
let leftLeft = window.getComputedStyle(leftFoot).left;
let leftTop = window.getComputedStyle(leftFoot).top;
let rightLeft = window.getComputedStyle(rightFoot).left;
let rightTop = window.getComputedStyle(rightFoot).top;

// Создаем распознаватель
const recognizer = new webkitSpeechRecognition();
console.log(recognizer);

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = "ru-Ru";

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];

  if (result.isFinal) {
    let v = result[0].transcript.toLowerCase();
    console.log(result);

    if (
      v === "торжественно клянусь что замышляю шалость" ||
      v === "торжественно клянусь что замышляю только шалость"
    ) {
      titleImg.style.opacity = 1;
      subtitleImg.style.opacity = 1;
      mainImg.style.opacity = 1;
      leftFoot.style.opacity = 1;
      rightFoot.style.opacity = 1;
      titleImg.style.animation = "show 3s 1";
      subtitleImg.style.animation = "show 3s 1";
      mainImg.style.animation = "show 3s 1";
      leftFoot.style.animation = "show 3s 1";
      rightFoot.style.animation = "show 3s 1";
    }

    if (v === "шалость удалась") {
      titleImg.style.opacity = 0;
      subtitleImg.style.opacity = 0;
      mainImg.style.opacity = 0;
      leftFoot.style.opacity = 0;
      rightFoot.style.opacity = 0;
      titleImg.style.animation = "showBack 3s 1";
      subtitleImg.style.animation = "showBack 3s 1";
      mainImg.style.animation = "showBack 3s 1";
      leftFoot.style.animation = "showBack 3s 1";
      rightFoot.style.animation = "showBack 3s 1";
    }
  }
};

// Начинаем слушать микрофон и распознавать голос
recognizer.start();

function rightFootStranger() {
  if (
    window.getComputedStyle(rightFoot).left.match(/\d+/) < 0 ||
    window.getComputedStyle(rightFoot).top.match(/\d+/) < 0
  ) {
    rightFoot.style.opacity = 0;
    leftFoot.style.opacity = 0;
  }

  setTimeout(function () {
    rightFoot.style.left =
      parseInt(window.getComputedStyle(rightFoot).left.match(/\d+/)) +
      21 +
      "px";
    rightFoot.style.top =
      parseInt(window.getComputedStyle(rightFoot).top.match(/\d+/)) - 80 + "px";
    next();
  }, 2000);
}

// let constraints = { audio: false, video: true };
// var promise = navigator.mediaDevices.getUserMedia(constraints);

// console.log(promise);

function leftFootStranger() {
  setTimeout(function () {
    leftFoot.style.left =
      parseInt(window.getComputedStyle(leftFoot).left.match(/\d+/)) + 21 + "px";
    leftFoot.style.top =
      parseInt(window.getComputedStyle(leftFoot).top.match(/\d+/)) - 80 + "px";
    next();
  }, 2000);
}

let arr = [];
for (let i = 0; i < 12; i++) {
  arr.push(leftFootStranger, rightFootStranger);
}

let i = 0,
  next = function () {
    arr[i] && arr[i++]();
  };

next();

// navigator.geolocation.watchPosition((position) => {
//   const { latitude, longitude } = position.coords;
//   console.log(latitude, longitude);
// });

let button = document.querySelector("button");
let map = document.querySelector("iframe");

button.addEventListener("click", findLocation); // на клик по кнопке ищем локацию

function findLocation() {
  if (!navigator.geolocation) {
    status.textContent = "Ваш браузер не дружит с геолокацией...";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    // если всё хорошо, собираем ссылку
    const { longitude, latitude } = position.coords;
    console.log(position);
    console.log(longitude, latitude);
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}&amp;layer=mapnik`;
  }

  function error() {
    // если всё плохо, просто напишем об этом
    status.textContent = "Не получается определить вашу геолокацию :(";
  }
}
