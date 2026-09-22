const CHAVE_CONTAS = 'contasUsuarios';
const CHAVE_CONTA_ATUAL = 'contaAtual';

function obterContas() {
    const contasSalvas = JSON.parse(localStorage.getItem(CHAVE_CONTAS));
    if (Array.isArray(contasSalvas)) return contasSalvas;

    const contaAntiga = JSON.parse(localStorage.getItem('contaUsuario'));
    return contaAntiga ? [contaAntiga] : [];
}

function salvarContas(contas) {
    localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
}

function mostrarMensagem(texto) {
    const mensagem = document.getElementById('mensagem');
    if (mensagem) mensagem.textContent = texto;
}

function salvarCadastro(event) {
    event.preventDefault();
    const contas = obterContas();
    const usuario = document.getElementById('cadastroUsuario').value.trim();

    if (contas.some((conta) => conta.usuario === usuario)) {
        mostrarMensagem('Esse usuário já existe.');
        return;
    }

    contas.push({
        nome: document.getElementById('cadastroNome').value.trim(),
        usuario,
        senha: document.getElementById('cadastroSenha').value,
        palavraPasse: document.getElementById('cadastroPalavra').value.trim()
    });
    salvarContas(contas);
    window.location.href = 'entrar.html';
}

function entrar(event) {
    event.preventDefault();
    const contas = obterContas();
    const usuario = document.getElementById('loginUsuario').value.trim();
    const senha = document.getElementById('loginSenha').value;

    const conta = contas.find((item) => item.usuario === usuario && item.senha === senha);
    if (conta) {
        sessionStorage.setItem(CHAVE_CONTA_ATUAL, conta.usuario);
        document.getElementById('voltarLogin').hidden = true;
        document.getElementById('tituloEntrar').hidden = true;
        document.getElementById('formularioLogin').hidden = true;
        document.getElementById('linksLogin').hidden = true;
        document.getElementById('loginFeito').hidden = false;
    } else {
        mostrarMensagem('Usuário ou senha incorretos.');
    }
}

function recuperarSenha(event) {
    event.preventDefault();
    const contas = obterContas();
    const usuario = document.getElementById('recuperarUsuario').value.trim();
    const palavraPasse = document.getElementById('recuperarPalavra').value.trim();

    const conta = contas.find((item) => item.usuario === usuario && item.palavraPasse === palavraPasse);
    if (!conta) {
        mostrarMensagem('Usuário ou palavra de passe incorretos.');
        return;
    }

    conta.senha = document.getElementById('novaSenha').value;
    salvarContas(contas);
    window.location.href = 'entrar.html';
}

function carregarConta() {
    const usuarioAtual = sessionStorage.getItem(CHAVE_CONTA_ATUAL);
    const conta = obterContas().find((item) => item.usuario === usuarioAtual);
    if (!conta) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('editarNome').value = conta.nome;
    document.getElementById('editarUsuario').value = conta.usuario;
    document.getElementById('editarSenha').value = conta.senha;
    document.getElementById('editarPalavra').value = conta.palavraPasse;
}

function editarConta(event) {
    event.preventDefault();
    const contas = obterContas();
    const usuarioAtual = sessionStorage.getItem(CHAVE_CONTA_ATUAL);
    const indice = contas.findIndex((item) => item.usuario === usuarioAtual);

    if (indice === -1) {
        window.location.href = 'login.html';
        return;
    }

    const contaAtualizada = {
        nome: document.getElementById('editarNome').value.trim(),
        usuario: document.getElementById('editarUsuario').value.trim(),
        senha: document.getElementById('editarSenha').value,
        palavraPasse: document.getElementById('editarPalavra').value.trim()
    };

    contas[indice] = contaAtualizada;
    salvarContas(contas);
    sessionStorage.setItem(CHAVE_CONTA_ATUAL, contaAtualizada.usuario);
    mostrarMensagem('Dados atualizados.');
}