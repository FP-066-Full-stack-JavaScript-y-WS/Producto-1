/**
 * Interfaz 3: Gestión de Ofertas y Demandas
 * Descripción: Lógica para listar, añadir y dar de baja publicaciones.
 */

import { ofertas, demandas, usuarioActual } from '../data/datos.js';

// Elementos del DOM
const form = document.getElementById('form-ofertas');
const tabla = document.getElementById('tabla-ofertas');
const userDisplay = document.getElementById('user-display');

// 1. Mostrar usuario logueado en la navegación
if (userDisplay) {
    userDisplay.textContent = usuarioActual.email;
}

/**
 * Función principal para renderizar la tabla
 */
function actualizarVista() {
    tabla.innerHTML = '';

    // Pintar ambas listas
    ofertas.forEach(item => renderizarFila(item, 'oferta'));
    demandas.forEach(item => renderizarFila(item, 'demanda'));
}

/**
 * Crea las filas de la tabla dinámicamente
 */
function renderizarFila(item, tipo) {
    const fila = document.createElement('tr');
    // Diferenciación visual por color y tipo (oferta o demanda)
    const colorClase = tipo === 'oferta' ? 'table-info' : 'table-success';
    fila.className = colorClase;

    fila.innerHTML = `
        <td><strong>${tipo.toUpperCase()}</strong></td>
        <td>${item.titulo}</td>
        <td>${tipo === 'oferta' ? item.empresa : item.demandante}</td>
        <td>${item.ubicacion}</td>
        <td class="text-center">
            <button class="btn btn-danger btn-sm" onclick="eliminarPublicacion(${item.id}, '${tipo}')">Baja</button>
        </td>
    `;
    tabla.appendChild(fila);
}

// 2. Manejo del formulario de creación
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo').value;
    const nuevo = {
        id: Date.now(), // ID único basado en timestamp
        titulo: document.getElementById('titulo').value,
        ubicacion: document.getElementById('ubicacion').value,
        modalidad: document.getElementById('modalidad').value,
        fecha: "Recién publicado"
    };

    // Asignar autor según el tipo
    if (tipo === 'oferta') {
        nuevo.empresa = document.getElementById('entidad').value;
        ofertas.push(nuevo);
    } else {
        nuevo.demandante = document.getElementById('entidad').value;
        demandas.push(nuevo);
    }

    form.reset();
    actualizarVista();
});

// 3. Función global para eliminar (usada por el onclick del botón)
window.eliminarPublicacion = (id, tipo) => {
    const confirmacion = confirm(`¿Estás seguro de que deseas dar de baja esta ${tipo}?`);
    
    if (confirmacion) {
        const array = tipo === 'oferta' ? ofertas : demandas;
        const index = array.findIndex(i => i.id === id);
        
        if (index !== -1) {
            array.splice(index, 1);
            actualizarVista();
        }
    }
};

// Carga inicial
actualizarVista();