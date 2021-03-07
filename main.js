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
  // 현재 active로 되어있는거 지우고 선택된거 active
  const active = document.querySelector('.navbar__menu__item.active');
  active.classList.remove('active');
  target.classList.add('active');

  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: "smooth" });
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
  selectNavItem(target);

});

// navbat toggle button 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});


const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', (event) => {
  scrollIntoView('#contact');
})

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
})

// show "arrow up" button
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
})

// click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
 });

// project filter
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project')
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }
  // 현재 active로 되어있는거 지우고 선택된거 active
  const active = document.querySelector('.work__categories__btn.active');
  active.classList.remove('active');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');


  projectContainer.classList.add('anim-out');
  
  setTimeout(() => {
    projects.forEach(project => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);

  // for(let project of projects) {
  //   console.log(project);
  // }
  // let project;
  // for(let i; i < projects.length < i++ ) {
  //   project = projects[i];
  //   console.log(project);
  // }
  
});

// 1. 모든 섹션 요소 메뉴 아이템들을 가지고 온다
// 2. IntersectionObjerver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성호 시킨다.

const sectionIds = ['#home','#about','#skills','#work','#testimonials','#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

// scroll function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOption = {
  root: null,
  rootMargin:'0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
})