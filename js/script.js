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
