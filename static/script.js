const menuEmail = document.querySelector('.navbar-email')
const desktopMenu = document.querySelector('.desktop-menu')
const cartMenu = document.querySelector('.navbar-right-img')
const imgMiddle = document.querySelector('.left-image-section')

menuEmail.addEventListener('click',toggleDesktopMenu)

function toggleDesktopMenu(){
  aside.classList.add('inactive')
  desktopMenu.classList.toggle('inactive')
}

const hamburger = document.querySelector('.menu')
const hamburgerMenu = document.querySelector('.mobile-menu')

hamburger.addEventListener('click', togglehamburgerMenu)

function togglehamburgerMenu(){
  hamburgerMenu.classList.toggle('inactive')
}

const aside = document.querySelector('.subscription-detail')

function toogleCartMenu(){
  desktopMenu.classList.add('inactive')
  hamburgerMenu.classList.add('inactive')
  aside.classList.toggle('inactive')
}



