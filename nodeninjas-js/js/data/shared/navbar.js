import { obtenerUsuarioActual, cerrarSesion } from "../../modules/auth.js";

document.addEventListener("DOMContentLoaded", cargarNavbar);

function cargarNavbar() {
    const contenedor = document.getElementById("navbar-container");
    if (!contenedor) return;

    fetch("../js/data/shared/navbar.html")
        .then(res => res.text())
        .then(html => {

            contenedor.innerHTML = html;

            inicializarNavbar();

        });

}

function inicializarNavbar() {
    const usuario = obtenerUsuarioActual();
    const nombre = document.getElementById("navbar-usuario");

    if (nombre) {
        if (usuario) {
            nombre.textContent = usuario.nombre;
        } else {
            nombre.textContent = "Invitado";
        }
    }

    const btnLogout = document.getElementById("btnLogout");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            cerrarSesion();
            window.location.href = "login.html";
        });
    }
}

/*

Prompts IA. IA Usada: ChatGPT
 
- Quiero cargar un menú (navbar) desde un archivo HTML externo en varias páginas para no repetir código, y después poder usar sus botones y elementos con JavaScript. ¿Cómo puedo hacerlo paso a paso?
- En una web sin persistencia, ¿cómo puedo estructurar un sistema de autenticación básico en JavaScript para que diferentes componentes (como el navbar) puedan acceder al usuario actual? 
- Estoy trabajando con JavaScript y quiero ejecutar código cuando la página ya esté lista, pero antes de que se carguen todos los recursos como imágenes. ¿Cuál es la mejor forma de hacerlo?

*/
