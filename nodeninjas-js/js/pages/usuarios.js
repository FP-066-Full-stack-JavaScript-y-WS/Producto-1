import { usuarios } from "../data/datos.js";

const formUsuario = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

/* Este módulo se encarga de gestionar la creación, visualización y eliminación de usuarios en la aplicación.
Dado que no existe una base de datos real en este Producto 1, toda la información se maneja en memoria a través del array de usuarios importado desde datos.js. 
Las funciones principales incluyen mostrar la lista de usuarios, validar los datos del formulario para crear un nuevo usuario, agregar un nuevo usuario al array y eliminar un usuario existente por su ID.
*/
export function mostrarUsuarios() {
    if (!listaUsuarios) return;

    let html = "";

    usuarios.forEach((usuario) => {
        html += `
            <tr>
                <td>${usuario.nombre}</td>
                <td class="col-email">${usuario.email}</td>
                <td>********</td>
                <td>
                    <button class="btn-delete" data-id="${usuario.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    listaUsuarios.innerHTML = html;
}

/* Función para validar los datos del formulario de nuevo usuario.
Se asegura de que todos los campos estén completos, que la contraseña tenga al menos 8 caracteres, que el email tenga un formato válido y que no exista otro usuario con el mismo email. 
Devuelve un mensaje de error si alguna validación falla, o null si todo es correcto.
*/

function validarFormulario(nombre, email, password) {
    if (!nombre || !email || !password) {
        return"Todos los campos son obligatorios.";
    }
    if (password.length < 8) {
        return"La contraseña debe tener al menos 8 caracteres.";
    }         
     if (!email.includes("@")) {
        return "El email no tiene un formato válido";
    }
    const emailExiste = usuarios.some(
        (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
    );
     if (emailExiste) {
        return "Ya existe un usuario con ese email";
    }
    return null;
}

/* Función para agregar un nuevo usuario al array de usuarios.
La función valida los datos del formulario, y si son correctos, crea un nuevo objeto de usuario con un ID único (usando Date.now() para simplicidad) y lo agrega al array de usuarios. 
Luego se limpia el formulario y se actualiza la vista para mostrar el nuevo usuario en la lista.
*/
function agregarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    const error = validarFormulario(nombre, email, password);
    if (error) {
        alert(error);
        return;
    }

    usuarios.push({
        id: Date.now(),
        nombre,
        email,
        password
    });
    formUsuario.reset();
    mostrarUsuarios();
}

/* Función para eliminar un usuario por su ID 
La eliminación se realiza directamente sobre el array de usuarios, y luego se refresca la vista para mostrar los cambios. 
En un entorno real, esta lógica debería estar en un módulo de gestión de datos o en el backend, pero para este Producto 1 se maneja todo en memoria.
*/
function eliminarUsuario(id) {
    const index = usuarios.findIndex((usuario) => usuario.id === id);
    if (index > -1) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }
}

if (formUsuario) {
    formUsuario.addEventListener("submit", agregarUsuario);
}

if (listaUsuarios) {
    listaUsuarios.addEventListener("click", (event) => {
        const botonEliminar = event.target.closest(".btn-delete");

        if (!botonEliminar) return;

        const id = Number(botonEliminar.dataset.id);
        eliminarUsuario(id);
    });
}

mostrarUsuarios();


/* 

- Cómo evitar usar onclick inline y hacerlo con addEventListener

- Explicame cuando innerHTML += en un bucle o map().join('')

- Estructura dataset para estructurar elementos de una tabla 

- Comprobar mail existente con some()

*/