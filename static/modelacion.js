// Datos de ejemplo para los modales (puedes reemplazar los textos luego)
const modelos = [
  {
    img: 'static/img/modelos/modelo1.png',
    titulo: 'Sistemas aporticados',
    desc: 'Modelación de edificios.'
  },
  {
    img: 'static/img/modelos/modelo2.png',
    titulo: 'Muros de Sótano',
    desc: 'Modelación de Muros.'
  },
  {
    img: 'static/img/modelos/modelo3.png',
    titulo: 'Muros Estructurales',
    desc: 'Modelación de Muros.'
  },
  {
    img: 'static/img/modelos/modelo4.png',
    titulo: 'Edificios',
    desc: 'Modelación de edificios.'
  }
];

function openModelModal(idx) {
  const modal = document.getElementById('modelModal');
  const img = document.getElementById('modalImg');
  const text = document.getElementById('modalText');
  img.src = modelos[idx].img;
  img.alt = modelos[idx].titulo;
  text.innerHTML = `<h3>${modelos[idx].titulo}</h3><p>${modelos[idx].desc}</p>`;
  modal.style.display = 'flex';
}

function closeModelModal() {
  document.getElementById('modelModal').style.display = 'none';
}

// Cerrar modal al hacer click fuera de la imagen
window.addEventListener('click', function(e) {
  const modal = document.getElementById('modelModal');
  if (modal && e.target === modal) {
    closeModelModal();
  }
}); 