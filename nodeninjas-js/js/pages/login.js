import { iniciarSesion } from "../modules/auth.js";
import { usuarios } from "../data/datos.js";

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

function mostrarUsuariosPrueba() {

    const lista = document.getElementById("usuarios-prueba");
    const template = document.getElementById("usuario-template");

    if (!lista || !template) return;

    usuarios.forEach(usuario => {

        const clone = template.content.cloneNode(true);

        clone.querySelector(".usuario-email").textContent = usuario.email;
        clone.querySelector(".usuario-password").textContent = " / " + usuario.password;

        lista.appendChild(clone);

    });

}

document.addEventListener("DOMContentLoaded", mostrarUsuariosPrueba);