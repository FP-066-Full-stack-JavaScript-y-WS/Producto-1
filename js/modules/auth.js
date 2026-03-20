import { usuarios } from "../data/datos.js";

let usuarioActual = null;

function obtenerUsuarios() {
    return usuarios;
}

export function registrarUsuario(datosFormulario) {
    const { nombre, dni, email, telefono, password, confirmPassword } = datosFormulario;

    if (!nombre || !dni || !email || !telefono || !password || !confirmPassword) {
        return { 
            ok: false, 
            mensaje: "Todos los campos son obligatorios." };
    }

    if (password.length < 8) {
        return {
            ok: false,
            mensaje: "La contraseña debe tener al menos 8 caracteres."   
        };
    }

    if (password !== confirmPassword) {
        return {
            ok: false,
            mensaje: "Las contraseñas no coinciden."
        };
    }

    const listaUsuarios = obtenerUsuarios();

    const emailExiste = listaUsuarios.some(function (usuario) {
        return usuario.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExiste) {
        return {
            ok: false,
            mensaje: "El email ya está registrado."
        };
    }

    const nuevoId = listaUsuarios.length > 0 ? listaUsuarios[listaUsuarios.length - 1].id + 1 : 1;

    const nuevoUsuario = {
        id: nuevoId,
        nombre,
        dni,
        email,
        telefono,
        password
    };

    listaUsuarios.push(nuevoUsuario);
    usuarioActual = nuevoUsuario;

    return {
        ok: true,
        usuario: nuevoUsuario,
        mensaje: "Usuario registrado correctamente."
    };
}

export function iniciarSesion(email, password) {
    if (!email || !password) {
        return {
            ok: false,
            mensaje: "Debes completar email y contraseña."
        };
    }

    const listaUsuarios = obtenerUsuarios();

    const usuarioEncontrado = listaUsuarios.find(function (usuario) {
        return usuario.email.toLowerCase() === email.toLowerCase() &&
               usuario.password === password;
    });

    if (!usuarioEncontrado) {
        return {
            ok: false,
            mensaje: "Email o contraseña incorrectos."
        };
    }

    usuarioActual = usuarioEncontrado;

    return {
        ok: true,
        usuario: usuarioEncontrado,
        mensaje: `Bienvenido/a, ${usuarioEncontrado.nombre}.`
    };
}

export function obtenerUsuarioActual() {
    return usuarioActual;
}

export function cerrarSesion() {
    usuarioActual = null;
}

export function haySesionActiva() {
    return usuarioActual !== null;
}


/* Prompts IA. IA Usada: ChatGPT

- Necesito hacer una función de registro en JS que reciba los datos de un formulario y compruebe que no hay campos vacíos. ¿Cómo puedo hacerlo?
- Tengo que comprobar que el usuario no existe ya en mi array de usuarios antes de registrarlo. ¿Cómo puedo hacer esa validación?
- Si no tengo persistencia y el estado del usuario se pierde al recargar la página, ¿cómo puedo diseñar igualmente funciones como iniciarSesion, cerrarSesion y comprobar si hay sesión activa dentro de un módulo?
- Quiero que mi función de registro devuelva un mensaje de error si algo no es correcto, o un mensaje de éxito si el usuario se ha registrado correctamente.

*/