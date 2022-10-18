const tiles = document.querySelector('.tile-container');//div das peças
const backspaceAndEnterRow = document.querySelector('#backspaceAndEnterRow')
const keyboardFirstRow = document.querySelector('#keyboardFirstRow')//primeira div das letras
const keyboardSecondRow = document.querySelector('#keyboardSecondRow')//segunda div das letras
const keyboardThirdRow = document.querySelector('#keyboardThirdRow')//terceira div das letras

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6;
const columns = 5;
let currentRow = 0;
let currentColumn = 0;
let letreco = 'RADIO';
let letrecoMap = {}
for (let index = 0; index < letreco.length; index++){
  letrecoMap[letreco[index]] = index//adiciona c a m p o em letrecoMap
}
// console.log(letrecoMap)

const guesses = []//adicionando as letra erradas q o jogador digita

//a cada uma linha adiciona 5 colunas
for(let rowIndex = 0; rowIndex < rows; rowIndex++){//adiciona as colunas a cada linha
    guesses[rowIndex] = new Array(columns)//matriz

    const tileRow = document.createElement('div')//Criando uma div
    tileRow.setAttribute('id', 'row' + rowIndex)//adicionando id row na div + numero dela
    tileRow.setAttribute('class', 'tile-row')//adicionando class na div
    for(let columnIndex = 0; columnIndex < columns; columnIndex++){
        const tileColumn = document.createElement('div')//criando div
        tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex)//adicionando id row + numero dela,
        //e tambem adicionando column como id + numero dela
        tileColumn.setAttribute("class", rowIndex === 0 ? "tile-column typing":"tile-column disabled")//
        tileRow.append(tileColumn)//adicionando a coluna na fileira

        guesses[rowIndex][columnIndex] = "";//matriz 6 linhas e 5 colunas
    }
    tiles.append(tileRow)//adicionando a fileira na div tile-container
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("")//coloca a matriz como vazia
  if(guess.length !== columns){//verifica a matriz guess tem a mesma quantidade de colunas
    return;//nao retorna nada
  }
  var currentColumns = document.querySelectorAll(".typing");//seleciona todas as typing
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];//letra que vamos verificar
    if (letrecoMap[letter] === undefined) {//se a palavra que eu digitar estiver errada fica vermelho
        currentColumns[index].classList.add("wrong")
    } else {
        if(letrecoMap[letter] === index) {//se a palavra estiver certo fica verde
            currentColumns[index].classList.add("right")
        } else {
            currentColumns[index].classList.add("displaced")//se ela nao estiver nem errada e nem certa fica amarelo
        }
    }
  }
 

  if(guess === letreco) {//se a palavra q eu digitar for = a da variavel letreco
    window.alert("NICEEEEEE!")
    return
} {
    if(currentRow === rows -1) {
        window.alert("You Lose!")
    } else {
        moveToNextRow()
    }
}
};

const moveToNextRow = () => {
  var typingColumns = document.querySelectorAll(".typing")//seleciona todas as typing
  for (let index = 0; index < typingColumns.length; index++) {
      typingColumns[index].classList.remove("typing")//tira cor preta
      typingColumns[index].classList.add("disabled")//adiciona outra cor
  }
  currentRow++
  currentColumn=0

  const currentRowEl = document.querySelector("#row"+currentRow)
  var currentColumns = currentRowEl.querySelectorAll(".tile-column")//todos que tem tile-column
  for (let index = 0; index < currentColumns.length; index++) {
      currentColumns[index].classList.remove("disabled")//remova a outra cor
      currentColumns[index].classList.add("typing")//adiciona cor preta
  }
}

    const handleKeyboardOnClick = (key) => {//dizendo que a funcao é igual a tecla digitada
        if(currentColumn === columns){//currentColumn roda a cada vez que escolho uma letra, columns numero de colunas = 5
            return;
        }
        const currentTile = document.querySelector('#row' + currentRow + 'column' + currentColumn);
        // coloca em currentTitle row  + numero + column + numero
        currentTile.textContent = key;//dizendo q o conteudo da div = letra

        guesses[currentRow][currentColumn] = key;//dizendo que a matriz = a letra
        currentColumn++;//adicionando a proxima coluna
        // console.log(guesses)
    };

const createKeyboardRow = (keys, keyboardRow) => {
    keys.forEach((key) => {//key = letras separadamente, keys = todas as letras juntas,
    //keyboardRow = div que contem as letras
      var buttonElement = document.createElement("button");//cria um botao
      buttonElement.textContent = key;//dizendo que cada um dos button = as letras
      buttonElement.setAttribute("id", key);//colocando id em cada uma das letras
      buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));//amostra o que tem na tecla precionada
      keyboardRow.append(buttonElement);//adiciona o button na div
    });
  };
  
  createKeyboardRow(keysFirstRow, keyboardFirstRow);//primeiro puxa as letras, segundo puxa a div
  createKeyboardRow(keysSecondRow, keyboardSecondRow);
  createKeyboardRow(keysThirdRow, keyboardThirdRow);


  const handleBackspace = () => {
    if(currentColumn === 0){//sempre que for vazio nao muda nada
      return
    }
    currentColumn--;//faz voltar nas colunas
    guesses[currentRow][currentColumn] = ''
    const tile = document.querySelector('#row' + currentRow + 'column' + currentColumn)
    tile.textContent = '';//apaga o texto
  }
  const backspaceButton = document.createElement("button");//cria um button
  backspaceButton.addEventListener('click', handleBackspace)//evento de click
  backspaceButton.textContent = "<"//adiciona como resultado < no button
  backspaceAndEnterRow.append(backspaceButton);//adiciona button na div

  const enterButton = document.createElement("button");//cria um button
  enterButton.addEventListener('click', checkGuess)//evento de click
  enterButton.textContent = "ENTER"//adiciona como resultado < no button
  backspaceAndEnterRow.append(enterButton);//adiciona button na div

  document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){//eventao padrao de click no enter
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}
