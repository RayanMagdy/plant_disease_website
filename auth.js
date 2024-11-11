const checkIsUserLoggedIn = () => {
    return !!localStorage.getItem('user')
}

document.addEventListener('DOMContentLoaded', () => {
    if (!checkIsUserLoggedIn()) {
        window.location.href = 'login.html'
    }
})