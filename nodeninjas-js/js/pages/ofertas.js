import { ofertas, demandas, usuarioActual } from '../data/datos.js';

const form = document.getElementById('form-ofertas');
const tablaGestion = document.getElementById('tabla-gestion');
const userDisplay = document.getElementById('user-display');
const totalBadge = document.getElementById('total-badge');
const contenedor = document.getElementById('contenedor-cards');

// 1. Mostrar usuario compartido
if (userDisplay && usuarioActual) {
    userDisplay.textContent = usuarioActual.email;
}

/**
 * Función para refrescar el listado de gestión
 */
function actualizarVista() {
    if (!tablaGestion) return;
    tablaGestion.innerHTML = '';
    
    const todas = [...ofertas, ...demandas];
    if (totalBadge) totalBadge.textContent = `${todas.length} anuncios`;

    // Renderizamos ambas categorías
    ofertas.forEach(item => renderizarFila(item, 'oferta'));
    demandas.forEach(item => renderizarFila(item, 'demanda'));
}

function renderizarFila(item, tipo) {
    const fila = document.createElement('tr');
    const badgeColor = tipo === 'oferta' ? 'text-primary bg-primary-subtle' : 'text-purple bg-purple-subtle';
    
    fila.innerHTML = `
        <td>
            <span class="badge ${badgeColor} border-0 px-2 py-1" style="font-size: 0.65rem;">${tipo.toUpperCase()}</span>
        </td>
        <td>
            <div class="fw-bold small mb-0">${item.titulo}</div>
            <div class="text-muted" style="font-size: 0.8rem;">${item.empresa || item.demandante}</div>
        </td>
        <td class="text-end">
            <button class="btn btn-link text-danger p-0" onclick="eliminarPublicacion(${item.id}, '${tipo}')" title="Dar de baja">
                <i class="bi bi-trash3-fill" style="font-size: 1.1rem;"></i>
            </button>
        </td>
    `;
    tablaGestion.appendChild(fila);
}

/**
 * Lógica para dar de baja (Eliminar)
 */
window.eliminarPublicacion = (id, tipo) => {
    if (confirm(`¿Dar de baja esta ${tipo} definitivamente?`)) {
        const array = tipo === 'oferta' ? ofertas : demandas;
        const index = array.findIndex(i => i.id === id);
        
        if (index !== -1) {
            array.splice(index, 1);
            actualizarVista();
        }
    }
};

/**
 * Lógica para el alta desde el Formulario
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tipo = document.querySelector('input[name="tipo_pub"]:checked').value;
    const sMin = document.getElementById('salario_min').value;
    const sMax = document.getElementById('salario_max').value;

    if ((sMin && sMin < 0) || (sMax && sMax < 0)) {
        alert("El salario no puede ser negativo.");
        return;
    }

    if (sMin && sMax && Number (sMin) > Number(sMax)) {
        alert("El salario mínimo no puede ser mayor que el máximo.");
        return;
    }


    const nuevo = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        ubicacion: document.getElementById('ubicacion').value,
        modalidad: document.getElementById('modalidad').value,
        descripcion: document.getElementById('descripcion').value,
        salario: sMin && sMax ? `${sMin}€ - ${sMax}€` : 'No especificado',
        fecha: "Hoy",
        autor: usuarioActual ? usuarioActual.email : "Desconocido"
    };

    if (tipo === 'oferta') {
        nuevo.empresa = document.getElementById('entidad').value;
        ofertas.unshift(nuevo);
    } else {
        nuevo.demandante = document.getElementById('entidad').value;
        demandas.unshift(nuevo);
    }

    form.reset();
    // Reestablecer estilo visual del label de entidad por defecto
    document.getElementById('label_entidad').innerText = "Nombre de la empresa *";
    actualizarVista();
    alert("¡Publicado con éxito!");
});

// Carga inicial al entrar en la página
actualizarVista();