'use strict'
const userName = prompt('Добро пожаловать! Как вас зовут?')
const safeUserName =
    userName !== null
        ? userName.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        : null

if (userName !== null && userName.trim() !== '') {
    nameInputElement.value = userName
    alert(`Приятно познакомиться, ${userName}! Можете оставлять комментарии`)
} else {
    alert('Вы не представились, но всё равно можете читать комментарии!')
}

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
]

const listElement = document.getElementById('comments-list')
const nameInputElement = document.querySelector('.add-form-name')
const textInputElement = document.querySelector('.add-form-text')
const buttonElement = document.querySelector('.add-form-button')

// Функция рендеринга
function renderComments() {
    listElement.innerHTML = comments
        .map((comment, index) => {
            return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>
      `
        })
        .join('')

    initLikeButtonsListeners()
    initCommentListeners()
}

// Функция для оживления лайков
const initLikeButtonsListeners = () => {
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

const initCommentListeners = () => {
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

// Создание нового сообщения
{
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

        const date = new Date()
        const d = ('0' + date.getDate()).slice(-2)
        const m = ('0' + (date.getMonth() + 1)).slice(-2)
        const y = date.getFullYear().toString().slice(-2)
        const time = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)
        const fullDate = `${d}.${m}.${y} ${time}`

        //   const oldListHtml = listElement.innerHTML;
        //   const newCommentHtml = `
        // <li class="comment">
        //   <div class="comment-header">
        //     <div>${nameInputElement.value}</div>
        //     <div>${fullDate}</div>
        //   </div>
        //   <div class="comment-body">
        //     <div class="comment-text">${textInputElement.value}</div>
        //   </div>
        //   <div class="comment-footer">
        //     <div class="likes">
        //       <span class="likes-counter">0</span>
        //       <button class="like-button"></button>
        //     </div>
        //   </div>
        // </li>`;
        //   listElement.innerHTML = oldListHtml + newCommentHtml;

        // меняем написанный в первой домашке код ☝️ на массив comments.push👇

        const safeName = nameInputElement.value
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')

        const safeText = textInputElement.value
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')

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
}

renderComments()
console.log('It works!')
