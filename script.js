// Simple event filtering
function filterEvents() {
  const input = document.getElementById('filterInput').value.toLowerCase();
  const cards = document.getElementsByClassName('event-card');

  for (let card of cards) {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? 'block' : 'none';
  }
}

// Example dynamic message
function greetUser() {
  const hour = new Date().getHours();
  let greeting = "Welcome!";
  if (hour < 12) greeting = "Good morning!";
  else if (hour < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";
  document.getElementById('greeting').innerText = greeting;
}

window.onload = greetUser;

// Handle event submissions
document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const church = document.getElementById('churchName').value;
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const desc = document.getElementById('eventDescription').value;

  const newEvent = document.createElement('div');
  newEvent.classList.add('event-card');
  newEvent.innerHTML = `
    <h3>${title} – ${church}</h3>
    <p>Date: ${date}</p>
    <p>${desc}</p>
  `;

  document.getElementById('events').appendChild(newEvent);

  // Reset form
  document.getElementById('eventForm').reset();

  alert('Event added successfully!');
});

// Save event to Firebase
document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const church = document.getElementById('churchName').value;
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const desc = document.getElementById('eventDescription').value;

  try {
    await addDoc(collection(db, "events"), {
      church,
      title,
      date,
      desc
    });
    alert("Event saved successfully!");
    document.getElementById('eventForm').reset();
    loadEvents();
  } catch (error) {
    console.error("Error adding event:", error);
  }
});

// Load events from Firebase
async function loadEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const eventsSection = document.getElementById('events');
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

window.onload = loadEvents;
