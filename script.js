'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SMOOTH --- SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
  // MODERN SMOOTH SCROLL
  section1.scrollIntoView({behavior:'smooth'})
})

// Smooth Scroll in navigation bar
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior :'smooth'})
  }
})

// COOKIE--MESSAGE
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML='We use cookies for better experience<button class="btn btn--close-cookie">Got it </button> '
const header = document.querySelector('.header');

// Changing styles
message.style.backgroundColor='#37383d'
message.style.width='120%'
header.append(message)
message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+20+'px' 
//deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})

// Editing Tabbed Components

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab')
 
  if(!clicked) return;
  
  // ACTIVATE BUTTONS
  tabs.forEach(t=>t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  // ACTIVATE TAB CONTENT

  tabsContent.forEach(t=>t.classList.remove('operations__content--active'))
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})