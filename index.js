// import { sanitizeHtml } from './modules/replaceAll.js'
// import { nameInputElement } from './modules/click.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
import './modules/click.js'

const listElement = document.getElementById('comments-list')

if (listElement) {
    listElement.textContent =
        'Пожалуйста, подождите, комментарии загружаются...'
}
fetchAndRenderComments()
// .then(() => {
//     setTimeout(() => {
//         const userName = prompt('Добро пожаловать! Как вас зовут?')
//         if (userName) {
//             nameInputElement.value =
//                 userName !== null ? sanitizeHtml(userName) : null
//         }
//         if (userName !== null && userName.trim() !== '') {
//             nameInputElement.value = userName
//             alert(
//                 `Приятно познакомиться, ${userName}! Можете оставлять комментарии`,
//             )
//         } else {
//             alert(
//                 'Вы не представились, но всё равно можете читать комментарии!',
//             )
//         }
//         console.log('It works!')
//     }, 0)
// })
