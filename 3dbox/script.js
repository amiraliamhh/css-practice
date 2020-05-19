const actions = document.querySelector('#actions')
actions.addEventListener('click', e => {
  const box = document.querySelector('#box')
  box.className = ''
  box.classList.add(`show-${e.target.name}`)
})

const box = document.querySelector('#box')
let dragging = false
let oldX = null
box.addEventListener('mousedown', e => {
  dragging = true
})
box.addEventListener('mouseup', e => {
  dragging = false
})
box.addEventListener('mousemove', e => {
  goLeft()
  if (dragging) {
    if (oldX === null) {
      oldX = e.pageX
      return
    }
    oldX = e.pageX
  }
})
function goLeft() {

  const transformDegStr = box.style.transform
  if (transformDegStr) {
    const rotateXValue = transformDegStr.indexOf('rotateX(')
  }
  // box.style.transform =
}
