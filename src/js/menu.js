let button = document.getElementById('menu_btn');
let menuVertical = document.getElementById('menu__vertical');
let menuClose = document.getElementById('menu-close');
button.addEventListener('click', function () {
   menuVertical.classList.toggle('display-block');
});
menuClose.addEventListener('click', function () {
   menuVertical.classList.toggle('display-block');
});
let count = document.getElementById('count');
let itCount = parseInt(count.innerText);
let productButtons = document.querySelectorAll('.productAddBtn'); 
productButtons.forEach(button => button.addEventListener('click', () => {count.innerText = ++itCount;}));