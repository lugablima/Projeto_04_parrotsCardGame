let cardsSelecionados = []; 
let quantJogadas = 0;
// let tempoSeg = 0;
let quantidadeCartas = Number(prompt("Com quantas cartas você quer jogar?"));

while (((quantidadeCartas % 2) !== 0) || (quantidadeCartas < 4) || (quantidadeCartas > 14)) {
    quantidadeCartas = Number(prompt("Com quantas cartas você quer jogar?"));    
}

distribuirCartas();

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
    let lista = document.querySelectorAll(".acertou");

    if(lista.length === quantidadeCartas) {
        fimDeJogo();
    } else {
        lista = [];
    }
}

function fimDeJogo() {
    alert(`Você ganhou em ${quantJogadas} jogadas!`);
}

// function iniciarCronômetro() {
//     elemento = document.querySelector(".cronometro");
//     elemento.innerHTML = tempo;
//     setInterval(incrementarTempo, 1000);
// }

// function incrementarTempo() {
//     elemento = document.querySelector(".cronometro");
//     tempoSeg++;
//     elemento.innerHTML = tempoSeg;
// }