
const candidatos = [];
const sorteados = new Set();

let sorteando = false;

// ENTRAR NO SISTEMA
function entrar() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (usuario === "admin" && senha === "1234") {
        document.getElementById("login").hidden = true;
        document.getElementById("painel").hidden = false;
    } else {
        mensagem.textContent = "Usuário ou senha incorretos!";
    }
}

// CADASTRAR CANDIDATO
function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const informacoes = document.getElementById("informacoes").value.trim();

    if (!nome) {
        alert("Digite o nome do candidato!");
        return;
    }

    candidatos.push({
        nome: nome,
        informacoes: informacoes
    });

    document.getElementById("nome").value = "";
    document.getElementById("informacoes").value = "";

    mostrarCandidatos();
}

// MOSTRAR CANDIDATOS
function mostrarCandidatos() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    candidatos.forEach((candidato, indice) => {
        const item = document.createElement("div");

        const titulo = document.createElement("strong");
        titulo.textContent = (indice + 1) + ". " + candidato.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent = candidato.informacoes;

        item.appendChild(titulo);
        item.appendChild(detalhes);
        lista.appendChild(item);
    });
}

// REALIZAR SORTEIO
function sortear() {
    if (sorteando) return;

    const disponiveis = candidatos
        .map((candidato, indice) => ({
            candidato: candidato,
            numero: indice + 1
        }))
        .filter(item => !sorteados.has(item.candidato));

    if (disponiveis.length === 0) {
        alert("Todos os candidatos já foram sorteados!");
        return;
    }

    sorteando = true;

    const botao = document.getElementById("botaoSorteio");
    const dado = document.getElementById("dado");
    const cubo = document.getElementById("cubo");
    const nomeRoleta = document.getElementById("nomeRoleta");
    const roleta = document.getElementById("roleta");
    const resultado = document.getElementById("resultado");

    botao.disabled = true;
    cubo.classList.add("girando");
    dado.classList.add("rolando");
    resultado.innerHTML = "";
    roleta.classList.remove("ganhador");

    const vencedor =
        disponiveis[Math.floor(Math.random() * disponiveis.length)];

    let contador = 0;

    function girar() {
        const numero = disponiveis[
            Math.floor(Math.random() * disponiveis.length)
        ].numero;


        nomeRoleta.textContent = "SORTEANDO...";
        contador++;

        if (contador < 25) {
            setTimeout(girar, 70);
        } else if (contador < 35) {
            setTimeout(girar, 100 + (contador - 25) * 65);
        } else {
            finalizar();
        }
    }

    function finalizar() {
        cubo.classList.remove("girando");
        dado.classList.remove("rolando");

        const lados = [
            "rotateX(0deg) rotateY(0deg)",
            "rotateX(0deg) rotateY(180deg)",
            "rotateX(0deg) rotateY(-90deg)",
            "rotateX(0deg) rotateY(90deg)",
            "rotateX(-90deg) rotateY(0deg)",
            "rotateX(90deg) rotateY(0deg)"
        ];

        cubo.style.transform = lados[
            Math.floor(Math.random() * lados.length)
        ];
        nomeRoleta.textContent = "🏆 " + vencedor.candidato.nome;

        roleta.classList.add("ganhador");

        resultado.textContent =
            "🎉 VENCEDOR: " + vencedor.candidato.nome;

        sorteados.add(vencedor.candidato);

        const item = document.createElement("div");

        item.textContent =
            "🏆 Concorrente nº " + vencedor.numero +
            " — " + vencedor.candidato.nome;

        document.getElementById("historico").appendChild(item);

        botao.disabled = false;
        sorteando = false;
    }

    girar();
}
