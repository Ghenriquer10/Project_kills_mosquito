// Recuperando o tamanho da tela em que o jogo será executado 

var altura = 0
var largura = 0
var vida = 1
var tempo = 10




// Através do window.innerHeight e window.innerWidth é possívell recuperar a altura e largura respectivamente da tela disponivel do browser
// Com isso criamos uma função, que quando a tela for redimensionada, a mesma será chamada. É possivel saber quando a tela do browser foi
// redimensionada usando o método DOM onresize()
function tamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}

// Chamando a função assim que a tela é carregada
tamanhoPalcoJogo()

// Aqui recuperamos o nível selecionado de acordo com o parametro
// passado em seu link

var nivelLink = window.location.search
nivelLink = nivelLink.replace('?', '')
// É possível recuperar uma string retirando determinada letra do seu conteúdo
// Para isso usamos o replace()


var mosquitoTempo = 1500

if (nivelLink === 'facil') {
    mosquitoTempo = 1500
} else if (nivelLink === 'dificil') {
    mosquitoTempo = 1000
} else if (nivelLink === 'nem_tenta') {
    mosquitoTempo = 750
} else if (nivelLink === 'karenCris') {
    mosquitoTempo = 350
}



//Criando intervalo do cronometro e ao mesmo tempo fazendo com que ao final
//do cronometro sejam tomadas as decisões em ir para a página de vitória ou
// página de derrota
var cronometro = setInterval(function () {
    tempo -= 1
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }
    document.getElementById('cronometro').innerHTML = tempo
}, 1000)

/*
É necessário fazer com que o mosquito apareça randomicamente em variádos pontos da jenala disponivel do browser
é possível fazer isso definindo alturas e larguras randomicamente gerando números aleátorios através da função Math.random(), que geram números alea.
entre 0,0 e 1,0
em seguida, para que esses números estejam de acordo com os limites da janela do browser, multiplicamos eles com a altura e largura já obtidos anteriormente
e quebramos suas casas decimais com o Math.floor()
*/

function posicaoRandomica() {

    // é testado caso haja alguma div com o nome mosquito, se sim, o mesmo será removido
    // para ser inserido outro
    // Caso não seja aplicado, aparecerão vários elementos no browser

    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        if (vida > 3) {
            window.location.href = "fim_jogo.html";
        } else {
            document.getElementById('vida' + vida).src = 'imagens/coracao_vazio.png'
            vida++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 200
    var posicaoY = Math.floor(Math.random() * altura) - 200

    posicaoY = posicaoY < 0 ? 0 : posicaoY
    posicaoX = posicaoX < 0 ? 0 : posicaoX

    console.log(posicaoX, posicaoY)

    // O próximo passo é criar um elemento HTML de forma programática
    //Através do document.createElemente() é possível criar elementos html e adicionarmos a variáveis

    var mosquito = document.createElement('img')

    // Ao definir qual será o tipo do elemento criado: img, é possível definir a imagem que ele pode receber

    mosquito.src = 'imagens/mosquito.png'

    // No mosquito.className definimos qual o nome da classe que o mosquito receberá
    // fazendo com que o mesmo receba diferentes tipos de classes 

    mosquito.className = tamanhoMosquito() + ' ' + ladoMosquito()

    //É possível formatar cada parte do estilo através do elemento style seguindo do atributo requerido

    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
    }

    // Para incluir elemntos no body do browwser usamos o document.body.appendChild()

    document.body.appendChild(mosquito)


}

/*
Aqui é possível definir tamanhos aleátorios para o mosquito
*/

function tamanhoMosquito(classe) {

    classe = Math.floor(Math.random() * 3)
    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'

    }

}

/*
Aqui é possível definir lados aleátorios para o mosquito
*/
function ladoMosquito() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
