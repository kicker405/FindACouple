(function () {
  function createArray() {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      let x = Math.round(Math.random() * 100);
      arr.push(x);
      arr.push(x);
    }
    return arr;
  }

  array = createArray();

  function arrStiration(arr) {
    var i = arr.length,
      randomNum,
      randomNumIndex;
    while (--i > 0) {
      randomNum = Math.floor(Math.random() * (i + 1));
      randomNumIndex = arr[randomNum];
      arr[randomNum] = arr[i];
      arr[i] = randomNumIndex;
    }
    return arr;
  }

  let sortedArr = arrStiration(array);
  console.log(sortedArr); //нужно убрать по завершении разработки

  function createGameList() {
    let gameList = document.createElement("ul");
    gameList.classList.add("game__list");
    return gameList;
  }

  function createGameItem(name) {
    let gameItem = document.createElement("li");
    gameItem.classList.add("game__item");
    gameItem.textContent = name;
    return gameItem;
  }

  function resetButton() {
    let button = document.createElement("button");
    button.classList.add("game__btn");
    button.textContent = "Сыграть ещё раз";

    button.addEventListener("click", function () {
      location.reload();
    });

    return button;
  }

  function startTimer(k) {
    // k = 5 секунд на ознакомление с карточками
    let but = document.createElement("button");
    but.classList.add("start__timer");
    but.textContent = `До начала игры осталось ${k} секунд`;

    let timer = setInterval(() => {
      k--;
      if (k >= 0) {
        but.textContent = `До начала игры осталось ${k} секунд`;
      } else {
        clearInterval(timer); // Остановка таймера
        but.classList.add('close-btn')
      }
    }, 1000);

    return but;
  }

  function createGame(arr) {
    let localCount = 0; //счётчик на всего объектов
    let container = document.getElementById("game");
    let gameList = createGameList();
    let k = 0; //Счётчик
    let previousIndex = 0; // Прошлая цифра
    let previousItem = null; // Прошлая карточка
    let prePreviousItem = null;

    let startTimerButton = startTimer(5);
    container.append(startTimerButton);

    for (let index of arr) {
      let gameItem = createGameItem("card");
      gameItem.textContent = index;

      setTimeout(() => {
        gameItem.textContent = "card";
      }, 5000);

      gameItem.addEventListener("click", function () {
        //создаём уловия игры
        k++;
        if (k === 1) {
          gameItem.textContent = index;
          previousItem = gameItem;
          previousIndex = index;
          localCount++;
        }
        if (k === 2) {
          gameItem.textContent = index;
          k = 0;
          if (index !== previousIndex) {
            setTimeout(() => {
              previousItem.textContent = "card";
            }, 1000);
            setTimeout(() => {
              gameItem.textContent = "card";
            }, 1000);
            localCount--;
          } else {
            localCount++;
          }
        }
        if (localCount == 16) {
          resetButton = resetButton();
          container.append(resetButton);
        }
      });

      gameList.append(gameItem);
    }
    //container.append(timer);
    container.append(gameList);
  }

  createGame(sortedArr);
})();
