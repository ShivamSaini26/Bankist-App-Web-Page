"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//old looping method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////
//////////////////////////////////////////

//selecting elements
const header = document.querySelector("header");
//creating elements

//insertAdjacentHTML

//creates an element dynamically (Cookie Button)
//select which element need to create
const message = document.createElement("div");
//adding class to the created element
message.classList.add("cookie-message");
//adding inner text/html
// message.textContent='We use cookies for improvement functionality.';
message.innerHTML =
  'We use cookies for improvement functionality.<button class="btn btn--close-cookie">Got it</button>';
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
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

/////////////////////////////////////////////
// implementing smooth scrolling

const buttonScrollTO = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");

buttonScrollTO.addEventListener("click", () => {
  sectionOne.scrollIntoView({ behavior: "smooth" });
});

//SECOND WAY OF HANDLING EVENTS

//mouseenter event === hover
//another way of implementing event
// old school way
// sectionOne.onmouseenter=function(e){
//   alert('hello');
// };

// remove event listener after click so that it cannot happen again
//we need to define internal function outside to make this possible

// ex
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('hello alert');

// removing that event after once
// h1.removeEventListener('mouseenter', alertH1);

//listening for event
// h1.addEventListener('mouseenter', alertH1);

// removing after a certain time

// setTimeout(() =>
//   h1.removeEventListener('mouseenter', alertH1), 3000);

//THIRD WAY OF HANDLING EVENTS using HTML attribute
// {/* <h1 onClick="alert("HTML alter")"</h1> */}

//////////////////////////////////////////////

// adding scroll effect to navigation links
document.querySelectorAll(".nav__link").forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    const id = element.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
////////////////tabs///////////////////////////////
const tab_content = document.querySelectorAll(".operations__content");
const tabs = document.querySelectorAll(".operations__tab");
const tab_container = document.querySelector(".operations__tab-container");

tab_container.addEventListener("click", (event) => {
  const click = event.target.closest(".operations__tab");
  console.log(click);

  if (!click) return;

  //removing active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tab_content.forEach((c) => c.classList.remove("operations__content--active"));

  //re-active tab
  click.classList.add("operations__tab--active");

  //active content area
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////navigation menu fade animation/////////

const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("nav__link")) {
    const hoverElement = e.target;
    const siblings = hoverElement
      .closest(".nav")
      .querySelectorAll(".nav__link");
    const logo = hoverElement.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== hoverElement) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("nav__link")) {
    const hoverElement = e.target;
    const siblings = hoverElement
      .closest(".nav")
      .querySelectorAll(".nav__link");
    const logo = hoverElement.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== hoverElement) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

////////////sticky navigation menu/////////////////
const intialCords = sectionOne.getBoundingClientRect();

window.addEventListener("scroll", function () {
  if (window.scrollY > intialCords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

//////////////////////////////////FADING OUT ELEMENTS WHILE SCROLLING THE PAGE///////////////////////////////

const allSections = document.querySelectorAll(".section");

const createSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(createSection, {
  root: null,
  threshold: 0.2,
});

//accessing all sections
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////lazy loading images////////////
const imageTarget = document.querySelectorAll("img[data-src]");

const loading = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  ///replacing src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
});

imageTarget.forEach((img) => imgObserver.observe(img));

/////Image Slider/////////////////////////
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = `scale(0.4) translateX(-800px)`;
// slider.style.overflow = `visible`;

//0%, 100%, 200%, 300%
const createDots = () => {
  slides.forEach((s,i) => {
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots();

const activateDots = (slide) => {
  document.querySelectorAll('.dots__dot').forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activateDots(0);

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = () => {
  if (currentSlide === maxSlide-1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
//-100%, 0%, 100%, 200%

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
dotContainer.addEventListener('click', (e) =>{
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
})



