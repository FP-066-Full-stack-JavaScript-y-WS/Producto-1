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