export function sanitizeHtml(text) {
    return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
