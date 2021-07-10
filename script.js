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
