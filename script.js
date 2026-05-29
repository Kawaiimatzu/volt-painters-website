import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyALXlWFgszfCk8-0StQOKvu4zeRuDR4PlI",

  authDomain: "volt-painters.firebaseapp.com",

  projectId: "volt-painters",

  storageBucket: "volt-painters.firebasestorage.app",

  messagingSenderId: "475163051101",

  appId: "1:475163051101:web:e5d44f01a1666e79a0b9b4",

  measurementId: "G-XRSBC0PJE5"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const projectsGrid =
document.getElementById("projectsGrid");


async function loadProjects(){

const q = query(
  collection(db, "projects"),
  orderBy("order", "desc")
);

const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {

    const project = doc.data();

   projectsGrid.innerHTML += `

  <div class="project-card">

    <img src="${project.image}" alt="">

  </div>

`;

  });

}


loadProjects();


// ABOUT IMAGE
async function loadAboutImage(){

  const docRef = doc(db, "website", "about");

  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){

    document.getElementById("aboutImage").src =
    docSnap.data().image;

  }

}

loadAboutImage();

const servicesContainer =
document.getElementById("servicesContainer");


async function loadServices(){

  const q = query(
    collection(db,"services"),
    orderBy("order","desc")
  );

  const querySnapshot =
  await getDocs(q);

  querySnapshot.forEach((doc) => {

    const service = doc.data();

servicesContainer.innerHTML += `

  <div class="service-card">

    <img src="${service.image}"
         class="service-bg">

    <div class="service-overlay"></div>

    <div class="service-content">

      <h3>${service.title}</h3>

      <p>${service.description}</p>

    </div>

  </div>

`;

  });

}

loadServices();

const reviewsGrid =
document.getElementById("reviewsGrid");


async function loadReviews(){

  const q = query(
    collection(db,"reviews"),
    orderBy("order","desc")
  );

  const querySnapshot =
  await getDocs(q);

  querySnapshot.forEach((doc) => {

    const review = doc.data();

    let stars = "";

    for(let i = 0; i < review.stars; i++){

      stars += "★";

    }

    reviewsGrid.innerHTML += `

<div class="review-card">

  <div class="stars">
    ${stars}
  </div>

  <p class="review-text">
    "${review.text}"
  </p>

  <div class="review-bottom">

    <img src="${review.image}" alt="">

    <div>

      <h4>${review.name}</h4>

      <p>${review.role}</p>

    </div>

  </div>

</div>

    `;

  });

}

loadReviews();

setTimeout(() => {

  createSlider();

}, 300);

const sliderDots =
document.getElementById("sliderDots");

let currentSlide = 0;

function createSlider(){

  const cards =
  document.querySelectorAll(".review-card");

  let cardsPerSlide = 3;

  if(window.innerWidth <= 768){
    cardsPerSlide = 1;
  }

  const totalSlides =
  Math.ceil(cards.length / cardsPerSlide);

  sliderDots.innerHTML = "";

  for(let i = 0; i < totalSlides; i++){

    const dot =
    document.createElement("span");

    if(i === 0){
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

      currentSlide = i;

      updateSlider();

    });

    sliderDots.appendChild(dot);

  }

}

function updateSlider(){

  let slideWidth;

  if(window.innerWidth <= 768){

slideWidth =
document.querySelector(".review-card").offsetWidth;

  }else{

    slideWidth =
    (document.querySelector(".review-card").offsetWidth * 3) + 60;

  }

  reviewsGrid.style.transform =
  `translateX(-${currentSlide * slideWidth}px)`;

  document
  .querySelectorAll(".slider-dots span")
  .forEach(dot =>
    dot.classList.remove("active")
  );

  if(document.querySelectorAll(".slider-dots span")[currentSlide]){

    document
    .querySelectorAll(".slider-dots span")
    [currentSlide]
    .classList.add("active");

  }

}

setInterval(() => {

  const totalSlides =
  document.querySelectorAll(".slider-dots span").length;

  currentSlide++;

  if(currentSlide >= totalSlides){

    currentSlide = 0;

  }

  updateSlider();

}, 4000);



let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

reviewsGrid.addEventListener("touchstart", touchStart);
reviewsGrid.addEventListener("touchmove", touchMove);
reviewsGrid.addEventListener("touchend", touchEnd);

function touchStart(e){

  startX = e.touches[0].clientX;
  isDragging = true;

}

function touchMove(e){

  if(!isDragging) return;

  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  reviewsGrid.style.transform =
  `translateX(${prevTranslate + diff}px)`;

}

function touchEnd(e){

  isDragging = false;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if(diff < -50){

    currentSlide++;

  }else if(diff > 50){

    currentSlide--;

  }

  const totalSlides =
  document.querySelectorAll(".slider-dots span").length;

  if(currentSlide < 0){
    currentSlide = 0;
  }

  if(currentSlide >= totalSlides){
    currentSlide = totalSlides - 1;
  }

  updateSlider();

  prevTranslate =
  -currentSlide *
  document.querySelector(".review-card").offsetWidth;

}

const menuToggle =
document.getElementById("menuToggle");

const nav =
document.querySelector("nav");

menuToggle.addEventListener("click", () => {

  nav.classList.toggle("active");

});

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

  reveals.forEach(item=>{

    const top =
    item.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

      item.classList.add("active");

    }

  });

});