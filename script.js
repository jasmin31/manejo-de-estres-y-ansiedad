// Proxy loader: carga el script principal ubicado en js/script.js
(function(){
  if (location.pathname.endsWith('/script.js')) return;
  const s = document.createElement('script');
  s.src = 'js/script.js';
  s.defer = true;
  document.head.appendChild(s);
})();

/* Este archivo existe solo para mantener rutas compatibles con plantillas */
