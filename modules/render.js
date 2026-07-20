import {
    initLikeButtonsListeners,
    initCommentListeners,
} from './initListeners.js'
import { getComments } from './comments.js'
import { formatDate } from './formatDate.js'

const listElement = document.getElementById('comments-list')

export function renderComments() {
    listElement.innerHTML = getComments()
        .map((comment, index) => {
            return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${formatDate(comment.date)}</div>
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
