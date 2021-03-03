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

// navbar click scroll event
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: "smooth" });
  scrollIntoView(link);

});

const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', (event) => {
  scrollIntoView('#contact');
})

// scroll function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}