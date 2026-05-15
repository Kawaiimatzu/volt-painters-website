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
             class="service-icon">

        <h3>${service.title}</h3>

        <p>${service.description}</p>

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

        <p>
          "${review.text}"
        </p>

        <div class="review-user">

          <img src="${review.image}">

          <div>

            <h4>${review.name}</h4>

            <span>${review.role}</span>

          </div>

        </div>

      </div>

    `;

  });

}

loadReviews();