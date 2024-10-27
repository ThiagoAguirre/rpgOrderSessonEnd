function getLogin() {
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    const validateLogin = verificarLogin(login, password);

    if (validateLogin) {
        alert('Welcome ${login} a ORDEM ${password}');
        location.href = "./assets/templates/home.html";
    } else {
        alert('User or password incorrect');
    }
}

function verificarLogin(login, password) {
    const users = {
        "123": "123",  
        "222": "222",
        "arrozdamamae": "9y4s2da7"
    };

    return users[login] === password;
}