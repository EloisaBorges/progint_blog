const input = document.getElementById("taskInput");
const botao = document.getElementById("addBtn");
const lista = document.getElementById("taskList");
const contador = document.getElementById("contador");

carregarTarefas();

botao.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {

    if (input.value.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    criarTarefa(input.value);

    input.value = "";

    salvarTarefas();
    atualizarContador();
}

function criarTarefa(texto, concluida = false) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    if (concluida) {
        span.classList.add("completed");
    }

    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        salvarTarefas();
        atualizarContador();
    });

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";

    excluir.addEventListener("click", function () {
        li.remove();
        salvarTarefas();
        atualizarContador();
    });

    li.appendChild(span);
    li.appendChild(excluir);

    lista.appendChild(li);
}

function salvarTarefas() {

    let tarefas = [];

    document.querySelectorAll("li").forEach(function (li) {

        tarefas.push({
            texto: li.querySelector("span").textContent,
            concluida: li.querySelector("span").classList.contains("completed")
        });

    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach(function (tarefa) {
        criarTarefa(tarefa.texto, tarefa.concluida);
    });

    atualizarContador();
}

function atualizarContador() {

    let pendentes = document.querySelectorAll("span:not(.completed)").length;

    contador.textContent = "Pendentes: " + pendentes;
}