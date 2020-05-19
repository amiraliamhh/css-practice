const actions = document.querySelector('#actions')
actions.addEventListener('click', (e) => {
  const box = document.querySelector('#box')
  box.className = ''
  box.classList.add(`show-${e.target.name}`)
})
