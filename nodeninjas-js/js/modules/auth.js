import { usuarios } from "../data/datos.js";

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

    const emailExiste = usuarios.some(function (usuario) {
        return usuario.email === email;
    });

    if (emailExiste) {
        return {
            ok: false,
            mensaje: "El email ya está registrado."
        };
    }

    const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length -1].id + 1 : 1;

    const nuevoUsuario = {
        id: nuevoId,
        nombre,
        dni,
        email,
        telefono,
        password
    };

    usuarios.push(nuevoUsuario);

    return {
        ok: true,
        usuario: nuevoUsuario,
        mensaje: "Usuario registrado correctamente."
    };
}


    
