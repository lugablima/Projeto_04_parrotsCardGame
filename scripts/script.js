let quantidadeCartas;
let cardsSelecionados = []; 
let quantJogadas;
let tempoSeg;
let idSetInterval = 0;
let lista;

inicioJogo();

function inicioJogo() {
    tempoSeg = 0;
    quantJogadas = 0;
    quantidadeCartas = 0;

    quantidadeCartas = Number(prompt("Com quantas cartas você quer jogar? (Obs: Digite apenas números pares de 4 e 14)"));

    while (((quantidadeCartas % 2) !== 0) || (quantidadeCartas < 4) || (quantidadeCartas > 14)) {
        quantidadeCartas = Number(prompt("Com quantas cartas você quer jogar? (Obs: Digite apenas números pares de 4 e 14)"));    
    }
    
    distribuirCartas();
    iniciarCronometro();
}


function distribuirCartas() {
    const elemento = document.querySelector(`.card${quantidadeCartas}`);
    let arrayImagens = [
        "./images/bobrossparrot.gif",
        "./images/explodyparrot.gif",
        "./images/fiestaparrot.gif",
        "./images/metalparrot.gif",
        "./images/revertitparrot.gif",
        "./images/tripletsparrot.gif",
        "./images/unicornparrot.gif" 
    ];  
    let arrayCards = [];

    arrayImagens = arrayImagens.sort(comparador);
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < quantidadeCartas / 2; j++) {
            arrayCards.push(arrayImagens[j]);
        }
    }

    arrayCards = arrayCards.sort(comparador);

    elemento.innerHTML = "";
    for(let k = 0; k < quantidadeCartas; k++) {
        elemento.innerHTML += `
        <div class="card" onclick="virarCarta(this)">
            <div class="frente face">
                <img src="./images/front.png"/>
            </div>
            <div class="verso face">
                <img src="${arrayCards[k]}"/>
            </div>
        </div>
        `;
    }
    
    elemento.classList.remove("oculto");
} 

function virarCarta(elemento) {
    let card = {
        cardElement: elemento,
        source: elemento.querySelector(".verso > img").attributes.src.value
    }

    if((cardsSelecionados.length < 2) && (elemento.classList.contains("acertou") === false) && (elemento.classList.contains("selecionado") === false)) {
        card.cardElement.classList.add("selecionado");
        cardsSelecionados.push(card);
        quantJogadas++;

        console.log(cardsSelecionados.length);
        if(cardsSelecionados.length === 2) {
            console.log("Entrei no primeiro if");
            if(cardsSelecionados[0].source === cardsSelecionados[1].source) {
                console.log("Entrei no segundo if");
                for(let i = 0; i < cardsSelecionados.length; i++) {
                    cardsSelecionados[i].cardElement.classList.add("acertou");
                    cardsSelecionados[i].cardElement.classList.remove("selecionado");
                }
                cardsSelecionados = [];
                contarCartasViradas();
            } else {
                console.log("Entrei no else");
                setTimeout(desvirarCarta, 1000);
            }
        } 
    }
}

function desvirarCarta() {
    // let selecionado = document.querySelectorAll(".selecionado");
    console.log("Entrei no setTimeout");

    for(let j = 0; j < cardsSelecionados.length; j++) {
        cardsSelecionados[j].cardElement.classList.remove("selecionado");
    }

    cardsSelecionados = [];
}


function comparador() { 
	return Math.random() - 0.5; 
}

function contarCartasViradas() {
    lista = document.querySelectorAll(".acertou");

    if(lista.length === quantidadeCartas) {
        clearInterval(idSetInterval);
        setTimeout(fimDeJogo, 2000);
    } else {
        lista = [];
    }
}

function fimDeJogo() {
    alert(`Você ganhou em ${quantJogadas} jogadas e em ${tempoSeg} segundos!`);
    let respostaReinicio = prompt(`Você gostaria de reiniciar a partida? (Obs: Digite "sim" ou "não")`);
    // respostaReinicio = respostaReinicio.toLowerCase();
    // if (respostaReinicio !== "sim"){
    //     if respostaReinicio.includes("ã",1)
    // }

    while((respostaReinicio !== "sim") && (respostaReinicio !== "não")) {
        alert(`Entrada inválida! Digite "sim" ou "não"`);
        respostaReinicio = prompt(`Você gostaria de reiniciar a partida? (Obs: Digite "sim" ou "não")`);
    } 
    
    if(respostaReinicio === "sim") {
        const elemento = document.querySelector(`.card${quantidadeCartas}`);
        const el = document.querySelector(".cronometro h6:nth-child(2)");

        for(let k = 0; k < lista.length; k++) {
            lista[k].classList.remove("acertou");
        }

        el.innerHTML = `0 s`;
        elemento.classList.add("oculto");
        inicioJogo();
    }
}

function iniciarCronometro() {
    elemento = document.querySelector(".cronometro h6:nth-child(2)");
    elemento.innerHTML = `${tempoSeg} s`;
    idSetInterval = setInterval(incrementarTempo, 1000);
}

function incrementarTempo() {
    elemento = document.querySelector(".cronometro h6:nth-child(2)");
    tempoSeg++;
    elemento.innerHTML = `${tempoSeg} s`;
}