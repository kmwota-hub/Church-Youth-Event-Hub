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

