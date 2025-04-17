import { animate, createTimeline, utils } from 'https://assets.codepen.io/1137/anime.esm.min.js';

const [$animation] = utils.$('#animation');
const [$button] = utils.$('.star-button');
const [$cursor] = utils.$('.cursor');
const [$count] = utils.$('.count');
const [$label] = utils.$('.label');
const [$star] = utils.$('.star-icon');
const [$starPoly] = utils.$('.star-icon polygon');

const data = {
  count: 1,
  add: 1,
  mult: 0,
}

let played = false;

const increaseCount = (cursor) => {
  $label.innerHTML = 'Starred';
  $starPoly.setAttribute('fill', 'currentColor');
  
  const $starClone = $star.cloneNode(true);
  $starClone.classList.add('star-particle');
  $starClone.style.position = 'absolute';
  $starClone.style.left = `${$star.getBoundingClientRect().left}px`;
  $starClone.style.top = `${$star.getBoundingClientRect().top}px`;
  $starClone.style.pointerEvents = 'none';
  $animation.appendChild($starClone);

  animate($starClone, {
    translateY: { to: utils.random(-175, -225), ease: 'out'},
    translateX: [
      { to: utils.random(-40, 40), ease: 'out'},
      { to: utils.random(-40, 40), ease: 'inOut(2)'}
    ],
    color: { from: '#FFDD8E' },
    scale: [1, 1.2, 1, .8],
    ease: 'inOut(2)',
    opacity: 0,
  })

  if (cursor) {
    const $cursorClone = $cursor.cloneNode(true);
    $animation.appendChild($cursorClone);
    createTimeline()
      .add($cursorClone, {
        x: { to: [utils.random(-250, 250), utils.random(-70, 70)], ease: 'out(3)' },
        y: { to: [utils.random(0, 1) ? -300 : 300, utils.random(0, 10)], ease: 'out(6)' },
        backgroundPosition: { to: '-40px 0px', ease: 'steps(1)', duration: 150 },
        opacity: [0, 1],
        duration: 400,
      })
      .add($cursorClone, {
        x: { to: utils.random(-250, 250), ease: 'inOut(3)' },
        y: { to: utils.random(0, 1) ? -300 : 300, ease: 'inOut(6)' },
        backgroundPosition: { to: '0px 0px', ease: 'steps(1)', duration: 50 },
        opacity: 0,
        duration: 750,
      })
      .init()
  }
}

utils.set($cursor, {
  x: 300,
  y: -250,
});

// ✅ 點一下才開始動畫（不自動）
$button.addEventListener('click', () => {
  if (played) return;
  played = true;

  createTimeline()
    .add($cursor, {
      x: { to: 0, ease: 'out(3)' },
      y: { to: 10, ease: 'out(6)' },
      backgroundPosition: { to: '-40px 0px', ease: 'steps(1)', duration: 250 },
      duration: 750,
    })
    .add('.star-button', {
      scale: [1, .97, 1],
      ease: 'out(4)',
      duration: 750,
    }, '<+=500')
    .set($count, { innerHTML: '1' }, '<<+=500')
    .call(() => increaseCount(true), '<<')
    .label('CLICK START', '+=250')
    .set($count, { innerHTML: '2' }, 'CLICK START')
    .set($count, { innerHTML: '3' }, 'CLICK START+=400')
    .set($count, { innerHTML: '4' }, 'CLICK START+=500')
    .set($count, { innerHTML: '5' }, 'CLICK START+=600')
    .set($count, { innerHTML: '6' }, 'CLICK START+=700')
    .add($cursor, {
      x: { to: -150, ease: 'inOut(3)' },
      y: { to: 250, ease: 'inOut(6)' },
      backgroundPosition: { to: '0px 0px', ease: 'steps(1)', duration: 50 },
      duration: 750,
    }, 'CLICK START-=500')
    .add(data, {
      mult: [0, 0, 1.5, .25, 0, 0],
      duration: 10000,
      ease: 'cubicBezier(1,0,0,1)',
    }, 'CLICK START')
    .add($count, {
      innerHTML: ['5', '40000'],
      modifier: utils.round(0),
      ease: 'cubicBezier(1,0,1,1)',
      duration: 5000
    }, 'CLICK START+=800')
    .add($count, {
      innerHTML: '49999',
      modifier: utils.round(0),
      ease: 'cubicBezier(0,1,0,1)',
      duration: 4250
    }, '<')
    .add($cursor, {
      x: { to: 0, ease: 'out(3)' },
      y: { to: 10, ease: 'out(6)' },
      backgroundPosition: { to: '-40px 0px', ease: 'steps(1)', duration: 250 },
      duration: 750,
    }, '<+=250')
    .add('.star-button', {
      scale: [1, .97, 1],
      ease: 'out(4)',
      duration: 750,
    }, '<+=500')
    .set($count, { innerHTML: '50000' }, '<<+=500')
    .call(() => increaseCount(false), '<<')
    .add($cursor, {
      x: { to: -150, ease: 'inOut(3)' },
      y: { to: 250, ease: 'inOut(6)' },
      backgroundPosition: { to: '0px 0px', ease: 'steps(1)', duration: 250 },
      duration: 750,
    }, '<<+=1000')
    .add($animation, {
      scale: 1.25,
      translateZ: 0,
      duration: 13000,
      ease: 'inOutQuad',
    }, 'CLICK START');
});
