function password() {
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;

    const redirect = verificarLogin(login, password);

    if (redirect) {
        alert(`Welcome ${login} a ORDEM`);
        location.href = redirect;
    } else {
        alert('user or password incorrect');

    }
}