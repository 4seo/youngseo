const container = document.getElementById('container');
let isMouseDown = false;
let intervalId = null;

// 랜덤하게 선택될 텍스트 목록
const textArray = ['오늘 실수한 거 없겠지? 어 있었네. 생각해보니까 그렇네. 몰라. 알아서 되겠지.', '왜 그런말을 했을까. 이기적인 사람인 것 같아 나는. 아 근데 어쩌라고. 내가 말 좀 하겠다는데.', '역시 나^~^ 내가 좀 짱인듯~^^', 
  '내일도 또 똑같겠지? 인생의 모토가 없이 사는 것 같아. 어떠한 이유로 사는 지 그걸 모르겠어. 일을 하여 돈을 벌기 위해 사는 걸까? 동생이 철학과 갔던데 나도 철학을 배워야하나. 인생의 진리를 찾는거지. 아 근데 너무 뇌에 힘주고 살려나? 우울해지지 않으려면 바보같이 살아야 하는데.', 
  '일기를 쓰지 않을래. 조그만 텍스트에도 모든 순간들이 기억나거든. 모든 일을 기억하는 건 좋지 않은 것 같아. 어쩌면 어렸을 때 기억이 희미한 이유는 그 떄문일까?',
  '...내가 어디까지 씻었지..? 처음부터 다시 씻을까','혓바닥 닦기 너무 힘들어 뒷통수에 구멍을 내서 칫솔을 넣고 싶어. 스릴러 영화에 그런 식으로 죽은 사람 있으려나.'
    ,'돈가스 먹고싶다. 규카츠같은..? 부평에서 맛있게 먹었는데. 아 맞다 부평에 3천원 타로집이 있다고 들었는데 가볼까? 은근 용하다는데. 근데 가서 뭐 물어보지? 금전운? 취업운?', 
    '해산물이 너무 맛있는 거 같아. 근처에 쿠우쿠우 골든 어쩌구 있던데 가고싶다.', '히히 인생이 즐거워', '보리랑 강릉 반려동물 동반 가능한 펜션에서 놀고 싶다. 얼마지? 비싸려나? 일단 어떻게 갈 지가 고민이네.',
    ,'보리보리~ 보리보리대마왕~', '내일은 뭐하지', '대학 졸업하면... 대학원 가야하나? 편입? 근데 돈은 언제 벌어야하지? 목돈 모아놓은 거는 떨어져 가는데 언제까지고 학생이어야하지?', '집나와서 독립하고싶다. 근데 집안일을 하고 싶진 않아. 설거지만해도 짜증이 나는데.', '혼자살면 외로울거야', '원목인테리어를 해야지.','어휴', 
     '진짜 탄핵되어야.. 안 되면 죽여야 해. 제발 좀.', 
    '신이 된다면 어떤 느낌일까? 육체의 고통에서 벗어나 순수한 정신의 상태로만 존재하는거지. 잠깐 그러면 내 뇌를 인터넷에 복구하는 것과 뭐가 달라? 어쩌면 이 세계도... 어이, 듣고 있냐?',
    '오 몇 십분 지난거지? 너무 오래 씻었다. 그만 씻자.'
];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 랜덤하게 텍스트를 선택하는 함수
function getRandomText() {
  const randomIndex = Math.floor(Math.random() * textArray.length);
  return textArray[randomIndex];
}

// 빠르게 타이포그래피를 생성하는 함수
function createTypography() {
  const typography = document.createElement('div');
  typography.classList.add('typography');

  // 텍스트 배열에서 랜덤하게 선택된 텍스트 사용
  typography.textContent = getRandomText();
  typography.style.color = getRandomColor();

  // 랜덤 위치 지정
  typography.style.position = 'absolute';
  typography.style.left = `${Math.random() * window.innerWidth}px`;
  typography.style.top = `${Math.random() * window.innerHeight}px`;
  typography.style.transition = 'opacity 2s ease-out'; // 사라질 때 부드러운 전환

  container.appendChild(typography);

    // 일정 시간 후 점차 회색으로 변화
    setTimeout(() => {
      typography.style.color = '#D8D8D8'; // 회색으로 변경
    }, 600); // 생성 후 바로 색상 변화 시작

  // 일정 시간 후 자동 삭제
  setTimeout(() => {
    fadeOutAndRemove(typography);
  }, 100000); // 5초 후 점차 사라짐
}

// 텍스트를 점점 투명하게 만들고 삭제하는 함수
function fadeOutAndRemove(element) {
  element.style.opacity = '0'; // 투명하게 설정
  setTimeout(() => {
    if (element.parentElement) {
      element.parentElement.removeChild(element); // DOM에서 삭제
    }
  }, 2000); // 2초 후 완전히 삭제
}

container.addEventListener('mousedown', () => {
  isMouseDown = true;

  // 20ms마다 타이포그래피 생성
  intervalId = setInterval(() => {
    if (isMouseDown) {
      createTypography();
    }
  }, 80);
});

container.addEventListener('mouseup', () => {
  isMouseDown = false;
  clearInterval(intervalId); // 마우스 버튼을 떼면 생성 중단

  // 현재 화면의 모든 타이포그래피를 점차 사라지게 만듦
  const typographies = document.querySelectorAll('.typography');
  typographies.forEach((typography) => fadeOutAndRemove(typography));
});
