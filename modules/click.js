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

    if (
        nameInputElement.value.length < 3 ||
        textInputElement.value.length < 3
    ) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return
    }

    if (navigator.onLine === false) {
        alert(
            'Нет подключения к интернету. Пожалуйста, проверьте соединение и попробуйте снова.',
        )
        return
    }

    const safeName = sanitizeHtml(nameInputElement.value)
    const safeText = sanitizeHtml(textInputElement.value)
    const addFormElement = document.querySelector('.add-form')
    addFormElement.style.display = 'none'
    const loaderText = document.createElement('div')
    loaderText.className = 'comment-loader'
    loaderText.textContent = 'Комментарий добавляется...'
    loaderText.style.textAlign = 'center'
    loaderText.style.marginTop = '40px'
    addFormElement.parentElement.appendChild(loaderText)

    fetch('https://wedev-api.sky.pro/api/v1/tataaani-v4/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: safeName,
            text: safeText,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 400) {
                    throw new Error('Вы допустили ошибку')
                }
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }
                throw new Error('Что-то пошло не так, повторите попытку позже')
            }
        })
        .then(() => {
            return fetchAndRenderComments()
        })
        .then(() => {
            loaderText.remove()
            addFormElement.style.display = 'flex'
            nameInputElement.value = ''
            textInputElement.value = ''
        })
        .catch((error) => {
            loaderText.remove()
            addFormElement.style.display = 'flex'
            loaderText.style.display = 'none'

            const currentLoader = document.querySelector('.comment-loader')
            if (currentLoader) {
                currentLoader.remove()
            }

            if (error.message === 'Failed to fetch') {
                alert(
                    'У вас пропал интернет. Пожалуйста, проверьте соединение и попробуйте снова.',
                )
            } else {
                alert(error.message)
            }
        })
})
