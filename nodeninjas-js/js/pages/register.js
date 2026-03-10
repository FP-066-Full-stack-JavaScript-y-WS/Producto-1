import { registrarUsuario } from "../modules/auth.js";

const formulario = document.getElementById("registerForm");
const contenedorMensaje = document.getElementById("registerMensaje");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    
    const datosFormulario = {
        nombre,
        dni,
        email,
        telefono,
        password,
        confirmPassword     
    };

    const resultado = registrarUsuario(datosFormulario);

    console.log(resultado);

    if (!resultado.ok) {
        mostrarMensaje(resultado.mensaje, "danger");
        return;
    }

    mostrarMensaje(resultado.mensaje, "success");
    formulario.reset();

    setTimeout(function () {
        window.location.href = "login.html";
    }, 5000);
});

function mostrarMensaje(texto, tipo) {
    contenedorMensaje.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
}