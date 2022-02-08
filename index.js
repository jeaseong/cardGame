const gameBoard = document.querySelector(".gameBoard");

let card = [
  {
    isOfen: false,
    cardImg: "🐶",
  },
  {
    isOfen: false,
    cardImg: "🐶",
  },
  {
    isOfen: false,
    cardImg: "🐱",
  },
  {
    isOfen: false,
    cardImg: "🐱",
  },
  {
    isOfen: false,
    cardImg: "🐭",
  },
  {
    isOfen: false,
    cardImg: "🐭",
  },
  {
    isOfen: false,
    cardImg: "🐹",
  },
  {
    isOfen: false,
    cardImg: "🐹",
  },
  {
    isOfen: false,
    cardImg: "🐰",
  },
  {
    isOfen: false,
    cardImg: "🐰",
  },
  {
    isOfen: false,
    cardImg: "🦊",
  },
  {
    isOfen: false,
    cardImg: "🦊",
  },
  {
    isOfen: false,
    cardImg: "🐻",
  },
  {
    isOfen: false,
    cardImg: "🐻",
  },
  {
    isOfen: false,
    cardImg: "🐼",
  },
  {
    isOfen: false,
    cardImg: "🐼",
  },
];
let turn = 0;
let total = 0;
let score = 0;

const swap = (a, b) => {
  [card[a], card[b]] = [card[b], card[a]];
};

const suffleCard = () => {
  for (let i = 0; i < 100; i++) {
    let a = Math.floor(Math.random() * card.length);
    let b = Math.floor(Math.random() * card.length);
    swap(a, b);
  }
};

const makeGameBoard = () => {
  for (let i = 0; i < 16; i++) {
    const cards = document.createElement("div");
    cards.classList.add("cards");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<span>${card[i].cardImg}</span>`;
    cards.appendChild(front);
    cards.appendChild(back);
    gameBoard.appendChild(cards);
  }
};

const flipCard = (index) => {
  const parent = document.querySelectorAll(".cards")[index];
  return new Promise((resolve) => {
    if (card[index].isOfen) {
      card[index].isOfen = false;
      parent.childNodes.forEach((item) => item.classList.remove("active"));
    } else {
      card[index].isOfen = true;
      parent.childNodes.forEach((item) => item.classList.add("active"));
    }
    resolve();
  });
};

const init = () => {
  for (let i = 0; i < card.length; i++) {
    flipCard(i);
  }
  turn = 0;
  total = 0;
  score = 0;

  suffleCard();
};

const checkCards = (arr) => {
  return card[arr[0]].cardImg === card[arr[1]].cardImg ? true : false;
};

const selectCard = () => {
  const selectedCard = document.querySelectorAll(".cards > .front");

  let rememberCard = [];
  [...selectedCard].forEach((item, index) => {
    const userScore = document.querySelector(".userPoint");
    item.addEventListener("click", () => {
      flipCard(index).then(() => {
        setTimeout(() => {
          if (turn === 0) {
            turn = 1;
          } else if (turn === 1) {
            if (checkCards(rememberCard)) {
              score++;
            } else {
              for (const item of rememberCard) {
                flipCard(item);
              }
            }
            total++;
            userScore.innerText = `${total} turn`;
            rememberCard = [];
            turn = 0;
          }
          if (score === 8) {
            userScore.innerText = `0 turn`;
            init();
          }
        }, 400);
      });

      rememberCard.push(index);
    });
  });
};

const gameStart = () => {
  suffleCard();
  makeGameBoard();
  selectCard();

  console.log(card);
};

gameStart();
