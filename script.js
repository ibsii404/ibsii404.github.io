// Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const text = "Hi, I'm Ibsii 👋";
let index = 0;
function type() {
  document.getElementById("typewriter").innerHTML = text.slice(0, index++);
  if(index <= text.length) setTimeout(type, 100);
}
type();
