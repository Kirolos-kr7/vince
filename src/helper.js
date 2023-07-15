export const on = () => {
  let btns = document.querySelectorAll('.btn')
  console.log(btns)
  btns.forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.target.classList.add('isReady')
    })
    btn.addEventListener('mouseup', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.addEventListener('mouseleave', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.addEventListener(
      'touchstart',
      (e) => {
        e.target.classList.add('isReady')
      },
      { passive: true },
    )
    btn.addEventListener(
      'touchend',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )
    btn.addEventListener(
      'touchmove',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )
  })
}

export const off = () => {}
