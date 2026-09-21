function login() {
    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;
    const usuarioSalvo = localStorage.getItem('nicolas');

    // Pega a resposta do reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();

    // 1. Verifica se o usuário marcou o CAPTCHA
    if (recaptchaResponse.length === 0) {
        alert('Por favor, confirme que você não é um robô!');
        return;
    }

    // 2. Valida o usuário e a senha
    if (usuarioDigitado === 'nicolas' && senhaDigitada === usuarioSalvo) {
        alert('Login correto!');
    } else {
        alert('Incorreto!');
        // Reseta o captcha em caso de erro na senha
        grecaptcha.reset();
    }
}