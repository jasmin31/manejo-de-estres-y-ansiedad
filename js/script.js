// ---------- Navegación móvil ----------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// ---------- Datos de técnicas ----------
const tecnicas = [
  { titulo: "Respiración 4-7-8", cat: "respiracion", texto: "Inhala por 4 segundos, mantén 7 y exhala 8. Repite 4 veces para bajar la tensión y calmar la mente. Sirve cuando te sientas acelerado/a o antes de dormir." },
  { titulo: "Respiración diafragmática", cat: "respiracion", texto: "Coloca una mano en el abdomen y respira lento. Siente cómo el vientre sube y baja para reducir la activación del cuerpo. Úsala para recuperar calma en momentos de nerviosismo." },
  { titulo: "Relajación muscular progresiva", cat: "cuerpo", texto: "Tensa cada grupo muscular 5 segundos y luego suelta. Empieza por los pies y sube hasta la cabeza para liberar tensión. Es ideal cuando notas el cuerpo rígido o dolorido." },
  { titulo: "Ejercicio aeróbico", cat: "cuerpo", texto: "Camina, corre o baila 30 minutos. El movimiento ayuda a liberar estrés, mejorar el ánimo y descargar la energía acumulada. Funciona bien cuando necesitas despejar la mente." },
  { titulo: "Mindfulness / atención plena", cat: "mente", texto: "Dedica 5 minutos a observar tu respiración y tus pensamientos sin juzgarlos. Regresa al presente cada vez que te distraigas. Es útil para calmar la ansiedad y mejorar la concentración." },
  { titulo: "Reestructuración cognitiva", cat: "mente", texto: "Anota un pensamiento negativo y pregúntate si es real. Busca una explicación más equilibrada y menos extrema. Esta técnica ayuda a cambiar pensamientos que aumentan el estrés." },
  { titulo: "Higiene del sueño", cat: "habitos", texto: "Duerme y despierta a la misma hora, evita pantallas antes de dormir y crea una rutina tranquila para descansar mejor. Un buen sueño reduce la irritabilidad y mejora la energía." },
  { titulo: "Reducir cafeína y estimulantes", cat: "habitos", texto: "Cambia el café por agua o té suave y evita estimulantes por la tarde para que tu cuerpo se relaje más fácil. Menos cafeína ayuda a que la ansiedad sea menos intensa." },
];

const grid = document.getElementById('tecnicasGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
let activeCat = 'todas';

const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');
let carouselIndex = 0;

function renderCarousel(){
  if (!carouselTrack) return;
  carouselTrack.innerHTML = tecnicas.map(t => `
    <div class="card carousel-item">
      <div class="image-placeholder">Imagen de ${t.titulo}</div>
      <h3>${t.titulo}</h3>
      <p>${t.texto}</p>
      <span class="tag">${t.cat}</span>
    </div>
  `).join('');

  carouselIndicators.innerHTML = tecnicas.map((_, index) => `
    <button class="carousel-indicator${index === carouselIndex ? ' active' : ''}" data-index="${index}" aria-label="Ir a táctica ${index + 1}"></button>
  `).join('');
  updateCarousel();
}

function updateCarousel(){
  if (!carouselTrack) return;
  const itemWidth = carouselTrack.querySelector('.carousel-item')?.offsetWidth || 280;
  carouselTrack.style.transform = `translateX(-${carouselIndex * (itemWidth + 16)}px)`;
  carouselIndicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === carouselIndex);
  });
}

function moveCarousel(direction){
  carouselIndex += direction;
  if (carouselIndex < 0) carouselIndex = tecnicas.length - 1;
  if (carouselIndex >= tecnicas.length) carouselIndex = 0;
  updateCarousel();
}

carouselPrev?.addEventListener('click', () => moveCarousel(-1));
carouselNext?.addEventListener('click', () => moveCarousel(1));
carouselIndicators?.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.carousel-indicator')){
    carouselIndex = Number(target.dataset.index);
    updateCarousel();
  }
});

function renderTecnicas(){
  const query = searchInput.value.trim().toLowerCase();
  const filtradas = tecnicas.filter(t => {
    const matchCat = activeCat === 'todas' || t.cat === activeCat;
    const matchQuery = t.titulo.toLowerCase().includes(query) || t.texto.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  grid.innerHTML = filtradas.map(t => `
    <div class="card">
      <div class="image-placeholder">Imagen de ${t.titulo}</div>
      <h3>${t.titulo}</h3>
      <p>${t.texto}</p>
      <span class="tag">${t.cat}</span>
    </div>
  `).join('');

  noResults.classList.toggle('hidden', filtradas.length !== 0);
}

if (searchInput) {
  searchInput.addEventListener('input', renderTecnicas);
}
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderTecnicas();
    });
  });
}

if (carouselTrack) {
  renderCarousel();
}
if (grid) {
  renderTecnicas();
}

// ---------- Quiz de autoevaluación ----------
const preguntas = [
  { texto: "Me ha costado mucho descargar la tensión." },
  { texto: "Me di cuenta que tenía la boca seca." },
  { texto: "No podía sentir ningún sentimiento positivo." },
  { texto: "Se me hizo difícil respirar." },
  { texto: "Se me hizo difícil tomar la iniciativa para hacer cosas." },
  { texto: "Reaccioné exageradamente en ciertas situaciones." },
  { texto: "Sentí que mis manos temblaban." },
  { texto: "He sentido que estaba gastando una gran cantidad de energía." },
  { texto: "Estaba preocupado por situaciones en las cuales podía tener pánico o en las que podría hacer el ridículo." },
  { texto: "He sentido que no había nada que me ilusionara." },
  { texto: "Me he sentido inquieto." },
  { texto: "Se me hizo difícil relajarme." },
  { texto: "Me sentí triste y deprimido." },
  { texto: "No toleré nada que no me permitiera continuar con lo que estaba haciendo." },
  { texto: "Sentí que estaba al punto de pánico." },
  { texto: "No me pude entusiasmar por nada." },
  { texto: "Sentí que valía muy poco como persona." },
  { texto: "He tendido a me sentirme enfadado con facilidad." },
  { texto: "Sentí los latidos de mi corazón a pesar de no haber hecho ningún esfuerzo físico." },
  { texto: "Tuve miedo sin razón." },
  { texto: "Sentí que la vida no tenía ningún sentido." },
];

const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');

quizContainer.innerHTML = preguntas.map((p, i) => `
  <div class="quiz-question">
    <p>${i + 1}. ${p.texto}</p>
    <div class="quiz-options">
      <label><input type="radio" name="q${i}" value="0"> 0</label>
      <label><input type="radio" name="q${i}" value="1"> 1</label>
      <label><input type="radio" name="q${i}" value="2"> 2</label>
      <label><input type="radio" name="q${i}" value="3"> 3</label>
    </div>
  </div>
`).join('');

document.getElementById('quizSubmit').addEventListener('click', () => {
  let total = 0;
  let respondidas = 0;
  const respuestas = [];

  preguntas.forEach((_, i) => {
    const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
    if (seleccion) {
      const valor = Number(seleccion.value);
      total += valor;
      respuestas.push(valor);
      respondidas++;
    }
  });

  if (respondidas < preguntas.length) {
    quizResult.textContent = "Por favor responde todas las preguntas antes de ver el resultado.";
    quizResult.classList.remove('hidden');
    return;
  }

  const subescalaDepresion = [2, 4, 9, 12, 15, 16, 20].reduce((sum, index) => sum + respuestas[index], 0);
  const subescalaAnsiedad = [1, 3, 6, 8, 14, 18, 19].reduce((sum, index) => sum + respuestas[index], 0);
  const subescalaStress = [0, 5, 7, 10, 11, 13, 17].reduce((sum, index) => sum + respuestas[index], 0);

  function interpretarDASS(valor, tipo) {
    if (tipo === 'Depresión') {
      if (valor <= 4) return 'Normal';
      if (valor <= 6) return 'Leve';
      if (valor <= 10) return 'Moderado';
      if (valor <= 13) return 'Grave';
      return 'Muy grave';
    }
    if (tipo === 'Ansiedad') {
      if (valor <= 3) return 'Normal';
      if (valor <= 5) return 'Leve';
      if (valor <= 7) return 'Moderado';
      if (valor <= 9) return 'Grave';
      return 'Muy grave';
    }
    if (tipo === 'Estrés') {
      if (valor <= 7) return 'Normal';
      if (valor <= 9) return 'Leve';
      if (valor <= 13) return 'Moderado';
      if (valor <= 17) return 'Grave';
      return 'Muy grave';
    }
    return 'No definido';
  }

  const resultadoDepresion = interpretarDASS(subescalaDepresion, 'Depresión');
  const resultadoAnsiedad = interpretarDASS(subescalaAnsiedad, 'Ansiedad');
  const resultadoStress = interpretarDASS(subescalaStress, 'Estrés');

  quizResult.innerHTML = `
    <strong>Resultados DASS-21</strong>
    <p>Depresión: ${subescalaDepresion} puntos — ${resultadoDepresion}</p>
    <p>Ansiedad: ${subescalaAnsiedad} puntos — ${resultadoAnsiedad}</p>
    <p>Estrés: ${subescalaStress} puntos — ${resultadoStress}</p>
    <p><em>Esta autoevaluación es orientativa. Si tienes resultados moderados o superiores, considera buscar apoyo profesional.</em></p>
  `;
  quizResult.classList.remove('hidden');
});

// ---------- Formulario de contacto ----------
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valido = true;
  formSuccess.classList.add('hidden');

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Ingresa un nombre válido.";
    valido = false;
  } else {
    nameError.textContent = "";
  }

  if (!validarEmail(emailInput.value.trim())) {
    emailError.textContent = "Ingresa un correo electrónico válido.";
    valido = false;
  } else {
    emailError.textContent = "";
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
    valido = false;
  } else {
    messageError.textContent = "";
  }

  if (valido) {
    formSuccess.classList.remove('hidden');
    form.reset();
  }
});
