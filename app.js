/*
========================================
AULA+ - SISTEMA DE AGENDAMENTO
JavaScript
========================================
*/


// ========================================
// MENU MOBILE
// ========================================

function toggleMenu() {

    const menu = document.getElementById("menu");

    if (menu.style.display === "flex") {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

        menu.style.flexDirection = "column";

        menu.style.position = "absolute";

        menu.style.top = "76px";

        menu.style.left = "0";

        menu.style.right = "0";

        menu.style.padding = "20px";

        menu.style.background = "white";

        menu.style.borderBottom = "1px solid #eee";

    }

}


// ========================================
// MODAIS
// ========================================

function abrirLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");

}


function abrirCadastro() {

    document
        .getElementById("registerModal")
        .classList.add("active");

}


function fecharModal(id) {

    document
        .getElementById(id)
        .classList.remove("active");

}


function trocarParaCadastro() {

    fecharModal("loginModal");

    abrirCadastro();

}


function trocarParaLogin() {

    fecharModal("registerModal");

    abrirLogin();

}


// ========================================
// SCROLL PARA AGENDAMENTO
// ========================================

function irParaAgendamento() {

    document
        .getElementById("agendar")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// SELECIONAR DISCIPLINA
// ========================================

function selecionarDisciplina(disciplina) {

    const select =
        document.getElementById("discipline");

    select.value = disciplina;

    irParaAgendamento();

}


// ========================================
// SELECIONAR PROFESSOR
// ========================================

function selecionarProfessor(professor) {

    const select =
        document.getElementById("teacher");

    select.value = professor;

    irParaAgendamento();

}


// ========================================
// NOTIFICAÇÃO
// ========================================

function mostrarToast(mensagem) {

    const toast =
        document.getElementById("toast");

    const message =
        document.getElementById("toastMessage");

    message.textContent = mensagem;

    toast.classList.add("active");

    setTimeout(() => {

        toast.classList.remove("active");

    }, 3500);

}


// ========================================
// FORMULÁRIO DE AGENDAMENTO
// ========================================

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const disciplina =
            document.getElementById("discipline").value;

        const professor =
            document.getElementById("teacher").value;

        const data =
            document.getElementById("date").value;

        const horario =
            document.getElementById("time").value;

        const nome =
            document.getElementById("studentName").value;

        const email =
            document.getElementById("studentEmail").value;


        if (
            !disciplina ||
            !professor ||
            !data ||
            !horario ||
            !nome ||
            !email
        ) {

            mostrarToast(
                "Preencha todos os campos."
            );

            return;

        }


        const agendamento = {

            id: Date.now(),

            disciplina,

            professor,

            data,

            horario,

            nome,

            email

        };


        // Salva temporariamente no navegador

        const agendamentos =
            JSON.parse(
                localStorage.getItem("agendamentos")
            ) || [];


        agendamentos.push(agendamento);


        localStorage.setItem(
            "agendamentos",
            JSON.stringify(agendamentos)
        );


        mostrarToast(
            "Aula agendada com sucesso!"
        );


        document
            .getElementById("bookingForm")
            .reset();

    });


// ========================================
// LOGIN DEMONSTRATIVO
// ========================================

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        mostrarToast(
            "Login realizado com sucesso!"
        );

        fecharModal("loginModal");

    });


// ========================================
// CADASTRO DEMONSTRATIVO
// ========================================

document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const nome =
            document.getElementById("registerName").value;

        const email =
            document.getElementById("registerEmail").value;

        const senha =
            document.getElementById("registerPassword").value;


        if (!nome || !email || !senha) {

            mostrarToast(
                "Preencha todos os campos."
            );

            return;

        }


        const usuario = {

            nome,

            email

        };


        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        mostrarToast(
            "Conta criada com sucesso!"
        );


        fecharModal("registerModal");

    });


// ========================================
// FECHAR MODAL CLICANDO FORA
// ========================================

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {

                modal.classList.remove("active");

            }

        });

    });


// ========================================
// IMPEDIR DATAS PASSADAS
// ========================================

const dateInput =
    document.getElementById("date");


const hoje =
    new Date().toISOString().split("T")[0];


dateInput.min = hoje;