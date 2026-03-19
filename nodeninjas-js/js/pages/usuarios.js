import { usuarios } from "../data/datos.js";

const formUsuario = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

export function mostrarUsuarios() {
    listaUsuarios.innerHTML = "";

usuarios.forEach(usuario =>{
    listaUsuarios.innerHTML += ` 
    <tr>
        <td>${usuario.nombre}</td>
        <td class="col-email">${usuario.email}</td>
        <td>********</td>
        <td>
            <button class="btn-delete" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </td>
    </tr>
    `;
});
}

formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (nombre && email && password) {
        usuarios.push({
            id: Date.now(),
            nombre,
            email,
            password
        });

        formUsuario.reset();
        mostrarUsuarios();
    } else {
        alert("Todos los campos son obligatorios");
    }
});

window.eliminarUsuario = function(id) {
    const index = usuarios.findIndex(u => u.id === id);

    if (index > -1) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }
};

mostrarUsuarios();