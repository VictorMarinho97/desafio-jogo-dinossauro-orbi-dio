const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) { // O event é enviado pela função toda vez que o usuário pressiona uma tecla pelo navegador.
    if(event.keyCode === 32) {
        console.log("Presionou espaço");
        if(!isJumping) { //Se essa variável for não for verdadeira...
        jump(); //Quando o usuário pressionar espaço, será chamada a função jump.
        }
    }
}

function jump() { //Vai criar intervalos na movimentação do dinossauro para cima
    isJumping = true; //
    let upInterval = setInterval(() => {
         //Limpar a subida.
        if(position >= 150) {
            clearInterval(upInterval); //Função para limpar o intervalo da função atual.
    let downInterval = setInterval(() => { //Criada ainda dentro da condição de aprada da subida.

            //Limpar a descida
            if(position <= 0) {
            clearInterval(downInterval);
            isJumping = false; //Não estará mais pulando.
            } else {
            //Descendo
            position -= 20;
            dino.style.bottom = position + 'px'; //Resgatando o valor do css para a função funcionar e passando que se trata de um px. 
        }
        }, 20); //Código vai ser exevutado a cada 20 milisegundos.

        } else {
            //Subindo.Isso foi feito logo no início da função. Mas pela construção das outras mecânicas, foi ficando aqui.
            position += 20;
            dino.style.bottom = position + 'px'; 
        }
        }, 20);
    }

    function createCactus() {
        const cactus = document.createElement('div'); //Criando novos elementos html com o js
        let cactusPosition = 1000;
        let randomTime = Math.random() * 6000; //Gerando valores aleatórios para os cactos aparecerem. 

        if(isGameOver) return;

        cactus.classList.add('cactus'); //Adicionando classe na nova div
        background.appendChild(cactus); //Adicionando um filho - Colocando a div cactus dentro do background.
        cactus.style.left = cactusPosition + 'px'; //Pegando o posicionamento da esquerda do cactus. O px vai se integrar ao css.
        

        let leftTimer = setInterval(() => { //Movimentando o cacto

            if(cactusPosition < -60) {
                clearInterval(leftTimer); //Limpando o intervalo da tela evitando processamentod desnecessário.
                background.removeChild(cactus); //Também podemos remover elementos do css pelo js.
            } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) { //Condição para o cacto ser removido. Se o tamanho do cacto dor menor que o tamanho do dinossauro.
                //Game over
                clearInterval(leftTimer); //Limpando a esquerda.
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>' //Criando elementos html com o innerHTML.
            } else {
                cactusPosition -= 10; //Velocidade que o cacto vai se mover para a esquerda.
                cactus.style.left = cactusPosition + 'px';
            }
        }, 20);

        setTimeout(createCactus, randomTime); //Executar uma determinada função depois de um determinado tempo. Também temos o conceito de recursividade aqui.
    }

createCactus();
document.addEventListener('keyup', handleKeyUp);