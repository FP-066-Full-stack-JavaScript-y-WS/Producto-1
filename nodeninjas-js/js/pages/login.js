import { iniciarSesion } from "../modules/auth.js";

const formulario = document.getElementById("loginForm");
const contenedorMensaje = document.getElementById("loginMensaje");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const resultado = iniciarSesion(email, password);

    if (!resultado.ok) {
        mostrarMensaje(resultado.mensaje, "danger");
        return;
    }

    mostrarMensaje(resultado.mensaje, "success");
    formulario.reset();

    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1500);
});

function mostrarMensaje(texto, tipo) {
    contenedorMensaje.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}