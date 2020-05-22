const box = document.querySelector('#box')
let dragging = false
let oldX = null
let oldY = null
document.addEventListener('mousedown', e => {
  dragging = true
})
document.addEventListener('mouseup', e => {
  dragging = false
})
document.addEventListener('mouseleave', e => {
  dragging = false
})
document.addEventListener('mousemove', e => {
  if (dragging) {
    rotate(box, [oldY - e.pageY, oldX - e.pageX])
    oldX = e.pageX
    oldY = e.pageY
  }
})

const matchRotateYValue = /(?<=rotateY\()(.*)(?=\))/
const matchRotateXValue = /(?<=rotateX\()(.*)(?=\))/

function rotate(el, [x , y] = [0, 0]) {
  const rotations = getRotation(el)
  let newRotationX = rotations[0]
  let newRotationY = rotations[1]
  if (x > 0) {
    newRotationX = rotations[0] - 1
  } else if (x < 0) {
    newRotationX = rotations[0] + 1
  }
  if (y > 0) {
    newRotationY = rotations[1] - 1
  } else if (y < 0) {
    newRotationY = rotations[1] + 1
  }
  el.style.transform = `rotateX(${newRotationX}deg) rotateY(${newRotationY}deg)`
}

function getRotation(el) {
  const tr = el.style.transform
  if (!tr) {
    return [0, 0]
  }
  return [getRotationVal(tr, matchRotateXValue), getRotationVal(tr, matchRotateYValue)]
}

function getRotationVal(str = '', re = matchRotateYValue) {
  let rotate = str.match(re)
  if (rotate) {
    rotate = rotate[0]
  } else {
    return 0
  }
  rotate = parseInt(rotate.replace(/\D/g,''), 0)
  if (str.indexOf('-') > -1) {
    return rotate * -1
  }
  return rotate
}
