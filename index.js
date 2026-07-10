import { renderComments } from './modules/render.js'
import { sanitizeHtml } from './modules/replaceAll.js'
import { nameInputElement } from './modules/click.js'
import './modules/click.js'
import { updateComments } from './modules/comments.js'

export const userName = prompt('Добро пожаловать! Как вас зовут?')
export const safeUserName = userName !== null ? sanitizeHtml(userName) : null

if (userName !== null && userName.trim() !== '') {
    nameInputElement.value = userName
    alert(`Приятно познакомиться, ${userName}! Можете оставлять комментарии`)
} else {
    alert('Вы не представились, но всё равно можете читать комментарии!')
}

fetch('https://wedev-api.sky.pro/api/v1/tataaani-v2/comments', {
    method: 'GET',
})
    .then((response) => response.json())
    .then((data) => {
        updateComments(data.comments)
        renderComments()
    })

console.log('It works!')
