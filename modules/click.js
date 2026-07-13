// Создание нового сообщения

import { sanitizeHtml } from './replaceAll.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

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

    // const fullDate = formatDate()
    const safeName = sanitizeHtml(nameInputElement.value)
    const safeText = sanitizeHtml(textInputElement.value)

    // comments.push({
    //     name: safeName,
    //     date: fullDate,
    //     text: safeText,
    //     likes: 0,
    //     isLiked: false,
    // })

    const addFormElement = document.querySelector('.add-form')
    addFormElement.style.display = 'none'
    const loaderText = document.createElement('div')
    loaderText.textContent = 'Комментарий добавляется...'
    loaderText.style.textAlign = 'center'
    loaderText.style.marginTop = '40px'
    addFormElement.parentElement.appendChild(loaderText)

    fetch('https://wedev-api.sky.pro/api/v1/tataaani-v3/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: safeName,
            text: safeText,
        }),
    })
        .then((response) => response.json())
        .then(() => {
            return fetchAndRenderComments()
        })
        .then(() => {
            loaderText.remove()
            addFormElement.style.display = 'flex'
            nameInputElement.value = ''
            textInputElement.value = ''
        })
})
