//Código para manipulação de dados na construção de um robo, onde será adicionado ou subtraido pontos em itens como Braços, blindagem, núcleos, etc
//Para melhor desenvolvimento se utiliza nas pesquisas (query) os datas atributes que são atíbuidos no HTML, tais como as classes e os ids. Eles podem ter ou não valores
//Estruturação do código: Primeiro se localiza no os elementos que vão ser manipulados, que no caso são as partes dos robos. Utiliza-se o comando querySelectorAll para achar estes elementos (usando os datas atributes) e a informação é salva em uma const. //Segundo: Utilizou-se um laço de repetição (forEach que é próprio para arrays, tendo em vista que na const controle foram salvas em uma array todos os elementos que possuem o data atribute). Como parametro passou elemento (pode ser qualquer nome) que é todo elemento da array e uma função callback (anonima). Esta função fará: para cada elemento da array será colocado um escutador (addEventListener) que será um click, um parametro chamado evento (são informações HTML) e uma outra função callback. Esta nova função vai chamar a função manipulaDados (descrita abaixo) com dois parametros: um que que vai trazer a informação do data atribute onde foi clicado e outro que vai trazer o pai deste data atribute
//Terceiro: A função manipulaDados recebe dois parametros que é a operação (evento.target.dataset.controle) e controle (evento.target.parentNode). Primeiramente esta função irá salvar na const peca a pesquisa feita somente dentro do elemento pai (a DIV, no caso) o data atribute buscado. Após isso sera incrementado em +1 caso o valor do data atibute controle seja "+" (valor este colocado no HTML) ou decrementar 1 caso seja "-"
//Quarto: Para atualizar as estatísticas de poder do robo. Na const pecas foi dado um conjnto objetos que possuem valores para cada parte do robo, que somam ou diminuem a quantidade do poder. Cada vez que for somado ou subtraído uma melhoria (braços ou blindagem, por exemplo) serão atualizado os valores de poder. Para isso foi criado uma função chamada atualizaEstatisticas que primeiramente recebeu como parametro o data set (texto do data-atribute) do data pecas. Esta função irá rodar um forEach em cima da const estatisticas, que recebeu uma query com todos os data-estatiticas do HTML. Para cada elemento do HTML localizado ele vai atualizar os dados na posição clicada

/* 1*/ const controle = document.querySelectorAll("[data-controle") //.[data-controle] é o nome do data atribute onde estão as partes do robo. Para pesquisa de data atributes eu uso []
const estatisticas = document.querySelectorAll('[data-estatistica]')

const pecas = { //Objeto de objetos
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos": {
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas": {
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes": {
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

/*2*/
controle.forEach((elemento) => { //forEach é um laço de repetição própria para arrays. Recebe como parametro os elementos da própria array e uma função callback
    elemento.addEventListener('click', (evento) => {//o parametro evento está relacionado com que acontece quando for clicado (devido ao "click" anterior), trazendo informações html do elemento
        manipulaDados(evento.target.dataset.controle, evento.target.parentNode) //A função manipula dados recebe dois parametros: 1- evento.target.textContent: evento traz informações html da página, onde o target é o nome onde o click aconteceu e dataset.controle é o dado contido dentro do data atribute. 2- evento.target.parentNode: evento, target e parentNode é o pai do elemento onde foi clicado (no caso como o elemento clicado foi uma button o pai dele é a Div logo acima, por isso será pego o elemento DIV)
        atualizaEstatisticas(evento.target.dataset.pecas)
    })
})


/*3*/ 
function manipulaDados(operação, controle) { //parametros referentes a (evento.target.textContent, evento.target.parentNode)
    const peca = controle.querySelector("[data-contador") //No caso, devido aos parametros passados acima, nesta const será pesquisado dentro do item controle (todos os elementos que possuem a classe controle-ajuste). A pesquisa será somente feita dentro do elemento pai, e não em todo o documento
    if (operação === "-") {
        peca.value = parseInt(peca.value) - 1
    } else {
        peca.value = parseInt(peca.value) + 1 //usou o parseInt para podermos somar +1, se não o JS entende que é uma string e apenas concatena o 1
    }
}

/*4*/
function atualizaEstatisticas(peca) {
    estatisticas.forEach((elemento) => { //estatisticas é a cons acima que está recebendo a query do data-estatistica
        elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica] // elemento é o elemento de cada item do array da const estatisticas e textcontent é o texto das tags onde está cada um dos data-atributes(no caso, por exemplo, data-estatistica ="forca", será pego o texto daquela tag). Parsetint é para transformar em um número a string. A isso (elemento.textContent). A ele será somado a const pecas (que é um conjunto de objetos), na posição peca (que recebe por parametro o dataset, que é o texto do data-atribute, por exemplo,  data-estatistica ="forca" será pego o texto forca) e na posição do elemento clicado, pegando o seu dataset do data atribute estatiscica (exemplo: data-estatistica="energia" será pego o texto energia)
        

    })
}