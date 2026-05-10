const toggle = document.querySelector('.mode-toggle');
const rows = document.querySelectorAll('.project-row');

const updateToggleLabel = () => {
  const isNight = document.body.classList.contains('night-mode');
  toggle.textContent = isNight ? 'Day Index' : 'Night Index';
  toggle.setAttribute('aria-pressed', String(isNight));
};

toggle.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  updateToggleLabel();
});

rows.forEach((row, index) => {
  row.style.setProperty('--row-delay', `${index * 80}ms`);
});
