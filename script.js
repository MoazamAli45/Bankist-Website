'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////
/// button scroll learn more
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width of view port',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth // dimension of view port
  );
  // scrolling
  // top is always relative to viewport not top of page
  /// form top the button and hieght og page is 409 when we scroll down then section and top height is 183 so add to scroll right

  // // current position bu scroll
  // window.scrollTo(s1cords.left+window.pageXOffset,s1cords.top+window.pageYOffset);// 183+406
  //  another method
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  /// modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////this also work properly
/// node list now for each method
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     console.log('Link');
//   const id=this.getAttribute('href');
//   console.log(id);
//   document.querySelector(id).scrollIntoView({behavior:'smooth'});
// })
// })

//////////2nd method
/// using event delegation
// 1) event listener to common parent element
// 2) determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  /// Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////Tapped Component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
// console.log(tabs);

// tabs.forEach(tab => tab.addEventListener('click', () => console.log('Tab')));
console.log(tabContainer);
/// using delegation method
tabContainer.addEventListener('click', function (e) {
  // because if we clcik span then span come
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // this is added because if we click on someother then error come
  // Guard clause
  if (!clicked) return;

  // we can also do  in that condition put all code which is at down
  // if (clicked) {
  // }
  // remove from all tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  // activate tab
  clicked.classList.add('operations__tab--active');
  /// Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  console.log(clicked.dataset.tab);
});

/// Menu fade Animation
// event delegation
// mouseenter does not bubble
// mouseover opposite mouseout

const handleHover = function (e, opacity) {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // robust method
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      // condition for itself
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
/// we can also do by other way using bind
// simple function is not used because in event listener there must be a
//  call back function or a function and bind return a function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseover', handleHover.bind(1));

//// Another way
// nav.addEventListener('mouseout', function (e) {
//  handleHover(e,1);
// });
/////////////Sticky Navigation Bar
// const initial = section1.getBoundingClientRect();
// console.log(initial);
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   /// happen when we reach section
//   if (window.scrollY > initial.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

////////Another Way  of Sticky nav bar
/// Using
/////////Intersection observer API
// const ObserCallBack = function (entries, observer) {
//   // entries are the array of threshold entries
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOpts = {
//   root: null, // element that  target
//   // 0 percent means as threshold  enters
//   //if 1    call back is called when 100 per is view over view port height  but not true because its height is gretaer than vh
//   threshold: [0,0.2], // percentage of  intersection at which obsCallback is call
// //  it means that it will true when its view upto 0 percent
// };

// const observer = new IntersectionObserver(ObserCallBack, observerOpts);
// observer.observe(section1);

// we want when header become out of view
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; // ! destructing
   console.log(entry);
  if (entry.isIntersecting == false) nav.classList.add('sticky'); // adding
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // entire viewport
  threshold: 0, // when 0% of header is visible
  rootMargin: `-${navHeight}px`, // can also write 90    // navigation visible before 90 px whne threshold reach
  // rootMargin:'90px'
});
headerObserver.observe(header);

////// !Revealing Section
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  /// logic
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    console.log(entry.target);
  }
  //// unobserve
  observer.unobserve(entry.target); // if one time it reveals when we move up then nio need to again reveal
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // ! 0% viewport height
  threshold: 0.15, // 15% when it 15% reaches at that section
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

////////// lazy Loading Images
// selcting images having data set attribute
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  /// guard condition
  if (!entry.isIntersecting) return;
  // replace src with data src
  entry.target.src = entry.target.dataset.src;
  // on backend javascript change the image
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  /// unobserving
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //  200x before we reach to make load before  so taht not take so much time
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});
//!     Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currSlide = 0;
const maxSlide = slides.length;
console.log(dotContainer);

// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible';
/// nextslides

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

/////refactor that using function
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// // 0%,100%,200%
const NextSlide = function () {
  /// because currentslide is starting from 0
  if (currSlide == maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  // Refactor that code
  // slides.forEach(
  //   (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`)
  // );
  // in first iteration i=1 then 0-1 =-1
  // -100%,0,100%
  gotoSlide(currSlide);
  activeDot(currSlide);
};
const prevSlide = function () {
  if (currSlide == 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  console.log(currSlide);
  gotoSlide(currSlide);
  /// activate dot
  activeDot(currSlide);
};
console.log(currSlide);
btnRight.addEventListener('click', NextSlide);

btnLeft.addEventListener('click', prevSlide);
////// by moving key
document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  if (e.key == 'ArrowRight') {
    NextSlide();
  } else if (e.key == 'ArrowLeft') {
    prevSlide();
  } else return;
});
//// for Dots creation
const createDots = function () {
  /// for four times we are just using slides
  slides.forEach((_, i) => {
    const html = `<button class="dots__dot" data-slide="${i}"></button>`;
    dotContainer.insertAdjacentHTML('beforeend', html);
  });
};
createDots();
/// for dots event delegation
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // all custom dataattribute in dataset
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activeDot(slide);
  }
});
//////////activating Dots
const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
///  in start first dot will active
// initial position
gotoSlide(0);
activeDot(0);

//////////////////////////////
/*
///// Creating selecting and  delete
// to add css we always had to select the dom element

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
// for multiple selection  ( give node List)

/////////////Reminder
// if we delete section then no change in node list
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

/// this method returns html collection not node list
// live collection if Dom change then also change

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

/// also give html live collection
document.getElementsByClassName('btn'); // no dot

///////Creating and inserting element
// to add
// const html=`<div class=btn-primary>what<div/>`;
// document.querySelector('.header__title').insertAdjacentHTML('afterbegin',html);

// put the tag name
// if we want to into page then add
// const message = document.createElement('div');
message.classList.add('cookie-message');
// add text
message.text = 'We use cookied for improved functionality ';
console.log(message);
message.innerHTML =
  'We use cookied for improved functionality.<button class="btn btn--close-cookie">got it!</button> ';
/// insert into page
// add as first child

// message is live so it can't be at two places at time
header.prepend(message);
// if we wnt we have to amke copy using clone method
header.append(message);
// header.append(message.cloneNode(true))

// header.before(message);
header.after(message);

/// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    /// old way
    message.parentElement.removeChild(message);
  });

///// Styles , Attributes and classes
// property in camelCase value in string
message.style.backgroundColor='#37383d'
message.style.width='120%';

/// inline styles in DOM
// style which we have manually
console.log(message.style.height);
console.log(message.style.color);// because this is not written by us  
console.log(message.style.backgroundColor);

// real style  shwoing on pagethat we haven't declare in css
console.log(getComputedStyle(message));
// we are taking color from that computed 
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// without converting integer can't be add to string
message.style.height=Number.parseFloat(getComputedStyle(message).height,10) +30+'px';
console.log(message.style.height);

// changing variable of css 
document.documentElement.style.setProperty('--color-primary','orangered')


//// attributes
/// Reading
const logo=document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);// absolute url 
/// if want to get relative url of source then use get attribute
console.log(logo.getAttribute('src'));
console.log(logo.className);
// seting attribute
logo.alt=' Beatiful logo';
console.log(logo.alt);


/// is that is not standard property we can't use
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
/// set attribute
logo.setAttribute('company','Bankist');

/// On lInks
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// in case of hash them different
const navButton=document.querySelector('.nav__link--btn');
console.log(navButton.href);
console.log(navButton.getAttribute('href'));

// data version
// these special  attributes are stored in data set
console.log(logo.dataset.versionNumber)

//// Classes
// add multiple classes using commas
logo.classList.add('c','j');
logo.classList.remove('c','j');
logo.classList.toggle('c');
logo.classList.contains('g');// not includes 

/// it will overwrite on all the class don't use
logo.className='jonas';


const h1 = document.querySelector('h1');
// now it will work only one
const alrtH1 = function (e) {
  alert('addEventListener: Great you are reading the heading');
  // h1.removeEventListener('mouseenter',alrtH1)
};

h1.addEventListener('mouseenter', alrtH1); // multiple events can be added

setTimeout(() => h1.removeEventListener('mouseenter', alrtH1), 3000);

// 2nd method   old days
// h1.onmouseenter=function (e){
//   alert('addEventListener: Great you are reading the heading');
// };/// in this case if we write function it will override it

/// 3rd way
// html tags

/// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());
///////Propogation

// child
// this event is also happening on its parent due to bubbling of event event coming towards the root
// event orginates at that point and then bubble up move up

// target is same
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // on eventhandler this represents the element on which event is happening
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget); // where the event happend
  console.log(e.currentTarget === this);

  /// stop the event prpogation

  // now its parent event will not happen due to stop propgation
  // e.stopPropagation();
});

// parent of nav__link
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});
// main parent
// noe if we click on child then all events will also happen from that child
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget);
  },
  true // now it will firstly happen
); // capturing event true
// now it will no longer listen the bubbling phase

// add  event listener listen the events on bubbling phase
*/
//// Event delegation (Bubbling)

/// Dom traversing
/*
const h1=document.querySelector('h1');
// Going downward :child
// it can also go down in DOM tree deep in h1
console.log(h1.querySelectorAll('.highlight'))
// direct child
console.log(h1.childNodes);
// gives an html live collection work only for direct children
console.log(h1.children);

h1.firstElementChild.style.color='white';
h1.lastElementChild.style.color='orangered';

// Going Upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

/// in case not direct parent
// querySelector finds children even how many deeper
// but closest is opposite to querySelector it select the parents
h1.closest('.header').style.background='var(--gradient-secondary)';
h1.closest('h1').style.background='var(--gradient-primary)';

//// Going sideways Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// not used  
console.log(h1.previousSibling);  
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
// Html collection is  
// [...h1.parentElement.children].forEach(function(el){
//   if(el!==1){
//     el.style.transform='scale(0.5)';
//   }
// })
*/
/////////////DOM Life cycle
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML is parsed and DOM tree built!', e);
});
window.addEventListener('load', function (e) {
  console.log('page fully uploaded', e);
});

/// this is called when user really want to leave the page

// window.addEventListener('beforeunload',function(e){
// /// in chrome necssary
// e.preventDefault();

// console.log(e);
// e.returnValue=' You want to leave the page';

// })
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = 'red';
//   console.log('Container', e.target, e.currentTarget);
// });
// console.log(logo.designer);
console.log(logo.getAttribute('designer'));
/// set attribute
logo.setAttribute('company','Bankist');
console.log(
  logo.getAttribute('company'));
  console.log(logo.dataset.versionNumber)
  
