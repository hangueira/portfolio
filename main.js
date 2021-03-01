'use strict'

// navbar 이벤트 
const navbar = document.querySelector('#navbar');
const navbarLogoName = document.querySelector('.navbar__logo__name');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
    navbarLogoName.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
    navbarLogoName.classList.remove('navbar--dark');
  }
})

