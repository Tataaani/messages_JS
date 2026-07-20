import { comments } from './comments.js'
import { renderComments } from './render.js'

const textInputElement = document.querySelector('.add-form-text')

export const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()

            // Достаем индекс комментария, на который кликнули
            const index = likeButton.dataset.index
            const comment = comments[index]

            // Реализуем сценарии лайка / убирания лайка в массиве
            if (comment.isLiked) {
                comment.isLiked = false
                comment.likes--
            } else {
                comment.isLiked = true
                comment.likes++
            }

            // Перерисовываем интерфейс на основе изменившегося массива
            renderComments()
        })
    }
}

export const initCommentListeners = () => {
    const commentElements = document.querySelectorAll('.comment')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            const currentComment = comments[index]
            const quoteText = `> ${currentComment.name}:\n${currentComment.text}\n\n`

            // Записываем  цитату прямо в поле комментария
            textInputElement.value = quoteText

            //  курсор в поле ввода, чтобы  можно было сразу писать ответ в нужном месте
            textInputElement.focus()
        })
    }
}
initCommentListeners()
