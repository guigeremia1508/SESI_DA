function login() {
    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;

    const usuarioSalvo = localStorage.getItem('USUARIO');
    const senhaSalva = localStorage.getItem('SENHA');

    if (usuarioDigitado === usuarioSalvo && senhaDigitada === senhaSalva) {
        alert('Login correto!');
    } else {
        alert('Incorreto!');
    }

    const nome = localStorage.getItem("nome");
    alert(nome);

    localStorage.setItem("nome", "Frederico");
    alert(localStorage.getItem("nome"));

    localStorage.removeItem("nome");
    alert(localStorage.getItem("nome"));
}
