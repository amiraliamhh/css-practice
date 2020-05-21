const actions = document.querySelector('#actions')
actions.addEventListener('click', e => {
  const box = document.querySelector('#box')
  box.className = ''
  box.classList.add(`show-${e.target.name}`)
})

const box = document.querySelector('#box')
let dragging = false
let oldX = null
let oldY = null
box.addEventListener('mousedown', e => {
  dragging = true
})
box.addEventListener('mouseup', e => {
  dragging = false
})
box.addEventListener('mouseleave', e => {
  dragging = false
})
box.addEventListener('mousemove', e => {
  if (dragging) {
    if (oldX === null) {
      oldX = e.pageX
    } else {
      if (oldX - e.pageX > 0) {
        pushY(box)
      } else if (oldX - e.pageX < 0) {
        pushY(box, 'right')
      }
    }
    if (oldY === null) {
      oldY = e.pageY
    } else {
      if (oldY - e.pageY > 0) {
        pushX(box)
      } else if (oldY - e.pageY < 0) {
        pushX(box, 'bottom')
      }
    }
    oldX = e.pageX
    oldY = e.pageY
  }
})

const matchRotateYValue = /(?<=rotateY\()(.*)(?=\))/
const matchRotateXValue = /(?<=rotateX\()(.*)(?=\))/

function pushY(el, direction = 'left') {
  const rotationY = getRotation(el)[1]
  let newRotationY = 0
  if (direction === 'left') {
    newRotationY = rotationY - 1
  } else {
    newRotationY = rotationY + 1
  }
  if (!el.style.transform) {
    el.style.transform = `rotateY(${newRotationY}deg)`
    return
  }
  setTimeout(() => {
    el.style.transform = el.style.transform.replace(matchRotateYValue, `${newRotationY}deg`)
  }, 0);
}

function pushX(el, direction = 'top') {
  const rotationX = getRotation(el)[0]
  let newRotationX = 0
  if (direction === 'top') {
    newRotationX = rotationX - 1
  } else {
    newRotationX = rotationX + 1
  }
  if (!el.style.transform) {
    el.style.transform = `rotateX(${newRotationX}deg)`
    return
  }
  setTimeout(() => {
    el.style.transform = el.style.transform.replace(matchRotateXValue, `${newRotationX}deg`)
  }, 0);
}

function getRotation(el) {
  const tr = el.style.transform
  if (!tr) {
    return [0, 0]
  }
  return [getRotateX(tr), getRotateY(tr)]
}

function getRotateY(str = '') {
  let rotateY = str.match(matchRotateYValue)
  if (rotateY) {
    rotateY = rotateY[0]
  } else {
    return 0
  }
  rotateY = parseInt(rotateY.replace(/\D/g,''), 0)
  if (str.indexOf('-') > -1) {
    return rotateY * -1
  }
  return rotateY
}

function getRotateX(str = '') {
  let rotateX = str.match(matchRotateXValue)
  if (rotateX) {
    rotateX = rotateX[0]
  } else {
    return 0
  }
  rotateX = parseInt(rotateX.replace(/\D/g,''), 0)
  if (str.indexOf('-') > -1) {
    return rotateX * -1
  }
  return rotateX
}
