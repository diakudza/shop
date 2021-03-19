let button = document.getElementById('menu_btn');
let menuVertical = document.getElementById('menu__vertical');
let menuClose = document.getElementById('menu-close');
button.addEventListener('click', function () {
   menuVertical.classList.toggle('display-block');
});
menuClose.addEventListener('click', function () {
   menuVertical.classList.toggle('display-block');
});