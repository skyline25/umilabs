import scrollToElement from 'scroll-to-element'

let buttonGoToForm = document.getElementById('goToForm')
let formAnchor = document.getElementById('formAnchor')

buttonGoToForm.addEventListener('click',(e)=>{
  e.preventDefault()

  scrollToElement(formAnchor, {
    offset: 0,
    ease: 'linear',
    duration: 2000
  })
})