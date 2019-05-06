import validator from 'validator'
import Inputmask from 'inputmask'

const form = document.getElementById('form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const text = document.getElementById('text')
const fields = [...document.querySelectorAll('.form-line__input')]
const inputmask = new Inputmask('+7 (999)-999-99-99')

inputmask.mask(phone)

const printMessage = (field, message) => {
  field.parentElement.querySelector('.form-line__message').innerText = message
}

const removeMessages = () => {
  fields.forEach( field => { printMessage(field, '') })
}

form.addEventListener('submit',(e)=>{
  let isExeptionInForm = false

  e.preventDefault()

  removeMessages()

  fields.forEach(field => { 
    
    if (!field.value.length) {   
      printMessage(field,'Заполните поле перед отправкой формы')  
      
      isExeptionInForm = true

      return false
    } 

    switch (field.id) {
      case 'name':
        let nameValue = name.value.replace(/\s/g, '')

        if (!validator.isAlpha(name.value, 'ru-RU') && !validator.isLength(nameValue, {min:3, max:undefined})) {
          printMessage(field, 'Введите имя на русском языке, длинной более 3 символов')
          
          isExeptionInForm = true

          return false
        }
      
        if (!validator.isAlpha(nameValue, 'ru-RU')) {
          printMessage(field, 'Введите имя на русском языке')

          isExeptionInForm = true

          return false
        }

        if (!validator.isLength(nameValue, {min:3, max:undefined})) {
          printMessage(field, 'Имя должно быть длинной более 3 символов')

          isExeptionInForm = true

          return false
        } 

        break

      case 'email':
        if (!validator.isEmail(email.value)) {
          printMessage(field, 'Введите email в формате имя@домен')

          isExeptionInForm = true
        }

        break
      
      case 'phone':
        if (!validator.isLength(phone.inputmask.unmaskedvalue(), {min:10})) {
           printMessage(field, 'Введите телефон в формате +7 (999)-999-99-99')

           isExeptionInForm = true
        }

        break

      case 'text':
        if (!validator.isLength(text.value, {min:10})) {
          printMessage(field, 'Введите в поле текст не короче 10 символов')

          isExeptionInForm = true
        }

        break

      default:
        return false
    }
  })

  console.log(`Form has exeption: ${isExeptionInForm}`)
})