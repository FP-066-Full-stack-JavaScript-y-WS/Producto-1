/*=====================================================================
    Archivo: dashboard.js
    Autor: NodeNinjas
    Descripción:
    Este archivo controla la lógica del dashboard principal.
    Su función es:
    - Mostrar el nombre del usuario actual
    - Pintar las tarjetas de ofertas
    - Pintar las tarjetas de demandas
    - Gestionar eventos básicos de los botones
=====================================================================*/

import { ofertas, demandas } from "../data/datos.js";

/*=====================================================================
    1. REFERENCIAS A ELEMENTOS DEL DOM
    Se seleccionan los elementos HTML que se van a manipular.
=====================================================================*/
const contenedorOfertas = document.getElementById("contenedor-ofertas");
const contenedorDemandas = document.getElementById("contenedor-demandas");

const btnPublicar = document.getElementById("btn-publicar");
const btnVerOfertas = document.getElementById("btn-ver-ofertas");
const btnVerDemandas = document.getElementById("btn-ver-demandas");

/*=====================================================================
    2. FUNCIONES DE VISUALIZACIÓN
=====================================================================*/

/**
 * Genera el HTML de una tarjeta de oferta.
 * @param {Object} oferta - Objeto con los datos de una oferta.
 * @returns {string} HTML de la tarjeta
 */
function crearTarjetaOferta(oferta) {
    return `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="dashboard-card oferta-card">
                <span class="card-badge badge-oferta">Oferta de empleo</span>

                <h3>${oferta.titulo}</h3>
                <p class="card-subtitle">${oferta.empresa}</p>

                <ul class="card-details">
                    <li><i class="bi bi-geo-alt me-2"></i>${oferta.ubicacion}</li>
                    <li><i class="bi bi-briefcase me-2"></i>${oferta.modalidad}</li>
                    <li><i class="bi bi-calendar3 me-2"></i>${oferta.fecha}</li>
                </ul>

                <button type="button" class="card-button ver-mas-oferta" data-id="${oferta.id}">
                    <i class="bi bi-eye me-2"></i>Ver más
                </button>
            </article>
        </div>
    `;
}

/**
 * Genera el HTML de una tarjeta de demanda.
 * @param {Object} demanda - Objeto con los datos de una demanda.
 * @returns {string} HTML de la tarjeta
 */
function crearTarjetaDemanda(demanda) {
    return `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="dashboard-card demanda-card">
                <span class="card-badge badge-demanda">Demanda de empleo</span>

                <h3>${demanda.titulo}</h3>
                <p class="card-subtitle">Demandante: ${demanda.demandante}</p>

                <ul class="card-details">
                    <li><i class="bi bi-geo-alt me-2"></i>${demanda.ubicacion}</li>
                    <li><i class="bi bi-briefcase me-2"></i>${demanda.modalidad}</li>
                    <li><i class="bi bi-calendar3 me-2"></i>${demanda.fecha}</li>
                </ul>

                <button type="button" class="card-button demanda-btn ver-mas-demanda" data-id="${demanda.id}">
                    <i class="bi bi-eye me-2"></i>Ver más
                </button>
            </article>
        </div>
    `;
}

/**
 * Inserta en pantalla las ofertas disponibles.
 * Se muestran solo las 3 primeras como resumen del dashboard.
 */
function pintarOfertas() {
    contenedorOfertas.innerHTML = ofertas
        .slice(0, 3)
        .map(crearTarjetaOferta)
        .join("");
}

/**
 * Inserta en pantalla las demandas disponibles.
 * Se muestran solo las 3 primeras como resumen del dashboard.
 */
function pintarDemandas() {
    contenedorDemandas.innerHTML = demandas
        .slice(0, 3)
        .map(crearTarjetaDemanda)
        .join("");
}

/*=====================================================================
    3. FUNCIONES DE EVENTOS
=====================================================================*/

/**
 * Activa los eventos básicos de la página.
 * En este producto se usan alertas porque todavía no existe
 * conexión real entre pantallas ni persistencia de datos.
 */
function activarEventos() {
    btnPublicar.addEventListener("click", () => {
        window.location.href = "ofertas.html";
    });

    btnVerOfertas.addEventListener("click", () => {
        alert("Aquí se mostrarán todas las ofertas en la siguiente interfaz.");
    });

    btnVerDemandas.addEventListener("click", () => {
        alert("Aquí se mostrarán todas las demandas en la siguiente interfaz.");
    });

    document.addEventListener("click", (event) => {
        const botonOferta = event.target.closest(".ver-mas-oferta");
        const botonDemanda = event.target.closest(".ver-mas-demanda");

        if (botonOferta) {
            const id = botonOferta.dataset.id;
            alert(`Mostrando detalle de la oferta con ID ${id}.`);
        }

        if (botonDemanda) {
            const id = botonDemanda.dataset.id;
            alert(`Mostrando detalle de la demanda con ID ${id}.`);
        }
    });
}

/*=====================================================================
    4. FUNCIÓN PRINCIPAL
=====================================================================*/

/**
 * Inicializa el dashboard cuando el DOM está cargado.
 */
function iniciarDashboard() {
    pintarOfertas();
    pintarDemandas();
    activarEventos();
}

/* 
   Espera a que el HTML se cargue completamente
   antes de ejecutar la lógica de la página.
*/
document.addEventListener("DOMContentLoaded", iniciarDashboard);


/* Prompts IA. IA Usada: ChatGPT

- Cómo puedo mostrar varias cards con los datos de ofertas y demandas a partir de un array de objetos?
- Necesito limitar la cantidad de cards que aparecen en el dashboard. cómo puedo mostrar solo las 3 primeras ofertas y demandas?
- Cómo puedo usar la misma estructura de tarjeta para ofertas y demandas sin repetir código?
- Quiero simular interacciones en mi aplicación (como ver detalles o navegar entre secciones) aunque todavía no tenga todas las páginas desarrolladas. ¿Cómo puedo hacerlo de forma sencilla mientras tanto?

*/