import { updateComments } from './comments.js'
import { renderComments } from './render.js'

export const listElement = document.getElementById('comments-list')

export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/tataaani-v3/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал')
            }
            return response.json() // Обязательно возвращаем результат распаковки наружу
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()

            const addFormElement = document.querySelector('.add-form')
            if (addFormElement) {
                addFormElement.style.display = 'flex'
            }
        })
        .catch((error) => {
            if (listElement) {
                if (error.message === 'Сервер упал') {
                    listElement.textContent =
                        'Сервер сломался. Пожалуйста, попробуйте позже.'
                } else {
                    listElement.textContent =
                        'Не удалось загрузить комментарии. Проверьте подключение к интернету.'
                }
                listElement.style.color = 'red'
                listElement.style.textAlign = 'center'
            }
            console.warn('Ошибка сети при получении данных:', error)
        })
}
