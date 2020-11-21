const arr = document.querySelectorAll('.description__input');
const array = Array.from(arr);
const arrowRight = document.querySelector('.description__arrow_theme_right');
const arrowLeft = document.querySelector('.description__arrow_theme_left');
let width = 0;

function number() {
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 500) {
    return 8;
  }
  if (clientWidth < 660) {
    return 7;
  }
  if (clientWidth < 1000) {
    return 6;
  }
  if (clientWidth < 1200) {
    return 5;
  }
  if (clientWidth < 1400) {
    return 4;
  }
  if (clientWidth > 1399) {
    return 3;
  }
}

function moveRight() {
  let width = number();

  for (let i = 0; i < width; i++) {
    let item = array[i];
    if (item.checked) {
      item.checked = false;
      if (i === width - 1) {
        array[0].checked = true;
      } else {
        item.nextElementSibling.checked = true;
      }
      return;
    }
  }
}

function moveLeft() {
  let width = number();

  for (let i = 0; i < width; i++) {
    let item = array[i];
    if (item.checked) {
      item.checked = false;
      if (i === 0) {
        array[width-1].checked = true;
      } else {
        item.previousElementSibling.checked = true;
      }
      return;
    }
  }
}

arrowRight.addEventListener('click', moveRight);
arrowLeft.addEventListener('click', moveLeft);



function errorHandler(positionError) {
  if (positionError.code == 1) { // PERMISSION_DENIED
    alert("Error: Permission Denied! " + positionError.message);
  } else if (positionError.code == 2) { // POSITION_UNAVAILABLE
    alert("Error: Position Unavailable! " + positionError.message);
  } else if (positionError.code == 3) { // TIMEOUT
    alert("Error: Timeout!" + positionError.message);
  }
}

function showInfos() {
  navigator.geolocation.getCurrentPosition(errorHandler);
}

function init() {
  const myMap = new ymaps.Map("map", {
    center: [53.241320, 34.353562],
    zoom: 15,
  });

  const myPlacemark = new ymaps.Placemark([53.241320, 34.353562], {
    balloonContent: 'ул. Грибоедова 19',
    hintContent: '3 Кита',

  }, {
    preset: 'islands#circleIcon'
  });

  myMap.geoObjects.add(myPlacemark);
}
ymaps.ready(init);