// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFnip8WSn9BlnjIOcRljzMyXQg-bt1aDg",
  authDomain: "church-youth-events-hub.firebaseapp.com",
  projectId: "church-youth-events-hub",
  storageBucket: "church-youth-events-hub.appspot.com",
  messagingSenderId: "445899363336",
  appId: "1:445899363336:web:88f2119853bf085b016dbd"
};

// Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------
// Utility Functions
// --------------------

// Fade-in/out message utility
function showMessage(element) {
  element.classList.add("show");
  setTimeout(() => element.classList.remove("show"), 5000);
}

// Greeting based on time
function greetUser() {
  const hour = new Date().getHours();
  let greeting = "Welcome!";
  if (hour < 12) greeting = "Good morning!";
  else if (hour < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.innerText = greeting;
}

// Event filtering
function filterEvents() {
  const input = document.getElementById('filterInput')?.value.toLowerCase() || "";
  const cards = document.getElementsByClassName('event-card');
  for (let card of cards) {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? 'block' : 'none';
  }
}

// --------------------
// Event Management
// --------------------

// Load events from Firestore
async function loadEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const eventsSection = document.getElementById('events');
  if (!eventsSection) return;
  eventsSection.innerHTML = "<h2>Upcoming Events</h2>";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <h3>${data.title} – ${data.church}</h3>
      <p>Date: ${data.date}</p>
      <p>${data.desc}</p>
    `;
    eventsSection.appendChild(card);
  });
}

// --------------------
// Registration Form
// --------------------
const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");
const formError = document.getElementById("formError");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(registerForm);

    // Extract values for Firestore
    const name = data.get("name");
    const email = data.get("email");
    const church = data.get("church");

    try {
      // 1. Send to Formspree
      const response = await fetch(registerForm.action, {
        method: registerForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      // 2. Save to Firestore
      await addDoc(collection(db, "registrations"), {
        name,
        email,
        church,
        timestamp: new Date().toISOString()
      });

      if (response.ok) {
        showMessage(formMessage);
        formError.classList.remove("show");
        registerForm.reset();
      } else {
        showMessage(formError);
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage(formError);
    }
  });
}

// --------------------
// On Page Load
// --------------------
window.addEventListener("load", () => {
  greetUser();
  loadEvents();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backdrop = document.getElementById("backdrop");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  backdrop.classList.toggle("show", isOpen);
  menuToggle.textContent = isOpen ? "✖" : "☰";
});

backdrop.addEventListener("click", () => {
  navLinks.classList.remove("show");
  backdrop.classList.remove("show");
  menuToggle.textContent = "☰";
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backdrop = document.getElementById("backdrop");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  backdrop.classList.toggle("show", isOpen);
  menuToggle.textContent = isOpen ? "✖" : "☰";
});

backdrop.addEventListener("click", () => {
  navLinks.classList.remove("show");
  backdrop.classList.remove("show");
  menuToggle.textContent = "☰";
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backdrop = document.getElementById("backdrop");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  backdrop.classList.toggle("show", isOpen);
  menuToggle.textContent = isOpen ? "✖" : "☰";
});

backdrop.addEventListener("click", () => {
  navLinks.classList.remove("show");
  backdrop.classList.remove("show");
  menuToggle.textContent = "☰";
});

// fetch eventsSection
import { getFirestore, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app);

async function loadEvents() {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
        <h3>${data.title} – ${data.church}</h3>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p>${data.desc}</p>
      `;
      eventsList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", loadEvents);

import { addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function submitEvent(eventData) {
  try {
    await addDoc(collection(db, "events"), {
      title: eventData.title,
      church: eventData.church,
      date: eventData.date,
      location: eventData.location,
      desc: eventData.desc,
      timestamp: Date.now()
    });
    alert("Event submitted successfully!");
    loadEvents(); // refresh list immediately
  } catch (error) {
    console.error("Error adding event:", error);
  }
}
import { getFirestore, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app);

async function loadEvents() {
  const spinner = document.getElementById("loadingSpinner");
  const eventsList = document.getElementById("eventsList");

  // Show spinner
  spinner.style.display = "block";
  eventsList.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
        <h3>${data.title} – ${data.church}</h3>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p>${data.desc}</p>
      `;
      eventsList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading events:", error);
  } finally {
    // Hide spinner
    spinner.style.display = "none";
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadEvents);
async function loadRegistrations() {
  const spinner = document.getElementById("loadingSpinner");
  const tableBody = document.getElementById("registrationsBody");

  // Show spinner
  spinner.style.display = "block";
  tableBody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "registrations"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.church}</td>
        <td>${new Date(data.timestamp).toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading registrations:", error);
  } finally {
    // Hide spinner
    spinner.style.display = "none";
  }
}
