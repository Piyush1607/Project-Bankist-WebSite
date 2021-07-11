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
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// NAVIGATION FADE EFFECT
//handler function

const nav = document.querySelector('.nav');
const handleHover = function(e){ 
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img') 
    siblings.forEach(el => {
      if(el!==link)
      el.style.opacity=this
    });
    logo.style.opacity=this;
  }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))


// STCKY-NAVIGATION BAR
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entires){
  const [entry]=entires;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav,{
  root :null,
  threshold :0 ,
  rootMargin :`-${navHeight}px` 
});

headerObserver.observe(header)

//------------------------REVEALING SECTIONS ON SCROLL---------------------
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries,observer){
  const [entry]=entries
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const sectionObsever=new IntersectionObserver(revealSection,{
  root : null ,
  threshold :0.15 
})

// we can use same observer on all 4 sections
allSections.forEach(function(section){
  sectionObsever.observe(section);
  section.classList.add('section--hidden')
})


//-------------------------SLIDER-COMPONENT--------------------------------
const slides = document.querySelectorAll('.slide');
const slider =document.querySelector('.slider');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


//UTILITY FUNCTIONS
const activateButton=function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
const createDots = function(){
  slides.forEach((_,i)=>{
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide=${i}>
    </button>`)
  })
}
//creating dots
createDots()
// activating first button
activateButton(0)
//slide number
let currentSlide =0
//total slides
const maxSlides = slides.length
// got to slide function
const goToSlide=function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`)
}
// translating slides in the beginning
goToSlide(0) 
//Next slide
const nextSlide =function(){
  if(currentSlide===maxSlides-1) currentSlide=0 
  else currentSlide++;
  goToSlide(currentSlide)
  activateButton(currentSlide)
}

//previous slide
const prevSlide=function(){
  if(currentSlide===0) currentSlide=maxSlides-1 
  else currentSlide--;
  goToSlide(currentSlide)
  activateButton(currentSlide)
}
// adding eventHandler to buttons
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)


// CHANGING SLIDES WITH KEYBOARD
document.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight') nextSlide()
  if(e.key==='ArrowLeft') prevSlide()
})

// SLIDE USING DOTS
// Activate button

dotContainer.addEventListener('click',function(e){
  if(!e.target.classList.contains('dots__dot')) return;
  const {slide} = e.target.dataset
  goToSlide(e.target.dataset.slide)
  activateButton(e.target.dataset.slide)
})

