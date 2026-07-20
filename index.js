import {
    fetchAndRenderComments,
    listElement,
} from './modules/fetchAndRenderComments.js'
import './modules/click.js'

if (listElement) {
    listElement.textContent =
        'Пожалуйста, подождите, комментарии загружаются...'
}
fetchAndRenderComments()
