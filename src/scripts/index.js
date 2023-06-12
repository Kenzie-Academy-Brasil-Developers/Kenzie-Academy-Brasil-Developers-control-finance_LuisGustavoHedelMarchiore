/* Desenvolva sua lógica aqui */

{/* <li class="list-item__container">
<p class="item__text">R$ <span class="item__span">20,00</span></p>
<div class="item-div__container">
  <button class="item__button">Entrada</button>
  <img class="item__image" src="./src/assets/trash.svg" alt="trash">
</div>
</li> */}

function renderCards(itens, filter){
    const ulTag = document.querySelector(".section-list__container");
    ulTag.innerHTML = "";
    var reder = [];
    console.log(itens);

    itens.forEach(item => {
        if (item.categoryID == filter) {
            reder.push(item);
        } else if(filter == 2){
            reder.push(item)
        }
    })

    reder.forEach(item => {
        const liTag = document.createElement("li");
        const pTag = document.createElement("p");
        const spanTag = document.createElement("span");
        const divTag = document.createElement("div");
        const buttonTag = document.createElement("button");
        const imgTag = document.createElement("img");
    
        liTag.className = "list-item__container";
        liTag.id = `item-${item.id}`
        pTag.classList = "item__text";
        spanTag.classList = "item__span";
        divTag.classList = "item-div__container"
        buttonTag.classList = "item__button";
        imgTag.classList = "item__image";
        imgTag.id = item.id;

        pTag.innerText = "R$ ";
        if (item.categoryID == 0) {
            buttonTag.innerText = "Entrada"
        } else{
            buttonTag.innerText = "Saida"
        }
        spanTag.innerText = formatVAlue(item.value); 
        imgTag.src = './src/assets/trash.svg';
        imgTag.alt = 'trash';

        imgTag.onclick = removeProdutoDoCarrinho;
    
        pTag.appendChild(spanTag);
        divTag.appendChild(buttonTag);
        divTag.appendChild(imgTag);
        liTag.appendChild(pTag);
        liTag.appendChild(divTag);
        ulTag.appendChild(liTag);
    });
    sumValues(reder)
}

function formatVAlue(valor) {
    const valorFormatado = parseFloat(valor).toFixed(2);
    return valorFormatado.replace(".", ",");
}

function sumValues(array){
    const spanTag = document.querySelector(".section__span");
    
    const sum = array.reduce((accunulator, array) => accunulator + array.value, 0);
    const sumFor = formatVAlue(sum);

    spanTag.innerText = sumFor
}

function iputValidate(){
    const input = document.querySelector('.section-dialog__input');

    input.addEventListener('input', function(event) {
        const valor = event.target.value;
        const apenasNumeros = valor.replace(/\D/g, '');
        
        if (valor !== apenasNumeros) {
            event.target.value = apenasNumeros;
        }
    });

}

function addItem() {
    const input = document.querySelector('.section-dialog__input');
    const valor = input.value;
    const modalContainer = document.querySelector(".dialog__controller");
  
    const botaoEntrada = document.querySelector('.section-dialog__button[value="0"]');
    const botaoSaida = document.querySelector('.section-dialog__button[value="1"]');
    const tipoValor = botaoEntrada.classList.contains('active') ? 1 : 0;

    const newItem ={
        id: insertedValues.length + 1,
        value: parseFloat(valor),
        categoryID: tipoValor,
    }

    insertedValues.push(newItem);
    renderCards(insertedValues, 2);
    clearModal()
  }

  function clearModal(){
    const input = document.querySelector('.section-dialog__input');
    const botaoEntrada = document.querySelector('.section-dialog__button[value="0"]');
    const botaoSaida = document.querySelector('.section-dialog__button[value="1"]');
    const modalContainer = document.querySelector(".dialog__controller");

    input.value = ""
    botaoEntrada.classList.remove('active');
    botaoSaida.classList.remove('active');
    modalContainer.close();
  }

  function selecionarTipoValor(button) {
    // Remove a classe 'active' de todos os botões
    const botoes = document.querySelectorAll('.section-dialog__button');
    botoes.forEach(botao => botao.classList.remove('active'));
  
    // Adiciona a classe 'active' apenas no botão clicado
    button.classList.add('active');
  }

  function removeProdutoDoCarrinho(event) {
    const idProdutoNaDOM = event.target.id;
    const index = insertedValues.findIndex(produto => produto.id == idProdutoNaDOM);
  
    if (index !== -1) {
      const produtoRemovido = insertedValues.splice(index, 1)[0];
      const element = document.querySelector(`#item-${event.target.id}`);
      element && element.remove();
      sumValues(insertedValues);
    }
  }
  
  function removeDoCarrinho(produto) {
    const index = insertedValues.findIndex(item => item.id === produto.id);
    
    if (index !== -1) {
      const removedProduct = insertedValues.splice(index, 1)[0];
      return removedProduct;
    }
  }
  

renderCards(insertedValues, 2);
iputValidate();