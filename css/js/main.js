const btnTema = document.getElementById('themeToggle');

btnTema.addEventListener('click', function () {
  document.body.classList.toggle('modo-noche');
  if (document.body.classList.contains('modo-noche')) {
    btnTema.textContent = '☀️';
    btnTema.setAttribute('aria-label', 'Cambiar a tema claro');
  } else {
    btnTema.textContent = '🌙';
    btnTema.setAttribute('aria-label', 'Cambiar a tema oscuro');
  }
});

const btnScrollTop = document.getElementById('btnScrollTop');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const secciones = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    btnScrollTop.classList.add('visible');
  } else {
    btnScrollTop.classList.remove('visible');
  }

  let seccionActual = '';
  secciones.forEach(function (seccion) {
    const offsetTop = seccion.offsetTop - 100;
    if (window.scrollY >= offsetTop) {
      seccionActual = seccion.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + seccionActual) {
      link.classList.add('active');
    }
  });
});

btnScrollTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function animarContadorVisitas() {
  const elementoNum = document.getElementById('numVisitas');
  if (!elementoNum) return;
  const totalVisitas = Math.floor(Math.random() * 80) + 120;
  let contador = 0;
  const intervalo = setInterval(function () {
    contador += 5;
    elementoNum.textContent = contador;
    if (contador >= totalVisitas) {
      elementoNum.textContent = totalVisitas;
      clearInterval(intervalo);
    }
  }, 30);
}

function mostrarEstadoOficina() {
  const contenedor = document.getElementById('estadoOficina');
  if (!contenedor) return;
  const ahora = new Date();
  const hora = ahora.getHours();
  const diaSemana = ahora.getDay();
  const esHorarioAtencion = diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora < 14;
  if (esHorarioAtencion) {
    contenedor.className = 'badge-estado abierta';
    contenedor.textContent = '🟢 Oficina abierta ahora';
  } else {
    contenedor.className = 'badge-estado cerrada';
    contenedor.textContent = '🔴 Oficina cerrada';
  }
}

const datosNoticias = [
  { categoria: 'Cultura', titulo: 'Festival de Música Mapuche 2025', descripcion: 'La municipalidad organiza el festival anual en honor a la cultura y tradiciones del pueblo mapuche en el parque central.', fecha: '05 mayo 2025' },
  { categoria: 'Obras', titulo: 'Pavimentación Av. O\'Higgins', descripcion: 'Inicio de obras de mejoramiento vial en la arteria principal de Cholchol. Se esperan 45 días de trabajo.', fecha: '28 abril 2025' },
  { categoria: 'Social', titulo: 'Programa de Subsidios Habitacionales', descripcion: 'Se abren postulaciones para el programa de subsidio habitacional destinado a familias vulnerables de la comuna.', fecha: '20 abril 2025' },
  { categoria: 'Salud', titulo: 'Campaña de Vacunación Invierno', descripcion: 'El CESFAM de Cholchol inicia la campaña de vacunación contra la influenza. Sin costo para adultos mayores y niños.', fecha: '15 abril 2025' }
];

let noticiasVisibles = 2;

function renderizarNoticias(cantidad) {
  const contenedor = document.getElementById('contenedorNoticias');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  datosNoticias.slice(0, cantidad).forEach(function (noticia) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    col.innerHTML = `
      <div class="card h-100 p-3">
        <div class="card-body">
          <span class="badge-categoria">${noticia.categoria}</span>
          <h5 class="card-title">${noticia.titulo}</h5>
          <p class="card-text">${noticia.descripcion}</p>
          <small style="color: rgba(255,255,255,0.6);">📅 ${noticia.fecha}</small>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });
}

const btnCargarMas = document.getElementById('btnCargarMas');
if (btnCargarMas) {
  btnCargarMas.addEventListener('click', function () {
    noticiasVisibles += 2;
    if (noticiasVisibles >= datosNoticias.length) {
      noticiasVisibles = datosNoticias.length;
      btnCargarMas.textContent = 'No hay más noticias';
      btnCargarMas.disabled = true;
    }
    renderizarNoticias(noticiasVisibles);
  });
}

const datosServicios = [
  { icono: '📋', nombre: 'Licencias y Permisos', descripcion: 'Trámite de licencias de conducir, permisos de circulación, patentes comerciales y más.' },
  { icono: '🏠', nombre: 'Subsidios Habitacionales', descripcion: 'Postulaciones a programas de vivienda y subsidios del SERVIU para familias de la comuna.' },
  { icono: '🏗️', nombre: 'Obras y Urbanismo', descripcion: 'Permisos de edificación, recepción de obras, planos reguladores y certificados DOM.' },
  { icono: '👨‍👩‍👧', nombre: 'Atención Social', descripcion: 'Asistencia social, programas de apoyo a adultos mayores, discapacidad e infancia.' }
];

function cargarServicios() {
  const contenedor = document.getElementById('contenedorServicios');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  datosServicios.forEach(function (servicio) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    col.innerHTML = `
      <div class="card h-100 p-3" tabindex="0" role="article" aria-label="Servicio: ${servicio.nombre}">
        <div class="card-body">
          <h5 class="card-title">${servicio.icono} ${servicio.nombre}</h5>
          <p class="card-text">${servicio.descripcion}</p>
          <button class="btn btn-sm btn-outline-light mt-2 btn-ver-servicio"
                  data-servicio="${servicio.nombre}"
                  aria-label="Más información sobre ${servicio.nombre}">
            Más información
          </button>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });

  document.querySelectorAll('.btn-ver-servicio').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const nombreServicio = this.getAttribute('data-servicio');
      const alerta = document.getElementById('alertaServicio');
      alerta.textContent = `ℹ️ Para consultas sobre "${nombreServicio}", visítanos en O'Higgins 420 o llama al +56 45 2 881 400.`;
      alerta.style.display = 'block';
      alerta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { alerta.style.display = 'none'; }, 5000);
    });
  });
}

function mostrarError(campoId, errorId, mensaje) {
  const campo = document.getElementById(campoId);
  const error = document.getElementById(errorId);
  if (!campo || !error) return;
  error.textContent = mensaje;
  campo.classList.add('campo-invalido');
  campo.classList.remove('campo-valido');
}

function mostrarValido(campoId, errorId) {
  const campo = document.getElementById(campoId);
  const error = document.getElementById(errorId);
  if (!campo || !error) return;
  error.textContent = '';
  campo.classList.remove('campo-invalido');
  campo.classList.add('campo-valido');
}

const campNombre  = document.getElementById('nombre');
const campEmail   = document.getElementById('email');
const campServicio = document.getElementById('servicio');
const campMensaje  = document.getElementById('mensaje');

if (campNombre) {
  campNombre.addEventListener('input', function () {
    const valor = this.value.trim();
    if (valor === '') mostrarError('nombre', 'errorNombre', '⚠️ El nombre es obligatorio');
    else if (valor.length < 3) mostrarError('nombre', 'errorNombre', '⚠️ Mínimo 3 caracteres');
    else mostrarValido('nombre', 'errorNombre');
  });
}

if (campEmail) {
  campEmail.addEventListener('input', function () {
    const valor = this.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === '') mostrarError('email', 'errorEmail', '⚠️ El correo es obligatorio');
    else if (!regexEmail.test(valor)) mostrarError('email', 'errorEmail', '⚠️ Formato inválido (ej: nombre@correo.cl)');
    else mostrarValido('email', 'errorEmail');
  });
}

if (campServicio) {
  campServicio.addEventListener('change', function () {
    if (this.value === '') mostrarError('servicio', 'errorServicio', '⚠️ Selecciona un servicio');
