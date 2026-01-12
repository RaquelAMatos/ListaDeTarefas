const taskInput = document.getElementById("taskInput")
const btnadd = document.getElementById("btnadd")
const taskList = document.getElementById("taskList")

let tarefas = []


function mostrarTarefa(tarefa){
  let li = document.createElement("li")
  li.classList.add("elemento")
  li.dataset.id = tarefa.id

  if(tarefa.concluida){
    li.classList.add("concluida")
  }
   let p = document.createElement("p")
   p.classList.add("texto")
   p.textContent = tarefa.texto
   li.appendChild(p)
  let divIcons = document.createElement("div")
  divIcons.classList.add("divIcons")
  li.appendChild(divIcons)

  let iconCheck = document.createElement("i")
  iconCheck.classList.add("fa-solid","fa-check","icon")
  divIcons.appendChild(iconCheck)

  let iconTrash = document.createElement("i")
  iconTrash.classList.add("fa-regular","fa-trash-can","icon")
  divIcons.appendChild(iconTrash)

  // Evento de concluir tarefa
  iconCheck.addEventListener("click", (e) => {
    e.stopPropagation()
    li.classList.toggle("concluida")
    tarefa.concluida = !tarefa.concluida
    salvarTarefas()
  })


  iconTrash.addEventListener("click", () => {
    const index = tarefas.findIndex(t => t.id === tarefa.id)
    if(index !== -1){
      tarefas.splice(index,1)
    }
    li.remove()
    salvarTarefas()
  })

  taskList.appendChild(li)
}


function adicionarTarefa(){
  const texto = taskInput.value.trim()
  if(!texto){
    return
  }

  const tarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false
  }

  tarefas.push(tarefa)
  salvarTarefas()
  mostrarTarefa(tarefa)

  taskInput.value = ""
  taskInput.focus()
}


function salvarTarefas(){
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}


function carregarTarefas(){
  const dados = localStorage.getItem("tarefas")
  if(!dados){
    return
  }
  tarefas = JSON.parse(dados)
  tarefas.forEach((tarefa) => {
    mostrarTarefa(tarefa)
  })
}

btnadd.addEventListener("click", () => {
  adicionarTarefa()
})

taskInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    adicionarTarefa()
  }
})

carregarTarefas()
