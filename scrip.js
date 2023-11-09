const inputTarefa = document.querySelector ('.input-tarafa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefa = document.querySelector('.tarefa');

function criaLi (){
    const li = document.createElement('li');
    return li ;
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 ){
        // console.log('enter precionado')
        
        if (!inputTarefa.value) return 
        criarTarefa(inputTarefa.value);
    }
});

function limpaInput() {  inputTarefa. value = '';
inputTarefa.focus();}

function criBotaoApagar (li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML= 'apagar';
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'apagar essa tarefa')
    li.appendChild(botaoApagar)
}

function criarTarefa (textoInput) {
    console.log(textoInput);
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefa.appendChild(li);
    limpaInput();
    criBotaoApagar(li);
    salvarTarefa();
    
}


    btnTarefa.addEventListener('click', function() { 
        if (!inputTarefa.value) return 
        // console.log(inputTarefa.value);
        criarTarefa(inputTarefa.value);
    });
    document.addEventListener ('click', function(e){
        const el = e.target;
        // console.log(el)

        if (el.classList.contains('apagar')){
            el.parentElement.remove();
            salvarTarefa();
        }});

        function salvarTarefa(){
            const liTarefas = tarefa.querySelectorAll('li');
            const listaDeTarefas = [];

            for (let tarefa of liTarefas) {
                let tarefaTexto = tarefa.innerText;
                tarefaTexto = tarefaTexto.replace('apagar', '').trim();
                listaDeTarefas.push(tarefaTexto);           
             }

            const tarafasJSON =  JSON.stringify(listaDeTarefas);
            console.log(tarafasJSON);
            localStorage.setItem('tarefas', tarafasJSON);
                    }


                function adicionaTarefaSalva () {
                
                    const tarafas = localStorage.getItem('tarefas');
                    const listaDeTarefas = JSON.parse(tarafas);
                 
                    for (let tarafa of listaDeTarefas)
                    {
                        criarTarefa(tarafa);
                    }
                }
                
                adicionaTarefaSalva();