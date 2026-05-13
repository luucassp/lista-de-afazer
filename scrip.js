// CORREÇÃO: class corrigida de 'input-tarafa' para 'input-tarefa'
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa   = document.querySelector('.btn-tarefa');
const listaTarefa = document.querySelector('.tarefa');       // renomeado para evitar conflito com o loop
const listaVazia  = document.querySelector('.lista-vazia');
// Está faltando isso:
const btnTema = document.querySelector('.btn-tema');

// ============================================
// MELHORIA: função centralizada para atualizar
// a mensagem de lista vazia
// ============================================
function atualizaListaVazia() {
  const temItens = listaTarefa.querySelectorAll('li').length > 0;
  listaVazia.style.display = temItens ? 'none' : 'block';
}

// ============================================
// CORREÇÃO: <li> agora usa <span> para o texto
// em vez de innerText — evita conflito com o
// botão "apagar" ao salvar/restaurar tarefas
// ============================================
function criaLi(texto) {
  const li     = document.createElement('li');
  const span   = document.createElement('span');
  span.textContent = texto;   // CORREÇÃO: textContent em vez de innerHTML (seguro contra XSS)
  li.appendChild(span);
  return li;
}

function criBotaoApagar(li) {
  const botaoApagar = document.createElement('button');
  botaoApagar.textContent = 'apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar essa tarefa');
  li.appendChild(botaoApagar);
}

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criarTarefa(textoInput) {
  const li = criaLi(textoInput);
  listaTarefa.appendChild(li);
  criBotaoApagar(li);
  limpaInput();
  salvarTarefa();
  atualizaListaVazia();   // MELHORIA: atualiza mensagem após adicionar
}

// ============================================
// CORREÇÃO: null check antes de parsear o JSON
// Sem isso, JSON.parse(null) lança erro e a
// página quebra na primeira visita (localStorage vazio)
// ============================================
function adicionaTarefaSalva() {
  const salvas = localStorage.getItem('tarefas');
  if (!salvas) return;        // CORREÇÃO: sai se não houver nada salvo

  const lista = JSON.parse(salvas);
  if (!Array.isArray(lista)) return; // segurança extra

  for (const texto of lista) {
    criarTarefa(texto);
  }
}

// ============================================
// CORREÇÃO: pega o texto só do <span>, não do
// <li> inteiro (que inclui o texto "apagar")
// ============================================
function salvarTarefa() {
  const itens = listaTarefa.querySelectorAll('li span'); // CORREÇÃO: era querySelectorAll('li')
  const lista = Array.from(itens).map(span => span.textContent.trim());
  localStorage.setItem('tarefas', JSON.stringify(lista));
}

// ============================================
// EVENTOS
// ============================================

// Enter no input adiciona tarefa
inputTarefa.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {    // MELHORIA: e.key em vez de e.keyCode (moderno)
    if (!inputTarefa.value.trim()) return;
    criarTarefa(inputTarefa.value.trim());
  }
});

// Clique no botão adiciona tarefa
btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value.trim()) return;
  criarTarefa(inputTarefa.value.trim());
});

function alternarTema() {
  document.body.classList.toggle('dark-theme');
  const btnTema = document.querySelector('.btn-tema');
  if (document.body.classList.contains('dark-theme')) {
    btnTema.textContent = '☀️';
    btnTema.setAttribute('title', 'Alternar para tema claro');
  } else {
    btnTema.textContent = '🌙';
    btnTema.setAttribute('title', 'Alternar para tema escuro');
  }
}
btnTema.addEventListener('click', alternarTema);

// Delegação de evento para o botão apagar
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('apagar')) {
    e.target.parentElement.remove();
    salvarTarefa();
    atualizaListaVazia();   // MELHORIA: atualiza mensagem após remover
  }
});

// Carrega tarefas salvas ao abrir a página
adicionaTarefaSalva();
atualizaListaVazia();
