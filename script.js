
const conteudo = document.getElementById("conteudoInfo");
const popup = document.getElementById("popup");

const botaoAbrir = document.getElementById("abrirInfo");
const botaoFechar = document.getElementById("fecharPopup");

const conteudoOriginal = conteudo.innerHTML;

let temporizadorCorrupcao = null;
let animacaoCorrupcao = null;

const textoFinal = `uma madrasta cruel envia sua enteada para a floresta no inverno para morrer, 
abandonando-a sob uma árvore sem qualquer esperança de sobrevivência. 
Morozko a encontra lá e começa a congelá-la gradualmente, perguntando repetidamente: 
"Você está com calor, minha querida?". A cada vez, apesar da crescente agonia,
a menina responde educadamente que está quente e confortável, recusando-se a reclamar ou implorar.
Comovido por sua paciência e boas maneiras, e não por qualquer feitiço ou barganha,
Morozko a recompensa com peles quentes, joias e um baú de tesouros, e a envia para casa viva e transformada.`;

function iniciarCorrupcao() {
    const textoOriginal = conteudo.innerText;
    const caracteres = "▓▒░█#%&@$!?/\\<>01アイウエオ";
    const duracao = 1000;
    const intervalo = 50;
    const inicio = Date.now();

    const tamanho = Math.max(
        textoOriginal.length,
        textoFinal.length
    );

    conteudo.classList.add("corrompido");

    animacaoCorrupcao = setInterval(() => {
        const progresso = Math.min(
            (Date.now() - inicio) / duracao,
            1
        );

        let resultado = "";

        for (let i = 0; i < tamanho; i++) {
            const original = textoOriginal[i] || "";
            const final = textoFinal[i] || "";

            if (Math.random() < progresso) {
                resultado += final;
            } else if (original === "\n") {
                resultado += "\n";
            } else {
                resultado += caracteres[
                    Math.floor(Math.random() * caracteres.length)
                ];
            }
        }

        conteudo.textContent = resultado;

        if (progresso >= 1) {
            clearInterval(animacaoCorrupcao);
            animacaoCorrupcao = null;
            conteudo.textContent = textoFinal;
        }
    }, intervalo);
}

function abrirPopup() {
    popup.style.display = "flex";

    // Reinicia o conteúdo original
    conteudo.innerHTML = conteudoOriginal;
    conteudo.classList.remove("corrompido");

    // Cancela qualquer temporizador anterior
    clearTimeout(temporizadorCorrupcao);

    if (animacaoCorrupcao) {
        clearInterval(animacaoCorrupcao);
        animacaoCorrupcao = null;
    }

    // Começa uma nova contagem de 30 segundos
    temporizadorCorrupcao = setTimeout(
        iniciarCorrupcao,
        30000
    );
}

function fecharPopup() {
    popup.style.display = "none";

    // Cancela a contagem
    clearTimeout(temporizadorCorrupcao);
    temporizadorCorrupcao = null;

    // Interrompe a animação, se estiver acontecendo
    if (animacaoCorrupcao) {
        clearInterval(animacaoCorrupcao);
        animacaoCorrupcao = null;
    }

    // Restaura o texto para a próxima abertura
    conteudo.innerHTML = conteudoOriginal;
    conteudo.classList.remove("corrompido");
}

botaoAbrir.addEventListener("click", abrirPopup);
botaoFechar.addEventListener("click", fecharPopup);

// Fecha ao clicar fora do conteúdo
popup.addEventListener("click", (evento) => {
    if (evento.target === popup) {
        fecharPopup();
    }
});

// Fecha ao pressionar Esc
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && popup.style.display === "flex") {
        fecharPopup();
    }
});