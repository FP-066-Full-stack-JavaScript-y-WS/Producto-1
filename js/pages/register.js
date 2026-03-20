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
        window.location.href = "dashboard.html";
    }, 1500);
});

function mostrarMensaje(texto, tipo) {
    contenedorMensaje.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
}


/*

Prompts IA. IA Usada: ChatGPT
 
- Cómo puedo mostrar mensajes de error o éxito sin que se recargue la página?
- Puedo hacer que los campos del formulario no se borren si hay un error? Para que el usuario los pueda revisar.
- Cómo puedo comprobar que se están enviando bien los datos?
- Necesito comprobar que las contraseñas coinciden antes de registrar al usuario

*/