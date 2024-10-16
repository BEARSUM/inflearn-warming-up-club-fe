//가위바위보 버튼 클릭
//1. 남은 횟수 줄이기
//2. 누가 승리했는지 보여주기
//3. 플레이어/컴퓨터 스코어 계산하기

//가위바위보 로직
//컴퓨터는 랜덤하게 가위, 바위, 보 중 하나를 리턴한다
//플레이어와 비교
//1(가위) 2(바위) 3(보)

const gameResult = document.querySelector("#game-result");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

initialize(); //게임 초기화

//player의 input을 받아서 winner를 리턴하는 함수
function getWinner(input) {
  const computerReturn = Math.floor(Math.random() * 3 + 1);
  const result = input - computerReturn;

  if (result === 1 || result === -2) {
    return "player"; //플레이어 승리
  } else if (result === 0) {
    return "none"; //무승부
  } else return "computer"; //컴퓨터 승리
}

//player의 input을 받아서 게임 결과와 남은 횟수를 렌더링한다.
function playGame(playerInput) {
  const gameNumber = document.querySelector(".game-number");

  const winner = getWinner(playerInput);

  switch (winner) {
    case "player":
      playerScore.textContent = playerScore.textContent * 1 + 1;
      displayWinner("플레이어 승리");
      break;
    case "computer":
      computerScore.textContent = computerScore.textContent * 1 + 1;
      displayWinner("컴퓨터 승리");
      break;
    case "none":
      displayWinner("무승부");
      break;
  }

  gameNumber.textContent = gameNumber.textContent * 1 - 1;

  if (gameNumber.textContent * 1 === 0) {
    getFinalGameResult(playerScore.textContent, computerScore.textContent);
  }
}

const winner = document.createElement("div");

function displayWinner(result) {
  winner.textContent = result;

  gameResult.appendChild(winner);
}

function getFinalGameResult(myScore, computerScore) {
  const result = document.createElement("div");
  result.className = "final-result";

  if (myScore * 1 - computerScore * 1 > 0) {
    result.textContent = "게임에서 승리했습니다☺️";
  } else if (myScore * 1 - computerScore * 1 === 0) {
    result.textContent = "무승부입니다!";
  } else {
    result.textContent = "게임에서 졌습니다😭";
  }

  const button = document.createElement("button");
  button.className = "restart-button";
  button.textContent = "다시하기";
  button.addEventListener("click", initialize);

  gameResult.innerHTML = "";
  gameResult.append(result, button);
}

function initialize() {
  gameResult.innerHTML = "";
  playerScore.textContent = 0;
  computerScore.textContent = 0;

  const gameNumberWrap = document.createElement("div");
  const span = document.createElement("span");
  const gameNumber = document.createElement("span");

  span.textContent = "남은 횟수:";
  gameNumber.className = "game-number";
  gameNumber.textContent = 10;
  gameNumberWrap.className = "game-number-wrap";

  gameNumberWrap.append(span, gameNumber);

  const scissorsButton = document.createElement("button");
  const rockButton = document.createElement("button");
  const paperButton = document.createElement("button");
  const buttonWrap = document.createElement("div");

  scissorsButton.id = "scissors-button";
  scissorsButton.textContent = "✌️";
  rockButton.id = "rock-button";
  rockButton.textContent = "✊";
  paperButton.id = "paper-button";
  paperButton.textContent = "🖐️";
  buttonWrap.className = "button-wrap";

  //가위, 바위, 보 버튼 이벤트 리스너 등록
  scissorsButton.addEventListener("click", () => playGame(1));
  rockButton.addEventListener("click", () => playGame(2));
  paperButton.addEventListener("click", () => playGame(3));

  buttonWrap.append(scissorsButton, rockButton, paperButton);
  gameResult.append(gameNumberWrap, buttonWrap);
}
