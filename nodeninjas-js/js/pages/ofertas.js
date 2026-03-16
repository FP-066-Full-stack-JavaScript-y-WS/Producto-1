import { ofertas, demandas, usuarioActual } from '../data/datos.js';

const form = document.getElementById('form-ofertas');
const contenedor = document.getElementById('contenedor-cards');
const userDisplay = document.getElementById('user-display');

if (userDisplay && usuarioActual) {
    userDisplay.textContent = usuarioActual.email;
}

function actualizarVista() {
    contenedor.innerHTML = '';
    // Mostramos todas las ofertas y demandas como cards
    ofertas.forEach(item => renderizarCard(item, 'oferta'));
    demandas.forEach(item => renderizarCard(item, 'demanda'));
}

function renderizarCard(item, tipo) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const colorClase = tipo === 'oferta' ? 'border-oferta' : 'border-demanda';
    const textClase = tipo === 'oferta' ? 'text-oferta' : 'text-demanda';
    const btnClase = tipo === 'oferta' ? 'btn-oferta' : 'btn-demanda';
    const label = tipo === 'oferta' ? 'Oferta de empleo' : 'Demanda de empleo';

    col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm ${colorClase} p-3">
            <div class="card-body">
                <span class="badge bg-light ${textClase} mb-2 fw-normal" style="font-size: 0.75rem;">${label}</span>
                <h5 class="fw-bold mb-1">${item.titulo}</h5>
                <p class="text-muted small mb-3">${tipo === 'oferta' ? item.empresa : item.demandante}</p>
                
                <div class="small text-muted mb-1"><i class="bi bi-geo-alt me-2"></i>${item.ubicacion}</div>
                <div class="small text-muted mb-1"><i class="bi bi-briefcase me-2"></i>${item.modalidad || 'Tiempo completo'}</div>
                <div class="small text-muted mb-4"><i class="bi bi-calendar3 me-2"></i>Publicado recientemente</div>
                
                <div class="d-flex gap-2">
                    <button class="btn ${btnClase} btn-sm flex-grow-1 fw-bold">Ver más</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="eliminarPublicacion(${item.id}, '${tipo}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    contenedor.appendChild(col);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const nuevo = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        ubicacion: document.getElementById('ubicacion').value,
        modalidad: document.getElementById('modalidad').value,
        empresa: document.getElementById('entidad').value,
        demandante: document.getElementById('entidad').value
    };

    if (tipo === 'oferta') ofertas.unshift(nuevo); // Añadir al principio
    else demandas.unshift(nuevo);

    form.reset();
    actualizarVista();
    // Cerrar el formulario tras publicar
    bootstrap.Collapse.getInstance(document.getElementById('collapseForm')).hide();
});

window.eliminarPublicacion = (id, tipo) => {
    if (confirm('¿Dar de baja esta publicación?')) {
        const array = tipo === 'oferta' ? ofertas : demandas;
        const index = array.findIndex(i => i.id === id);
        if (index !== -1) {
            array.splice(index, 1);
            actualizarVista();
        }
    }
};

actualizarVista();