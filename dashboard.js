import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  setDoc,
  getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const aboutPreview =
document.getElementById("aboutPreview");

const uploadStatus =
document.getElementById("uploadStatus");


const firebaseConfig = {

  apiKey: "AIzaSyALXlWFgszfCk8-0StQOKvu4zeRuDR4PlI",

  authDomain: "volt-painters.firebaseapp.com",

  projectId: "volt-painters",

  storageBucket: "volt-painters.firebasestorage.app",

  messagingSenderId: "475163051101",

  appId: "1:475163051101:web:e5d44f01a1666e79a0b9b4"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const uploadBtn =
document.getElementById("uploadBtn");

const projectContainer =
document.getElementById("projectContainer");


// UPLOAD PROJECT
uploadBtn.addEventListener("click", async () => {

  const files =
  document.getElementById("imageUpload").files;

uploadStatus.innerHTML =
`Uploading ${files.length} images...`;

  try{

    for (const file of files) {

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        "voltpainters"
      );

      const response = await fetch(

        "https://api.cloudinary.com/v1_1/dxztvltpi/image/upload",

        {
          method:"POST",
          body:formData
        }

      );

      const data = await response.json();

      const imageUrl = data.secure_url;

      await addDoc(collection(db, "projects"), {

        image: imageUrl,

        order: Date.now()

      });

    }

    uploadStatus.innerHTML =
"Upload Complete!";

    loadProjects();

  }

  catch(error){

    alert(error.message);

  }

});



// LOAD PROJECTS
async function loadProjects(){

  projectContainer.innerHTML = "";

  const q = query(
  collection(db, "projects"),
  orderBy("order", "desc")
);

const querySnapshot = await getDocs(q);

  querySnapshot.forEach((projectDoc) => {

    const project = projectDoc.data();

    projectContainer.innerHTML += `

      <div class="admin-project">

        <img src="${project.image}">

        <button onclick="deleteProject('${projectDoc.id}')">
          Delete
        </button>

      </div>

    `;

  });

}


// DELETE PROJECT
window.deleteProject = async function(id){

  await deleteDoc(doc(db,"projects",id));

  loadProjects();

}


loadProjects();

const aboutBtn =
document.getElementById("aboutBtn");


aboutBtn.addEventListener("click", async () => {

  const file =
  document.getElementById("aboutUpload").files[0];

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "voltpainters"
  );

  const response = await fetch(

    "https://api.cloudinary.com/v1_1/dxztvltpi/image/upload",

    {
      method:"POST",
      body:formData
    }

  );

  const data = await response.json();

  await setDoc(doc(db,"website","about"), {

    image:data.secure_url

  });

  alert("About Image Updated!");

  loadAboutPreview();

});
async function loadAboutPreview(){

  const docRef =
  doc(db, "website", "about");

  const docSnap =
  await getDoc(docRef);

  if(docSnap.exists()){

    const data = docSnap.data();

    aboutPreview.innerHTML = `

      <div class="admin-project">

        <img src="${data.image}">

        <button onclick="deleteAboutImage()">
          Delete
        </button>

      </div>

    `;

  }

}

loadAboutPreview();

window.deleteAboutImage =
async function(){

  await setDoc(doc(db,"website","about"), {

    image:""

  });

  aboutPreview.innerHTML = "";

}
const serviceBtn =
document.getElementById("serviceBtn");

const servicesPreview =
document.getElementById("servicesPreview");


// UPLOAD SERVICE
serviceBtn.addEventListener("click", async () => {

  const servicesSnapshot =
await getDocs(collection(db, "services"));

  const title =
  document.getElementById("serviceTitle").value;

  const description =
  document.getElementById("serviceDescription").value;

  const file =
  document.getElementById("serviceImage").files[0];

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "voltpainters"
  );

  const response = await fetch(

    "https://api.cloudinary.com/v1_1/dxztvltpi/image/upload",

    {
      method:"POST",
      body:formData
    }

  );

  const data = await response.json();

  await addDoc(collection(db,"services"), {

    title:title,

    description:description,

    image:data.secure_url,

    order:Date.now()

  });

  alert("Service Uploaded!");

  loadServices();

});


// LOAD SERVICES
async function loadServices(){

  servicesPreview.innerHTML = "";

  const q = query(
    collection(db,"services"),
    orderBy("order","desc")
  );

  const querySnapshot =
  await getDocs(q);

  querySnapshot.forEach((serviceDoc) => {

    const service = serviceDoc.data();

    servicesPreview.innerHTML += `

      <div class="admin-project">

        <img src="${service.image}">

        <h3>${service.title}</h3>

        <p>${service.description}</p>

        <button onclick="deleteService('${serviceDoc.id}')">
          Delete
        </button>

      </div>

    `;

  });
}

loadServices();


// DELETE SERVICE
window.deleteService =
async function(id){

  await deleteDoc(doc(db,"services",id));

  loadServices();

}

const reviewBtn =
document.getElementById("reviewBtn");

const reviewsContainer =
document.getElementById("reviewsContainer");


reviewBtn.addEventListener("click", async () => {

  const name =
  document.getElementById("reviewName").value;

  const role =
  document.getElementById("reviewRole").value;

  const text =
  document.getElementById("reviewText").value;

  const stars =
  document.getElementById("reviewStars").value;

  const file =
  document.getElementById("reviewImage").files[0];

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "voltpainters"
  );

  const response = await fetch(

    "https://api.cloudinary.com/v1_1/dxztvltpi/image/upload",

    {
      method:"POST",
      body:formData
    }

  );

  const data = await response.json();

  await addDoc(collection(db,"reviews"), {

    name:name,
    role:role,
    text:text,
    stars:stars,
    image:data.secure_url,
    order:Date.now()

  });

  alert("Review Uploaded!");

  loadReviews();

});

async function loadReviews(){

  reviewsContainer.innerHTML = "";

  const q = query(
    collection(db,"reviews"),
    orderBy("order","desc")
  );

  const querySnapshot =
  await getDocs(q);

  querySnapshot.forEach((reviewDoc) => {

    const review = reviewDoc.data();

    reviewsContainer.innerHTML += `

      <div class="admin-project">

        <img src="${review.image}">

        <h3>${review.name}</h3>

        <p>${review.role}</p>

        <button onclick="deleteReview('${reviewDoc.id}')">
          Delete
        </button>

      </div>

    `;

  });

}

loadReviews();

window.deleteReview =
async function(id){

  await deleteDoc(doc(db,"reviews",id));

  loadReviews();

}
const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

  window.location.href = "login.html";

});