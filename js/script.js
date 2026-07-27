// ---------- Navegación móvil ----------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ---------- Datos de técnicas ----------
const tecnicas = [
  { titulo: "Respiración 4-7-8", cat: "respiracion", texto: "Inhala 4s, sostén 7s, exhala 8s. Reduce la activación del sistema nervioso simpático." },
  { titulo: "Respiración diafragmática", cat: "respiracion", texto: "Respira desde el abdomen, no el pecho, para bajar la frecuencia cardíaca." },
  { titulo: "Relajación muscular progresiva", cat: "cuerpo", texto: "Tensa y relaja grupos musculares de pies a cabeza para liberar tensión física." },
  { titulo: "Ejercicio aeróbico", cat: "cuerpo", texto: "30 minutos de actividad física moderada reducen el cortisol y mejoran el ánimo." },
  { titulo: "Mindfulness / atención plena", cat: "mente", texto: "Observa pensamientos sin juzgarlos, enfocando la atención en el presente." },
  { titulo: "Reestructuración cognitiva", cat: "mente", texto: "Identifica y cuestiona pensamientos catastróficos o distorsionados." },
  { titulo: "Higiene del sueño", cat: "habitos", texto: "Horarios regulares y sin pantallas antes de dormir mejoran la recuperación." },
  { titulo: "Reducir cafeína y estimulantes", cat: "habitos", texto: "El exceso de cafeína puede imitar o agravar síntomas de ansiedad." },
];

const grid = document.getElementById('tecnicasGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
let activeCat = 'todas';

function renderTecnicas(){
  const query = searchInput.value.trim().toLowerCase();
  const filtradas = tecnicas.filter(t => {
    const matchCat = activeCat === 'todas' || t.cat === activeCat;
    const matchQuery = t.titulo.toLowerCase().includes(query) || t.texto.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  grid.innerHTML = filtradas.map(t => `
    <div class="card">
      <h3>${t.titulo}</h3>
      <p>${t.texto}</p>
      <span class="tag">${t.cat}</span>
    </div>
  `).join('');

  noResults.classList.toggle('hidden', filtradas.length !== 0);
}

searchInput.addEventListener('input', renderTecnicas);
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderTecnicas();
  });
});

renderTecnicas();

// ---------- Quiz de autoevaluación ----------
const preguntas = [
  { texto: "¿Con qué frecuencia te sientes abrumado/a por tus responsabilidades?", opciones: ["Nunca","A veces","Frecuentemente","Casi siempre"] },
  { texto: "¿Tienes dificultad para conciliar o mantener el sueño por preocupaciones?", opciones: ["Nunca","A veces","Frecuentemente","Casi siempre"] },
  { texto: "¿Notas tensión muscular, dolores de cabeza o fatiga sin causa física clara?", opciones: ["Nunca","A veces","Frecuentemente","Casi siempre"] },
  { texto: "¿Te cuesta concentrarte por pensamientos repetitivos o negativos?", opciones: ["Nunca","A veces","Frecuentemente","Casi siempre"] },
  { texto: "¿Evitas situaciones sociales o tareas por miedo o ansiedad anticipada?", opciones: ["Nunca","A veces","Frecuentemente","Casi siempre"] },
];

const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');

quizContainer.innerHTML = preguntas.map((p, i) => `
  <div class="quiz-question">
    <p>${i + 1}. ${p.texto}</p>
    ${p.opciones.map((op, j) => `
      <label>
        <input type="radio" name="q${i}" value="${j}"> ${op}
      </label>
    `).join('')}
  </div>
`).join('');

document.getElementById('quizSubmit').addEventListener('click', () => {
  let total = 0;
  let respondidas = 0;

  preguntas.forEach((_, i) => {
    const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
    if (seleccion) {
      total += Number(seleccion.value);
      respondidas++;
    }
  });

  if (respondidas < preguntas.length) {
    quizResult.textContent = "Por favor responde todas las preguntas antes de ver el resultado.";
    quizResult.classList.remove('hidden');
    return;
  }

  const maxPuntaje = (preguntas[0].opciones.length - 1) * preguntas.length;
  const porcentaje = Math.round((total / maxPuntaje) * 100);

  let nivel, consejo;
  if (porcentaje <= 25) {
    nivel = "Bajo";
    consejo = "Tus niveles de estrés/ansiedad parecen manejables. Mantén tus hábitos actuales.";
  } else if (porcentaje <= 50) {
    nivel = "Moderado";
    consejo = "Podrías beneficiarte de técnicas de respiración y organización del tiempo.";
  } else if (porcentaje <= 75) {
    nivel = "Alto";
    consejo = "Considera incorporar mindfulness, ejercicio regular y mejorar tu higiene de sueño.";
  } else {
    nivel = "Muy alto";
    consejo = "Te recomendamos buscar apoyo profesional (psicólogo/a) además de estas técnicas.";
  }

  quizResult.innerHTML = `<strong>Nivel estimado: ${nivel} (${porcentaje}%)</strong><p>${consejo}</p><p><em>Esta autoevaluación es orientativa y no reemplaza un diagnóstico profesional.</em></p>`;
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
