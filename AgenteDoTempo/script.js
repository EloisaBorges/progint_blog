function atualizarDataHora() {
    const data = new Date();

    console.log(data.getDate());
    console.log(data.getMonth());
    console.log(data.getFullYear());
    console.log(data.getHours());
    console.log(data.getMinutes());
    console.log(data.getSeconds());
    console.log(data.getMilliseconds());

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    const milissegundos = data.getMilliseconds();

    document.getElementById("dia").textContent = dia;
    document.getElementById("mes").textContent = mes;
    document.getElementById("ano").textContent = ano;
    document.getElementById("hora").textContent = hora;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
    document.getElementById("milissegundos").textContent = milissegundos;

    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");
    const horaFormatada = String(hora).padStart(2, "0");
    const minutosFormatados = String(minutos).padStart(2, "0");
    const segundosFormatados = String(segundos).padStart(2, "0");

    document.getElementById("relogio").textContent =
        `${diaFormatado}/${mesFormatado}/${ano} ${horaFormatada}:${minutosFormatados}:${segundosFormatados}`;
}

setInterval(atualizarDataHora, 1000);
atualizarDataHora();

function calcularIdade() {
    const campoNascimento = document.getElementById("nascimento").value;

    if (campoNascimento === "") {
        document.getElementById("resultadoIdade").textContent =
            "Por favor, informe sua data de nascimento.";
        return;
    }

    const nascimento = new Date(campoNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
        idade--;
    }

    document.getElementById("resultadoIdade").textContent =
        `Você tem ${idade} anos.`;
}

function proximoAniversario() {
    const campo = document.getElementById("dataAniversario").value;

    if (campo === "") {
        document.getElementById("resultadoAniversario").textContent =
            "Informe sua data de nascimento.";
        return;
    }

    const partes = campo.split("-");
    const anoNascimento = Number(partes[0]);
    const mesNascimento = Number(partes[1]) - 1;
    const diaNascimento = Number(partes[2]);

    const hoje = new Date();

    let anoAniversario = hoje.getFullYear();

    let aniversario = new Date(
        anoAniversario,
        mesNascimento,
        diaNascimento,
        0,
        0,
        0
    );

    if (aniversario < hoje) {
        anoAniversario++;

        aniversario = new Date(
            anoAniversario,
            mesNascimento,
            diaNascimento,
            0,
            0,
            0
        );
    }

    const diferenca = aniversario.getTime() - hoje.getTime();

    const dias = Math.ceil(
        diferenca / (1000 * 60 * 60 * 24)
    );

    document.getElementById("resultadoAniversario").textContent =
        `Seu próximo aniversário será em ${String(diaNascimento).padStart(2, "0")}/${String(mesNascimento + 1).padStart(2, "0")}/${anoAniversario}. Faltam aproximadamente ${dias} dias.`;
}


let intervaloContagem;

function iniciarContagem() {
    const campo = document.getElementById("dataContagem").value;

    if (campo === "") {
        document.getElementById("contador").textContent =
            "Escolha uma data para iniciar a contagem.";
        return;
    }

    const partes = campo.split("T");

    const dataPartes = partes[0].split("-");
    const horaPartes = partes[1].split(":");

    const ano = Number(dataPartes[0]);
    const mes = Number(dataPartes[1]) - 1;
    const dia = Number(dataPartes[2]);

    const hora = Number(horaPartes[0]);
    const minutos = Number(horaPartes[1]);

    const dataFinal = new Date(
        ano,
        mes,
        dia,
        hora,
        minutos,
        0
    );

    clearInterval(intervaloContagem);

    function atualizarContagem() {
        const agora = new Date();

        const diferenca =
            dataFinal.getTime() - agora.getTime();

        if (diferenca <= 0) {
            clearInterval(intervaloContagem);

            document.getElementById("contador").textContent =
                "Essa data já passou.";

            return;
        }

        const dias = Math.floor(
            diferenca / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferenca / (1000 * 60 * 60)) % 24
        );

        const minutos = Math.floor(
            (diferenca / (1000 * 60)) % 60
        );

        const segundos = Math.floor(
            (diferenca / 1000) % 60
        );

        document.getElementById("contador").textContent =
            `${dias} dias ${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    atualizarContagem();

    intervaloContagem = setInterval(
        atualizarContagem,
        1000
    );
}

function mostrarDatasEspeciais() {
    const hoje = new Date();
    const ano = hoje.getFullYear();

    const datas = [
        {
            nome: "Ano Novo",
            data: new Date(ano, 0, 1)
        },
        {
            nome: "Dia dos Namorados",
            data: new Date(ano, 5, 12)
        },
        {
            nome: "Halloween",
            data: new Date(ano, 9, 31)
        },
        {
            nome: "Natal",
            data: new Date(ano, 11, 25)
        }
    ];

    let proxima = null;

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].data >= hoje) {
            proxima = datas[i];
            break;
        }
    }

    if (proxima === null) {
        proxima = {
            nome: "Ano Novo",
            data: new Date(ano + 1, 0, 1)
        };
    }

    const diferenca =
        proxima.data.getTime() - hoje.getTime();

    const dias = Math.ceil(
        diferenca / (1000 * 60 * 60 * 24)
    );

    document.getElementById("resultadoEspecial").textContent =
        `${proxima.nome}: ${proxima.data.getDate()}/${proxima.data.getMonth() + 1}/${proxima.data.getFullYear()}. Faltam ${dias} dias.`;
}