import { updateComments } from './comments.js'
import { renderComments } from './render.js'

export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/tataaani-v3/comments', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            updateComments(data.comments)
            renderComments()

            const addFormElement = document.querySelector('.add-form')
            if (addFormElement) {
                addFormElement.style.display = 'flex'
            }
        })
}
