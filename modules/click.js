// Создание нового сообщения

import { formatDate } from './formatDate.js'
import { comments } from './comments.js'
import { sanitizeHtml } from './replaceAll.js'
import { safeUserName } from '../index.js'
import { renderComments } from './render.js'

export const nameInputElement = document.querySelector('.add-form-name')
export const textInputElement = document.querySelector('.add-form-text')
export const buttonElement = document.querySelector('.add-form-button')

nameInputElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error')
})

textInputElement.addEventListener('click', () => {
    textInputElement.classList.remove('error')
})

buttonElement.addEventListener('click', () => {
    if (nameInputElement.value === '' || textInputElement.value === '') {
        if (nameInputElement.value === '')
            nameInputElement.classList.add('error')
        if (textInputElement.value === '')
            textInputElement.classList.add('error')
        return
    }

    const fullDate = formatDate()
    const safeName = sanitizeHtml(nameInputElement.value)
    const safeText = sanitizeHtml(textInputElement.value)

    comments.push({
        name: safeName,
        date: fullDate,
        text: safeText,
        likes: 0,
        isLiked: false,
    })

    nameInputElement.value = safeUserName
    textInputElement.value = ''

    // обязательно вызываем иначе не отрисует
    renderComments()
})
