'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//old looping method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn=>{
  btn.addEventListener('click', openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////
//////////////////////////////////////////

//selecting elements

const header=document.querySelector('header');

const allSections=document.querySelectorAll('.section');
document.getElementById('section--1');
const allButtons=document.getElementsByTagName('button');
document.getElementsByClassName('btn');

//creating elements

//insertAdjacentHTML

//creates an element dynamically (Cookie Button)
//select which element need to create
const message=document.createElement('div');
//adding class to the created element
message.classList.add('cookie-message');
//adding inner text/html
// message.textContent='We use cookies for improvement functionality.';
message.innerHTML = 'We use cookies for improvement functionality.<button class="btn btn--close-cookie">Got it</button>'
//adding the element as a child in header before all elements
// header.prepend(message);

//adding in last of element- header

header.append(message);

//to add a element multiple places just use append and prepend both with (cloneNOde method)

// header.prepend(message.cloneNode(true));
// header.append(message.cloneNode(true));

//adding before or after the header as sibling
// header.before(message);
// header.after(message);

/////////////////////////////////////////////
///deleting cookie button
document.querySelector('.btn--close-cookie').addEventListener('click',function () {
  message.remove();
});

/////////////////////////////////////////////
// implementing smooth scrolling

const buttonScrollTO = document.querySelector('.btn--scroll-to');
const sectionOne=document.querySelector('#section--1');

buttonScrollTO.addEventListener('click',(e)=>{
  sectionOne.scrollIntoView({ behavior: 'smooth' });
})