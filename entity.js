// エンティティを生成する関数
function createEntity() {
  const entity = document.createElement('div');
  entity.classList.add('entity');
  document.body.appendChild(entity);

  const leftEye = document.createElement('div');
  leftEye.classList.add('eye', 'left');
  entity.appendChild(leftEye);

  const leftPupil = document.createElement('div');
  leftPupil.classList.add('pupil');
  leftEye.appendChild(leftPupil);

  const rightEye = document.createElement('div');
  rightEye.classList.add('eye', 'right');
  entity.appendChild(rightEye);

  const rightPupil = document.createElement('div');
  rightPupil.classList.add('pupil');
  rightEye.appendChild(rightPupil);

  return { entity, eyes: [leftEye, rightEye], pupils: [leftPupil, rightPupil] };
}

// スタイルを追加する関数
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .entity {
      position: absolute;
      width: 115px;
      height: 115px;
      background-color: #4accee;
      border: 1px solid lightgreen;
      border-radius: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: transform 2s ease-in-out;
      z-index: -1; /* 他の要素の上に表示 */
    }

    .eye {
      position: relative;
      width: 40px;
      height: 40px;
      background-color: black;
      border: 1px solid lightgreen;
      border-radius: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .pupil {
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.1s linear;
    }

    .eye.left {
      transform: translateX(-20px);
    }

    .eye.right {
      transform: translateX(20px);
    }
  `;
  document.head.appendChild(style);
}

// エンティティをランダムに動き回らせる関数
function moveEntityRandomly(entity) {
  const maxX = window.innerWidth * 0.7; // エンティティの幅を考慮
  const maxY = window.innerHeight * 0.8; // エンティティの高さを考慮

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function move() {
    const shouldChaseMouse = Math.random() < 0.7; // 70%の確率でマウスを追いかける

    let targetX, targetY;
    if (shouldChaseMouse) {
      targetX = Math.min(Math.max(mouseX - 50, 0), maxX); // ビューポートの範囲内に制限
      targetY = Math.min(Math.max(mouseY - 50 + window.scrollY, 0), maxY + window.scrollY); // スクロール位置を考慮
    } else {
      targetX = Math.random() * maxX;
      targetY = Math.random() * maxY + window.scrollY; // スクロール位置を考慮
    }

    entity.style.transition = 'transform 2s ease-in-out'; // スムーズな移動
    entity.style.transform = `translate(${targetX}px, ${targetY}px)`;

    setTimeout(move, Math.random() * 3000 + 500); // 2秒から5秒の間で移動
  }

  move();
}

// マウスカーソルを追いかける目の動き
function trackMouse(eyes, pupils) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    eyes.forEach((eye, index) => {
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
      const pupilOffsetX = Math.cos(angle) * 10; // 瞳の移動範囲
      const pupilOffsetY = Math.sin(angle) * 10;

      pupils[index].style.transform = `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`;
    });
  });
}

// 瞬きをさせる関数
function blinkEyes(eyes) {
  function blink() {
    eyes.forEach((eye) => {
      eye.style.transformOrigin = 'bottom';
      eye.style.height = '5px'; // 瞬き時に目を閉じる
    });

    setTimeout(() => {
      eyes.forEach((eye) => {
        eye.style.height = '40px'; // 瞬き後に目を開ける
      });
    }, 50); // 瞬きの時間（200ms）

    setTimeout(blink, Math.random() * 3000 + 2000); // 次の瞬きまでの間隔（2秒から7秒）
  }

  blink();
}

// 初期化
addStyles();
const { entity, eyes, pupils } = createEntity();
moveEntityRandomly(entity);
trackMouse(eyes, pupils);
blinkEyes(eyes);